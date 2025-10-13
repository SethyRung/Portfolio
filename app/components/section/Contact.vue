<script setup lang="ts">
import ContactForm from "./ContactForm.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titleRef = useTemplateRef<HTMLElement>("titleRef");
const subtitleRef = useTemplateRef<HTMLElement>("subtitleRef");
const formRef = useTemplateRef<HTMLElement>("formRef");
const contactInfoRef = useTemplateRef<HTMLElement[]>("contactInfoRef");
const socialLinksRef = useTemplateRef<HTMLElement[]>("socialLinksRef");
const contactInfoCardRef = useTemplateRef<any>("contactInfoCardRef");
const socialCardRef = useTemplateRef<any>("socialCardRef");

const contactAnimations: (gsap.core.Timeline | gsap.core.Tween)[] = [];
const matchMediaInstances: gsap.MatchMedia[] = [];
const hoverEventListeners: { element: HTMLElement; type: string; listener: EventListener }[] = [];
let overflowProtectionCount = 0;
const setOverflowProtection = (section: HTMLElement | null, protect: boolean) => {
  if (!section) return;

  if (protect) {
    overflowProtectionCount++;
    if (overflowProtectionCount === 1) {
      section.style.overflow = 'hidden';
    }
  } else {
    overflowProtectionCount = Math.max(0, overflowProtectionCount - 1);
    if (overflowProtectionCount === 0) {
      section.style.overflow = '';
    }
  }
};
const animateContactSection = (elements: {
  title: HTMLElement;
  subtitle: HTMLElement;
  form: HTMLElement;
  contactCard: HTMLElement;
  socialCard: HTMLElement;
}): gsap.MatchMedia => {
  const mm = gsap.matchMedia();
  matchMediaInstances.push(mm);

  mm.add(
    {
      desktop: "(min-width: 768px)",
      mobile: "(max-width: 767px)",
    },
    (context) => {
      if (!context.conditions) return;
      const { desktop, mobile } = context.conditions;
      const section = elements.form.closest('#contact');

      if (desktop) {
                gsap.set(elements.title, { opacity: 0, y: 30 });
        gsap.set(elements.subtitle, { opacity: 0, y: 20 });
        gsap.set(elements.form, { opacity: 0, x: -30 });
        gsap.set(elements.contactCard, { opacity: 0, x: 30 });
        gsap.set(elements.socialCard, { opacity: 0, x: 30 });

        const tl = gsap.timeline({
          delay: 0.2,
          scrollTrigger: {
            trigger: elements.title,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });

        tl.to(elements.title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
          .to(
            elements.subtitle,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4",
          )
          .to(
            elements.form,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.3",
          )
          .to(
            elements.contactCard,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5",
          )
          .to(
            elements.socialCard,
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6",
          );

        contactAnimations.push(tl);
        return tl;
      }

      if (mobile) {
                gsap.set(elements.title, { opacity: 0, y: 30 });
        gsap.set(elements.subtitle, { opacity: 0, y: 20 });
        gsap.set(elements.form, { opacity: 0, y: 30 });
        gsap.set(elements.contactCard, { opacity: 0, y: 30 });
        gsap.set(elements.socialCard, { opacity: 0, y: 30 });

                setOverflowProtection(section as HTMLElement, true);

        const tl = gsap.timeline({
          delay: 0.2,
          scrollTrigger: {
            trigger: elements.title,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
                        setOverflowProtection(section as HTMLElement, false);
          }
        });

        tl.to(elements.title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
          .to(
            elements.subtitle,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4",
          )
          .to(
            elements.form,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.3",
          )
          .to(
            elements.contactCard,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5",
          )
          .to(
            elements.socialCard,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6",
          );

        contactAnimations.push(tl);
        return tl;
      }

      return null;
    }
  );

  return mm;
};


const animateContactInfoItems = (items: HTMLElement[]): gsap.MatchMedia | null => {
  if (items.length === 0) return null;

  const mm = gsap.matchMedia();
  matchMediaInstances.push(mm);

  mm.add(
    {
      desktop: "(min-width: 768px)",
      mobile: "(max-width: 767px)",
    },
    (context) => {
      if (!context.conditions) return;
      const { desktop, mobile } = context.conditions;
      const section = items[0]?.closest('#contact');

            gsap.set(items, { opacity: 0, y: 20, scale: 0.95 });

      if (desktop) {
        const tween = gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: items[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        contactAnimations.push(tween);
        return tween;
      }

      if (mobile) {
                setOverflowProtection(section as HTMLElement, true);

        const tween = gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: items[0],
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
                        setOverflowProtection(section as HTMLElement, false);
          }
        });
        contactAnimations.push(tween);
        return tween;
      }

      return null;
    }
  );

  return mm;
};

const animateSocialLinks = (links: HTMLElement[]): gsap.MatchMedia | null => {
  if (links.length === 0) return null;

  const mm = gsap.matchMedia();
  matchMediaInstances.push(mm);

  mm.add(
    {
      desktop: "(min-width: 768px)",
      mobile: "(max-width: 767px)",
    },
    (context) => {
      if (!context.conditions) return;
      const { desktop, mobile } = context.conditions;
      const section = links[0]?.closest('#contact');

            gsap.set(links, { opacity: 0, scale: 0.8, rotation: -10 });

      if (desktop) {
        const tween = gsap.to(links, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: links[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        contactAnimations.push(tween);
        return tween;
      }

      if (mobile) {
                setOverflowProtection(section as HTMLElement, true);

        const tween = gsap.to(links, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: links[0],
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
                        setOverflowProtection(section as HTMLElement, false);
          }
        });
        contactAnimations.push(tween);
        return tween;
      }

      return null;
    }
  );

  return mm;
};

const createContactItemHover = (element: HTMLElement) => {
  const icon = element.querySelector(".contact-icon");
  const arrow = element.querySelector(".contact-arrow");

  const mouseEnterHandler = () => {
    if (icon) {
      const iconTween = gsap.to(icon, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
      contactAnimations.push(iconTween);
    }
    if (arrow) {
      const arrowTween = gsap.to(arrow, {
        opacity: 1,
        x: 3,
        y: -3,
        duration: 0.3,
        ease: "power2.out",
      });
      contactAnimations.push(arrowTween);
    }
  };

  const mouseLeaveHandler = () => {
    if (icon) {
      const iconTween = gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      contactAnimations.push(iconTween);
    }
    if (arrow) {
      const arrowTween = gsap.to(arrow, {
        opacity: 0,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      contactAnimations.push(arrowTween);
    }
  };

  element.addEventListener("mouseenter", mouseEnterHandler);
  element.addEventListener("mouseleave", mouseLeaveHandler);

    hoverEventListeners.push(
    { element, type: "mouseenter", listener: mouseEnterHandler },
    { element, type: "mouseleave", listener: mouseLeaveHandler }
  );
};

const createSocialLinkHover = (element: HTMLElement) => {
  const icon = element.querySelector(".social-icon");
  const text = element.querySelector(".social-text");

  const mouseEnterHandler = () => {
    const elementTween = gsap.to(element, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
    contactAnimations.push(elementTween);

    if (icon) {
      const iconTween = gsap.to(icon, {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
      contactAnimations.push(iconTween);
    }

    if (text) {
      const textTween = gsap.to(text, {
        fontWeight: 600,
        duration: 0.2,
        ease: "power2.out",
      });
      contactAnimations.push(textTween);
    }
  };

  const mouseLeaveHandler = () => {
    const elementTween = gsap.to(element, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
    contactAnimations.push(elementTween);

    if (icon) {
      const iconTween = gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      contactAnimations.push(iconTween);
    }

    if (text) {
      const textTween = gsap.to(text, {
        fontWeight: 400,
        duration: 0.2,
        ease: "power2.out",
      });
      contactAnimations.push(textTween);
    }
  };

  element.addEventListener("mouseenter", mouseEnterHandler);
  element.addEventListener("mouseleave", mouseLeaveHandler);

    hoverEventListeners.push(
    { element, type: "mouseenter", listener: mouseEnterHandler },
    { element, type: "mouseleave", listener: mouseLeaveHandler }
  );
};

const cleanupContactAnimations = () => {
    contactAnimations.forEach((animation) => {
    if (animation && animation.kill) {
      try {
        animation.kill();
      } catch (error) {
        console.warn("Error killing animation:", error);
      }
    }
  });
  contactAnimations.length = 0; 
    matchMediaInstances.forEach((mm) => {
    if (mm && mm.kill) {
      try {
        mm.kill();
      } catch (error) {
        console.warn("Error killing matchMedia:", error);
      }
    }
  });
  matchMediaInstances.length = 0; 
    hoverEventListeners.forEach(({ element, type, listener }) => {
    if (element && listener) {
      try {
        element.removeEventListener(type, listener);
      } catch (error) {
        console.warn("Error removing event listener:", error);
      }
    }
  });
  hoverEventListeners.length = 0; 
    try {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.trigger?.closest("#contact") ||
        trigger.trigger?.classList?.contains("contact-item") ||
        trigger.trigger?.classList?.contains("social-link")
      ) {
        trigger.kill();
      }
    });
  } catch (error) {
    console.warn("Error killing ScrollTriggers:", error);
  }

    overflowProtectionCount = 0;

    const contactSection = document.querySelector('#contact') as HTMLElement;
  if (contactSection) {
    contactSection.style.overflow = '';
  }

    try {
    gsap.killTweensOf("#contact *");
  } catch (error) {
    console.warn("Error killing remaining tweens:", error);
  }
};

const contactInfo = [
  {
    id: 1,
    label: "Email",
    value: "rungsethyhk@gmail.com",
    icon: "i-lucide-mail",
    href: "mailto:rungsethyhk@gmail.com",
  },
  {
    id: 2,
    label: "Phone",
    value: "+855 97 4588804",
    icon: "i-lucide-phone",
    href: "tel:+855974588804",
  },
  {
    id: 3,
    label: "Phone",
    value: "+855 87 553332",
    icon: "i-lucide-phone",
    href: "tel:+85587553332",
  },
  {
    id: 4,
    label: "Location",
    value: "Phnom Penh, Cambodia",
    icon: "i-lucide-map-pin",
    href: "https://maps.google.com/?q=Phnom+Penh+Cambodia",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    icon: "i-simple-icons-github",
    url: "https://github.com/SethyRung",
    description: "View my code and projects",
  },
  {
    name: "LinkedIn",
    icon: "i-simple-icons-linkedin",
    url: "https://linkedin.com/in/sethy-rung-146709299",
    description: "Professional network and experience",
  },
  {
    name: "X",
    icon: "i-simple-icons-x",
    url: "https://x.com/SethyRung",
    description: "Follow my thoughts and updates",
  },
  {
    name: "Discord",
    icon: "i-simple-icons-discord",
    url: "https://discord.com/users/573740048978280458",
    description: "Chat and collaborate",
  },
];

onMounted(() => {
  nextTick(() => {
    initializeAnimations();
  });
});

const initializeAnimations = () => {
  try {
    const contactInfoCard = contactInfoCardRef.value?.$el as HTMLElement;
    const socialCard = socialCardRef.value?.$el as HTMLElement;

        if (
      titleRef.value &&
      subtitleRef.value &&
      formRef.value &&
      contactInfoCard &&
      socialCard
    ) {
      animateContactSection({
        title: titleRef.value,
        subtitle: subtitleRef.value,
        form: formRef.value,
        contactCard: contactInfoCard,
        socialCard: socialCard,
      });
    }

        if (contactInfoRef.value) {
      const contactItems = Array.isArray(contactInfoRef.value)
        ? contactInfoRef.value.filter(
            (el): el is HTMLElement => el && "nodeName" in el,
          )
        : contactInfoRef.value && "nodeName" in contactInfoRef.value
          ? [contactInfoRef.value]
          : [];
      if (contactItems.length > 0) {
        animateContactInfoItems(contactItems);
      }
    }

        if (socialLinksRef.value) {
      const socialElements = Array.isArray(socialLinksRef.value)
        ? socialLinksRef.value.filter(
            (el): el is HTMLElement => el && "nodeName" in el,
          )
        : socialLinksRef.value && "nodeName" in socialLinksRef.value
          ? [socialLinksRef.value]
          : [];
      if (socialElements.length > 0) {
        animateSocialLinks(socialElements);
      }
    }

        setupHoverEffects();
  } catch (error) {
    console.warn("Error initializing contact animations:", error);
  }
};

const setupHoverEffects = () => {
  try {
    if (contactInfoRef.value) {
      const contactItems = Array.isArray(contactInfoRef.value)
        ? contactInfoRef.value.filter(
            (el): el is HTMLElement => el && "nodeName" in el,
          )
        : contactInfoRef.value && "nodeName" in contactInfoRef.value
          ? [contactInfoRef.value]
          : [];

      contactItems.forEach((item) => {
        const icon = item.querySelector(".w-12.h-12");
        const arrow = item.querySelector(".opacity-0");

        if (icon) icon.classList.add("contact-icon");
        if (arrow) arrow.classList.add("contact-arrow");

        createContactItemHover(item);
      });
    }

    if (socialLinksRef.value) {
      const socialElements = Array.isArray(socialLinksRef.value)
        ? socialLinksRef.value.filter(
            (el): el is HTMLElement => el && "nodeName" in el,
          )
        : socialLinksRef.value && "nodeName" in socialLinksRef.value
          ? [socialLinksRef.value]
          : [];

      socialElements.forEach((item) => {
        const icon = item.querySelector(".w-5.h-5");
        const text = item.querySelector(".text-sm");

        if (icon) icon.classList.add("social-icon");
        if (text) text.classList.add("social-text");

        createSocialLinkHover(item);
      });
    }
  } catch (error) {
    console.warn("Error setting up hover effects:", error);
  }
};

onBeforeUnmount(() => {
  try {
    cleanupContactAnimations();
  } catch (error) {
    console.error("Error cleaning up contact animations:", error);
  }
});
</script>

<template>
  <section id="contact" class="relative py-20 md:py-32">
    <div class="text-center mb-12 md:mb-20">
      <h1 ref="titleRef" class="text-4xl font-bold text-center mb-4">
        Let's Connect
      </h1>
      <p
        ref="subtitleRef"
        class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center"
      >
        Whether you have a project in mind, want to collaborate, or just want to
        say hello - I'm always excited to connect with fellow developers,
        designers, and creators.
      </p>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div ref="formRef">
        <ContactForm />
      </div>

      <div class="flex flex-col gap-8">
        <UCard
          ref="contactInfoCardRef"
          :ui="{
            root: 'flex-1',
            body: 'h-full flex flex-col justify-between',
          }"
        >
          <div
            v-for="contact in contactInfo"
            :key="contact.id"
            ref="contactInfoRef"
            class="group"
          >
            <a
              :href="contact.href"
              :target="contact.label === 'Location' ? '_blank' : undefined"
              :rel="
                contact.label === 'Location' ? 'noopener noreferrer' : undefined
              "
              class="flex items-start space-x-4 p-4 rounded-xl hover:bg-muted transition-all duration-300 group"
            >
              <div
                class="w-12 h-12 bg-accented/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-highlighted/10 transition-all duration-300"
              >
                <UIcon
                  :name="contact.icon"
                  class="w-6 h-6 text-default group-hover:text-highlighted"
                />
              </div>
              <div class="flex-1 min-w-0 overflow-hidden">
                <h3
                  class="font-semibold text-default mb-1 group-hover:text-highlighted transition-colors truncate"
                >
                  {{ contact.label }}
                </h3>
                <p
                  class="text-toned text-sm break-words group-hover:text-default transition-colors hyphens-auto"
                >
                  {{ contact.value }}
                </p>
              </div>
              <UIcon
                name="i-lucide-arrow-up-right"
                class="w-4 h-4 text-toned opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
          </div>
        </UCard>

        <UCard ref="socialCardRef">
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
        </UCard>
      </div>
    </div>
  </section>
</template>
