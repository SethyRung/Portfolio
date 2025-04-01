import { Resend } from "resend";

const config = useRuntimeConfig();
const resend = new Resend(config.resendApiKey);

export default defineEventHandler(async (event) => {
  const data = await readBody<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }>(event);

  try {
    const respone = await resend.emails.send({
      from: "Sethy Rung <onboarding@resend.dev>",
      to: [config.email],
      subject: "New Contact from Portfolio",
      html: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Form Submission</title>
  </head>
  <body
    style="
      font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    "
  >
    <p>Dear Sethy,</p>
    <p>
      You have received a new message from your portfolio website contact form.
    </p>
    <div
      style="
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
      "
    >
      <p><span style="font-weight: bold">Name:</span> ${data.firstName} ${data.lastName}</p>
      <p><span style="font-weight: bold">Email:</span> ${data.email}</p>
      <p><span style="font-weight: bold">Phone:</span> ${data.phone}</p>
      <p><span style="font-weight: bold">Subject:</span> ${data.subject}</p>
    </div>
    <div
      style="
        border-left: 3px solid #00bc7d;
        padding-left: 15px;
        margin: 20px 0;
      "
    >
      ${data.message}
    </div>
    <div
      style="
        border-top: 1px solid #dddddd;
        margin-top: 30px;
        padding-top: 15px;
        font-size: 12px;
        color: #777777;
      "
    >
      <p>
        This is an automated notification. Please do not reply to this email.
      </p>
      <p>© 2025 SethyRung. All rights reserved.</p>
    </div>
  </body>
</html>
`,
    });
    return respone;
  } catch (error) {
    return { error };
  }
});
