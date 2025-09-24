<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = useTemplateRef("sectionRef");
const headingRef = useTemplateRef("headingRef");
const paragraphRef = useTemplateRef("paragraphRef");
const formRef = useTemplateRef("formRef");
const contactCardsRef = ref<HTMLElement[]>([]);
const socialSectionRef = useTemplateRef("socialSectionRef");
const socialLinksRef = ref<HTMLElement[]>([]);

const formData = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type Schema = z.infer<typeof contactSchema>;

const isSubmitting = ref(false);

const contactInfo = [
  {
    id: 1,
    label: "Email",
    value: "rungsethyhk@gmail.com",
    icon: "i-lucide-mail",
  },
  {
    id: 2,
    label: "Phone",
    value: "+855 97 4588804",
    icon: "i-lucide-phone",
  },
  {
    id: 3,
    label: "Phone",
    value: "+855 87 553332",
    icon: "i-lucide-phone",
  },
  {
    id: 4,
    label: "Location",
    value: "Phnom Penh, Cambodia",
    icon: "i-lucide-map-pin",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    icon: "i-simple-icons-github",
    url: "https://github.com/SethyRung",
  },
  {
    name: "LinkedIn",
    icon: "i-simple-icons-linkedin",
    url: "https://linkedin.com/in/sethy-rung-146709299",
  },
  {
    name: "X",
    icon: "i-simple-icons-x",
    url: "https://x.com/SethyRung",
  },
  {
    name: "Discord",
    icon: "i-simple-icons-discord",
    url: "https://discord.com/users/573740048978280458",
  },
];

const toast = useToast();

onMounted(() => {
  if (!sectionRef.value) return;

  if (headingRef.value)
    gsap.set(headingRef.value, { y: -30, opacity: 0, scale: 0.95 });
  if (paragraphRef.value) gsap.set(paragraphRef.value, { y: 30, opacity: 0 });
  if (formRef.value) gsap.set(formRef.value, { x: -50, opacity: 0 });
  if (contactCardsRef.value)
    gsap.set(contactCardsRef.value, { x: 50, opacity: 0 });
  if (socialSectionRef.value)
    gsap.set(socialSectionRef.value, { y: 30, opacity: 0 });
  for (const element of socialLinksRef.value) {
    gsap.set(element, { scale: 0.8, opacity: 0 });
  }

  if (headingRef.value) {
    gsap.to(headingRef.value, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
        once: true,
      },
    });

    if (paragraphRef.value) {
      gsap.to(paragraphRef.value, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top 80%",
          once: true,
        },
      });

      // Form animation
      if (formRef.value) {
        gsap.to(formRef.value, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "top 75%",
            once: true,
          },
          onComplete: () => {
            const formFields = formRef.value?.querySelectorAll(
              "input, textarea, button",
            );
            if (formFields && formFields.length > 0) {
              gsap.fromTo(
                formFields,
                { y: 20, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.1,
                  ease: "power2.out",
                },
              );
            }
          },
        });

        // Contact cards animation
        gsap.to(contactCardsRef.value, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "top 70%",
            once: true,
          },
        });

        // Social section animation
        gsap.to(socialSectionRef.value!, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "top 65%",
            once: true,
          },
        });
      }
    }
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    const response = await $fetch("/api/send", {
      method: "POST",
      body: event.data,
    });
    if (response.error) {
      toast.add({
        title: "Failed",
        description:
          "Failed to send message. Please check your internet connection and try again.",
        color: "error",
      });
    } else {
      toast.add({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
        color: "success",
      });
    }
  } catch {
    toast.add({
      title: "Failed",
      description: "Something went wrong.",
      color: "error",
    });
  }
};
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="relative py-20 bg-gradient-to-br from-muted/5 to-muted/10 overflow-hidden"
  >
    <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div ref="headingRef" class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-default mb-4">
            Get In Touch
          </h2>
          <p ref="paragraphRef" class="text-xl text-toned max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from
            you!
          </p>
        </div>

        <div ref="formRef" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <UForm
            :state="formData"
            :schema="contactSchema"
            class="space-y-6 h-fit bg-default/80 backdrop-blur-sm rounded-xl p-6 border border-muted"
            @submit="handleSubmit"
          >
            <UFormField label="Name" name="name" required>
              <UInput
                v-model="formData.name"
                placeholder="Your full name"
                :disabled="isSubmitting"
                class="w-full"
                size="xl"
                color="neutral"
              />
            </UFormField>

            <UFormField label="Email" name="email" required>
              <UInput
                v-model="formData.email"
                type="email"
                placeholder="your.email@example.com"
                :disabled="isSubmitting"
                class="w-full"
                size="xl"
                color="neutral"
              />
            </UFormField>

            <UFormField label="Subject" name="subject" required>
              <UInput
                v-model="formData.subject"
                placeholder="What's this about?"
                :disabled="isSubmitting"
                class="w-full"
                size="xl"
                color="neutral"
              />
            </UFormField>

            <UFormField label="Message" name="message" required>
              <UTextarea
                v-model="formData.message"
                placeholder="Your message..."
                :disabled="isSubmitting"
                class="w-full"
                size="xl"
                color="neutral"
                :rows="5"
              />
            </UFormField>

            <UButton
              type="submit"
              :loading="isSubmitting"
              size="xl"
              block
              icon="i-lucide-send"
              color="neutral"
            >
              Send Message
            </UButton>
          </UForm>

          <div class="space-y-6">
            <div class="space-y-4">
              <div
                v-for="contact in contactInfo"
                :key="contact.id"
                ref="contactCardsRef"
                class="bg-default/80 backdrop-blur-sm rounded-xl p-6 border border-muted hover:border-highlighted/30 transition-all duration-300 group hover:shadow-lg hover:shadow-highlighted/10"
              >
                <div class="flex items-start space-x-4">
                  <div
                    class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  >
                    <UIcon :name="contact.icon" class="w-6 h-6 text-default" />
                  </div>
                  <div class="flex-1">
                    <h4
                      class="font-bold text-default mb-1 group-hover:text-highlighted transition-colors"
                    >
                      {{ contact.label }}
                    </h4>
                    <p
                      class="text-toned text-sm group-hover:text-default transition-colors"
                    >
                      {{ contact.value }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref="socialSectionRef"
              class="bg-default/80 backdrop-blur-sm rounded-xl p-6 border border-muted hover:border-highlighted/30 transition-all duration-300"
            >
              <h4 class="font-bold text-default mb-4 flex items-center">
                <UIcon
                  name="i-lucide-share-2"
                  class="w-5 h-5 mr-2 text-highlighted"
                />
                Connect With Me
              </h4>
              <div class="grid grid-cols-2 gap-3">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  ref="socialLinksRef"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-highlighted/20 hover:scale-105 transition-all duration-300 group"
                >
                  <UIcon
                    :name="social.icon"
                    class="w-5 h-5 text-toned group-hover:text-highlighted group-hover:scale-110 transition-all"
                  />
                  <span
                    class="text-sm text-toned group-hover:text-highlighted group-hover:font-medium transition-all"
                    >{{ social.name }}</span
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
