<script setup lang="ts">
import { z } from "zod";

interface FormData {
  name: string;
  email: string;
  company?: string;
  intent: ContactIntent;
  message: string;
  newsletter: boolean;
  website?: string;
}

interface FormStep {
  id: number;
  title: string;
  description: string;
  isValid: boolean;
  isComplete: boolean;
}

type ContactIntent = "job-inquiry" | "collaboration" | "general" | "other";

const props = defineProps<{
  onSuccess?: () => void;
}>();

const toast = useToast();
const { gsap, ScrollTrigger } = useGSAP();
const animateFormStep = (
  stepElement: HTMLElement,
  direction: "next" | "prev",
  onComplete?: () => void,
) => {
  const tl = gsap.timeline({
    onComplete,
    onStart: () => {
      gsap.set(stepElement, { opacity: 0 });
    },
  });

  tl.fromTo(
    stepElement,
    {
      opacity: 0,
      x: direction === "next" ? 50 : -50,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power3.out",
    },
  );

  return tl;
};

const animateSuccessState = (successElement: HTMLElement) => {
  const icon = successElement.querySelector(".success-icon") as HTMLElement;
  const text = successElement.querySelector(".success-text") as HTMLElement;

  const tl = gsap.timeline();

  tl.fromTo(
    icon,
    {
      scale: 0,
      rotation: -180,
    },
    {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    },
  );

  const svgPath = icon?.querySelector("svg path") as SVGPathElement;
  if (svgPath) {
    tl.fromTo(
      svgPath,
      {
        strokeDasharray: 100,
        strokeDashoffset: 100,
      },
      {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3",
    );
  }

  if (text) {
    tl.fromTo(
      text,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4",
    );
  }

  return tl;
};

const animateResponseCard = (card: HTMLElement) => {
  gsap.fromTo(
    card,
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );
};

const currentStepRef = useTemplateRef<HTMLElement>("currentStepRef");
const successIconRef = useTemplateRef<HTMLElement>("successIconRef");
const responseTimeCardRef = useTemplateRef<any>("responseTimeCardRef");

const currentStep = ref(1);
const isSubmitting = ref(false);
const submitSuccess = ref(false);

const steps: FormStep[] = [
  {
    id: 1,
    title: "Quick Contact",
    description: "Let's start with the basics",
    isValid: false,
    isComplete: false,
  },
  {
    id: 2,
    title: "Details",
    description: "Tell me more about your inquiry",
    isValid: false,
    isComplete: false,
  },
  {
    id: 3,
    title: "Message",
    description: "Share your thoughts",
    isValid: false,
    isComplete: false,
  },
];

const formData = reactive<FormData>({
  name: "",
  email: "",
  company: "",
  intent: "general",
  message: "",
  newsletter: false,
  website: "",
});

const step1Schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.email("Please enter a valid email address"),
});

const step2Schema = z.object({
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional(),
  intent: z.enum(["job-inquiry", "collaboration", "general", "other"], {
    message: "Please select an inquiry type",
  }),
});

const step3Schema = z.object({
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  newsletter: z.boolean(),
  website: z.string().max(0, "This field should be empty"),
});

const currentStepConfig = computed(() => {
  try {
    const stepIndex = Math.max(
      0,
      Math.min(currentStep.value - 1, steps.length - 1),
    );
    const step = steps[stepIndex];
    return (
      step ||
      steps[0] || {
        id: 1,
        title: "Contact Form",
        description: "",
        isValid: false,
        isComplete: false,
      }
    );
  } catch (error) {
    console.error("Error in currentStepConfig computed:", error);
    return {
      id: 1,
      title: "Contact Form",
      description: "",
      isValid: false,
      isComplete: false,
    };
  }
});

const canGoNext = computed(() => {
  try {
    switch (currentStep.value) {
      case 1:
        return step1Schema.safeParse({
          name: formData.name || "",
          email: formData.email || "",
        }).success;
      case 2:
        return step2Schema.safeParse({
          company: formData.company || "",
          intent: formData.intent || "general",
        }).success;
      case 3:
        return step3Schema.safeParse({
          message: formData.message || "",
          newsletter: formData.newsletter,
          website: formData.website || "",
        }).success;
      default:
        return false;
    }
  } catch (error) {
    console.error("Error in canGoNext computed:", error);
    return false;
  }
});

const intentOptions = [
  {
    value: "job-inquiry",
    label: "Job Inquiry",
    description: "I'm interested in working with you",
  },
  {
    value: "collaboration",
    label: "Collaboration",
    description: "Let's collaborate on a project",
  },
  {
    value: "general",
    label: "General Question",
    description: "Just want to say hello or ask something",
  },
];

