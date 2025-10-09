import { Resend } from "resend";
import { z } from "zod";

// TypeScript interfaces
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  intent: 'job-inquiry' | 'collaboration' | 'general' | 'other';
  message: string;
  newsletter: boolean;
  website?: string; // Honeypot field
}

interface ApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .trim()
    .optional(),
  intent: z.enum(["job-inquiry", "collaboration", "general", "other"], {
    message: "Please select an inquiry type",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
    .trim(),
  newsletter: z.boolean(),
  website: z
    .string()
    .max(0, "This field should be empty")
    .optional(), // Honeypot validation
});

// Rate limiting function
const checkRateLimit = (ip: string): { allowed: boolean; resetTime?: number } => {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3; // Max 3 requests per hour

  const existing = rateLimitStore.get(ip);

  if (!existing || now > existing.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, resetTime: existing.resetTime };
  }

  existing.count++;
  return { allowed: true };
};

// Input sanitization
const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove scripts
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .trim();
};

// Email HTML template
const createEmailHtml = (data: ContactFormData, nodeEvent: any): string => {
  const intentLabels = {
    'job-inquiry': 'Job Inquiry',
    'collaboration': 'Collaboration',
    'general': 'General Question',
    'other': 'Other',
  };

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Form Submission</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f8f9fa;
      }
      .container {
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        border-bottom: 2px solid #e9ecef;
        padding-bottom: 20px;
        margin-bottom: 20px;
      }
      .info-grid {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 6px;
        margin-bottom: 20px;
      }
      .info-row {
        display: flex;
        margin-bottom: 10px;
      }
      .info-label {
        font-weight: 600;
        min-width: 120px;
        color: #495057;
      }
      .info-value {
        color: #212529;
        word-break: break-word;
      }
      .message-box {
        border-left: 4px solid #007bff;
        padding: 20px;
        margin: 20px 0;
        background-color: #f8f9fa;
        border-radius: 0 6px 6px 0;
      }
      .message-text {
        white-space: pre-wrap;
        color: #212529;
        font-size: 15px;
        line-height: 1.6;
      }
      .footer {
        border-top: 1px solid #e9ecef;
        margin-top: 30px;
        padding-top: 20px;
        font-size: 12px;
        color: #6c757d;
      }
      .badge {
        display: inline-block;
        padding: 4px 8px;
        background-color: #e9ecef;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        color: #495057;
      }
      .newsletter {
        background-color: #d4edda;
        color: #155724;
        padding: 10px;
        border-radius: 4px;
        margin-top: 15px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin: 0; color: #212529; font-size: 24px;">
          📬 New Contact Form Submission
        </h1>
        <p style="margin: 8px 0 0 0; color: #6c757d; font-size: 16px;">
          You've received a new message from your portfolio website
        </p>
      </div>

      <div class="info-grid">
        <div class="info-row">
          <span class="info-label">👤 Name:</span>
          <span class="info-value">${data.name}</span>
        </div>
        <div class="info-row">
          <span class="info-label">📧 Email:</span>
          <span class="info-value">
            <a href="mailto:${data.email}" style="color: #007bff; text-decoration: none;">
              ${data.email}
            </a>
          </span>
        </div>
        ${data.company ? `
        <div class="info-row">
          <span class="info-label">🏢 Company:</span>
          <span class="info-value">${data.company}</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span class="info-label">🎯 Intent:</span>
          <span class="info-value">
            <span class="badge">${intentLabels[data.intent]}</span>
          </span>
        </div>
        <div class="info-row">
          <span class="info-label">📅 Date:</span>
          <span class="info-value">${new Date().toLocaleString()}</span>
        </div>
      </div>

      <div class="message-box">
        <h3 style="margin: 0 0 15px 0; color: #495057; font-size: 18px;">
          💬 Message:
        </h3>
        <div class="message-text">${data.message}</div>
      </div>

      ${data.newsletter ? `
      <div class="newsletter">
        ✅ <strong>Newsletter Subscription:</strong> This person would like to receive updates about your work.
      </div>
      ` : ''}

      <div class="footer">
        <p style="margin: 0 0 8px 0;">
          <strong>Technical Details:</strong>
        </p>
        <ul style="margin: 0; padding-left: 20px; font-size: 11px; color: #6c757d;">
          <li>IP Address: ${nodeEvent.node?.req?.headers?.['x-forwarded-for'] || nodeEvent.node?.req?.socket?.remoteAddress || 'Unknown'}</li>
          <li>User Agent: ${nodeEvent.node?.req?.headers?.['user-agent'] || 'Unknown'}</li>
          <li>Origin: ${nodeEvent.node?.req?.headers?.origin || nodeEvent.node?.req?.headers?.referer || 'Direct'}</li>
        </ul>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid #e9ecef;">
        <p style="margin: 0;">
          This is an automated notification from your portfolio contact form.
          Please do not reply to this email.
        </p>
        <p style="margin: 8px 0 0 0;">
          © ${new Date().getFullYear()} Sethy Rung. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>`;
};

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  try {
    // Cast event for Node.js access
    const nodeEvent = event as any

    // Get client IP for rate limiting
    const clientIP = nodeEvent.node?.req?.headers?.['x-forwarded-for'] as string ||
                   nodeEvent.node?.req?.socket?.remoteAddress ||
                   'unknown';

    // Check rate limiting
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      const resetTime = new Date(rateLimit.resetTime!).toLocaleTimeString();
      return {
        success: false,
        message: `Too many requests. Please try again after ${resetTime}.`,
      };
    }

    // Parse and validate request body
    const rawData = await readBody(event);

    // Check honeypot field
    if (rawData.website && rawData.website.trim() !== '') {
      // Silently fail for bots (don't give them feedback)
      return {
        success: true,
        message: "Thank you for your message. I'll get back to you soon.",
      };
    }

    // Validate data
    const validationResult = contactSchema.safeParse(rawData);
    if (!validationResult.success) {
      const errors: Record<string, string[]> = {};

      validationResult.error.issues.forEach((error) => {
        const field = error.path.join('.');
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(error.message);
      });

      return {
        success: false,
        message: "Please check your input and try again.",
        errors,
      };
    }

    const data = validationResult.data;

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      ...data,
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      company: data.company ? sanitizeInput(data.company) : undefined,
      message: sanitizeInput(data.message),
    };

    // Send email using Resend
    const config = useRuntimeConfig();
    const resend = new Resend(config.resendApiKey);

    const emailHtml = createEmailHtml(sanitizedData, nodeEvent);

    const response = await resend.emails.send({
      from: "Sethy Rung Portfolio <onboarding@resend.dev>",
      to: [config.email],
      subject: `New Contact: ${sanitizedData.name} - ${sanitizedData.intent.replace('-', ' ').toUpperCase()}`,
      html: emailHtml,
      replyTo: sanitizedData.email,
    });

    if (response.error) {
      console.error("Resend API error:", response.error);
      return {
        success: false,
        message: "Failed to send message. Please try again later.",
      };
    }

    // Success response
    return {
      success: true,
      message: "Message sent successfully! I'll get back to you as soon as possible.",
    };

  } catch (error) {
    console.error("Contact form error:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
});