const validateStep = (step: number) => {
  return (state: Partial<FormData>) => {
    const errors: { name: string; message: string }[] = [];

    try {
      let result;

      switch (step) {
        case 1:
          result = step1Schema.safeParse(state);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({
                name: issue.path[0] as string,
                message: issue.message,
              });
            });
          }
          break;
        case 2:
          result = step2Schema.safeParse(state);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({
                name: issue.path[0] as string,
                message: issue.message,
              });
            });
          }
          break;
        case 3:
          result = step3Schema.safeParse(state);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({
                name: issue.path[0] as string,
                message: issue.message,
              });
            });
          }
          break;
      }
    } catch (error) {
      console.warn("Error in validation:", error);
    }

    return errors;
  };
};

const animateStepTransition = (direction: "next" | "prev") => {
  if (!currentStepRef?.value) return;

  animateFormStep(currentStepRef.value, direction);
};

const nextStep = () => {
  try {
    if (canGoNext.value && currentStep.value < steps.length) {
      const currentStepIndex = Math.max(0, currentStep.value - 1);
      if (steps[currentStepIndex]) {
        steps[currentStepIndex].isComplete = true;
      }

      currentStep.value++;

      nextTick(() => {
        animateStepTransition("next");
      });
    }
  } catch (error) {
    console.error("Error in nextStep:", error);
  }
};

const prevStep = () => {
  try {
    if (currentStep.value > 1) {
      currentStep.value--;

      nextTick(() => {
        animateStepTransition("prev");
      });
    }
  } catch (error) {
    console.error("Error in prevStep:", error);
  }
};

const handleSubmit = async (event: any) => {
  try {
    const submissionData = event.data || event;
    if (submissionData.website) {
      toast.add({
        title: "Submission Error",
        description:
          "Your submission could not be processed. Please try again.",
        color: "error",
      });
      return;
    }

    isSubmitting.value = true;

    const response = await $fetch("/api/send", {
      method: "POST",
      body: submissionData,
    });

    if (response?.success) {
      submitSuccess.value = true;
      toast.add({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
        color: "success",
      });

      if (props.onSuccess && typeof props.onSuccess === "function") {
        try {
          props.onSuccess();
        } catch (callbackError) {
          console.warn("Error in success callback:", callbackError);
        }
      }

      setTimeout(() => {
        resetForm();
      }, 5000);
    } else {
      throw new Error(response?.message || "Failed to send message");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    toast.add({
      title: "Failed to send message",
      description: "Please check your internet connection and try again.",
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  try {
    Object.assign(formData, {
      name: "",
      email: "",
      company: "",
      intent: "general",
      message: "",
      newsletter: false,
      website: "",
    });

    if (steps && Array.isArray(steps)) {
      steps.forEach((step) => {
        if (step) {
          step.isComplete = false;
          step.isValid = false;
        }
      });
    }

    currentStep.value = 1;
    submitSuccess.value = false;
  } catch (error) {
    console.error("Error resetting form:", error);
    currentStep.value = 1;
    submitSuccess.value = false;
  }
};

defineShortcuts({
  ctrl_enter: {
    usingInput: true,
    handler: () => {
      try {
        if (currentStep.value === steps.length && canGoNext.value) {
          handleSubmit({ data: formData });
        } else if (canGoNext.value) {
          nextStep();
        }
      } catch (error) {
        console.error("Error in keyboard navigation:", error);
      }
    },
  },
  escape: {
    usingInput: true,
    handler: () => {
      try {
        if (currentStep.value > 1) {
          prevStep();
        }
      } catch (error) {
        console.error("Error in keyboard navigation:", error);
      }
    },
  },
});

onMounted(() => {
  nextTick(() => {
    initializeFormAnimations();
  });
});

const initializeFormAnimations = () => {
  try {
    const responseCardEl = responseTimeCardRef.value?.$el as HTMLElement;

    // Animate response time card
    if (responseCardEl && currentStep.value !== 2) {
      animateResponseCard(responseCardEl);
    }
  } catch (error) {
    console.warn("Error initializing form animations:", error);
  }
};

const animateSuccess = () => {
  try {
    if (successIconRef.value) {
      successIconRef.value.classList.add("success-icon");

      const successContainer = successIconRef.value.closest(
        ".text-center",
      ) as HTMLElement;
      if (successContainer) {
        successContainer.classList.add("success-text");
        animateSuccessState(successContainer);
      }
    }
  } catch (error) {
    console.warn("Error animating success state:", error);
  }
};

watch(submitSuccess, (newValue) => {
  if (newValue) {
    nextTick(() => {
      animateSuccess();
    });
  }
});

watch(currentStep, () => {
  nextTick(() => {
    const responseCardEl = responseTimeCardRef.value?.$el as HTMLElement;
    if (responseCardEl && currentStep.value !== 2) {
      animateResponseCard(responseCardEl);
    }
  });
});

onBeforeUnmount(() => {
  try {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf("*");
  } catch (error) {
    console.error("Error cleaning up animations:", error);
  }
});
</script>

<template>
  <div class="w-full h-full flex flex-col gap-8">
    <UCard
      :ui="{
        root: 'grow flex flex-col divide-y-0 *:sm:py-6',
        body: 'flex-1',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-default mb-2">
              {{ currentStepConfig.title }}
            </h2>
            <p class="text-toned">
              {{ currentStepConfig.description }}
            </p>
          </div>
          <div class="text-toned text-sm font-medium">
            {{ currentStep }} of {{ steps.length }}
          </div>
        </div>

        <UProgress :model-value="currentStep" :max="steps.length" />
      </template>
      <div
        v-if="submitSuccess"
        class="text-center py-12"
        role="alert"
        aria-live="polite"
      >
        <div
          ref="successIconRef"
          class="w-20 h-20 bg-highlighted/20 rounded-full flex items-center justify-center mx-auto mb-6 success-icon"
        >
          <UIcon
            name="i-lucide-check-circle"
            class="w-10 h-10 text-highlighted"
          />
        </div>
        <h3 class="text-2xl font-bold text-default mb-3">
          Message Sent Successfully!
        </h3>
        <p class="text-toned mb-8">
          Thank you for reaching out! I'll get back to you as soon as possible.
        </p>
        <UButton variant="outline" size="lg" @click="resetForm">
          Send Another Message
        </UButton>
      </div>

      <UForm
        v-else
        :state="formData"
        :validate="validateStep(currentStep)"
        class="flex flex-col justify-between gap-8"
        @submit="handleSubmit"
      >
        <div ref="currentStepRef">
          <div v-if="currentStep === 1" class="space-y-6">
            <UFormField label="Full Name" name="name" required>
              <UInput
                v-model="formData.name"
                placeholder="John Doe"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Email Address" name="email" required>
              <UInput
                v-model="formData.email"
                type="email"
                placeholder="john@example.com"
                size="xl"
                class="w-full"
              />
            </UFormField>
          </div>

          <div v-if="currentStep === 2" class="space-y-6">
            <UFormField label="Company" name="company" hint="Optional">
              <UInput
                v-model="formData.company"
                placeholder="Acme Inc."
                size="xl"
                :disabled="isSubmitting"
                autocomplete="organization"
                class="w-full"
              />
            </UFormField>

            <UFormField label="What's this about?" name="intent" required>
              <URadioGroup
                v-model="formData.intent"
                :items="intentOptions"
                variant="card"
                size="lg"
                :disabled="isSubmitting"
                :ui="{
                  root: 'w-full',
                  fieldset: 'gap-5',
                }"
              />
            </UFormField>
          </div>

          <div v-if="currentStep === 3" class="space-y-6">
            <UFormField label="Your Message" name="message" required>
              <UTextarea
                v-model="formData.message"
                placeholder="Tell me about your project, ideas, or questions..."
                size="xl"
                :disabled="isSubmitting"
                :rows="4"
                resize="vertical"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="newsletter"
              hint="Stay updated with my latest projects and articles"
            >
              <UCheckbox
                v-model="formData.newsletter"
                label="Subscribe to my newsletter for occasional updates"
                :disabled="isSubmitting"
                class="w-full"
              />
            </UFormField>

            <UFormField name="website" class="sr-only">
              <UInput
                v-model="formData.website"
                type="text"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
                placeholder="Leave this field empty"
              />
            </UFormField>
          </div>
        </div>
      </UForm>

      <template #footer>
        <div class="flex items-center justify-between">
          <UTooltip
            v-if="currentStep > 1"
            text="Go back to previous step"
            :kbds="['Escape']"
          >
            <UButton
              variant="subtle"
              size="lg"
              icon="i-lucide-arrow-left"
              :disabled="isSubmitting"
              @click="prevStep"
            >
              Previous
            </UButton>
          </UTooltip>
          <div v-else class="w-24"></div>

          <div class="flex items-center space-x-4">
            <template v-if="currentStep < steps.length">
              <UTooltip
                :text="`Continue to next step`"
                :kbds="['ctrl', 'Enter']"
              >
                <UButton
                  size="lg"
                  icon="i-lucide-arrow-right"
                  trailing
                  :disabled="!canGoNext || isSubmitting"
                  @click="nextStep"
                >
                  Continue
                </UButton>
              </UTooltip>
            </template>

            <template v-else>
              <UTooltip text="Send message" :kbds="['ctrl', 'Enter']">
                <UButton
                  type="submit"
                  size="lg"
                  icon="i-lucide-send"
                  :loading="isSubmitting"
                  :disabled="!canGoNext"
                  @click="handleSubmit({ data: formData })"
                >
                  Send Message
                </UButton>
              </UTooltip>
            </template>
          </div>
        </div>
      </template>
    </UCard>

    <UCard v-if="currentStep !== 2" ref="responseTimeCardRef" class="h-[188px]">
      <div class="flex items-start space-x-3">
        <UIcon
          name="i-lucide-clock"
          class="w-5 h-5 text-highlighted flex-shrink-0 mt-0.5"
        />
        <div>
          <h3 class="font-semibold text-default mb-2">Response Time</h3>
          <p class="text-sm text-toned leading-relaxed">
            I typically respond to messages within 24-48 hours. For urgent
            matters, please mention it in your message or reach out via phone.
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
