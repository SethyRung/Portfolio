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

const contactAnimations: gsap.core.Timeline[] = [];
const animateContactSection = (elements: {
  title: HTMLElement;
  subtitle: HTMLElement;
  form: HTMLElement;
  contactCard: HTMLElement;
  socialCard: HTMLElement;
}) => {
  const tl = gsap.timeline({ delay: 0.2 });

  gsap.set(elements.title, { opacity: 0, y: 30 });
  gsap.set(elements.subtitle, { opacity: 0, y: 20 });
  gsap.set(elements.form, { opacity: 0, x: -30 });
  gsap.set(elements.contactCard, { opacity: 0, x: 30 });
  gsap.set(elements.socialCard, { opacity: 0, x: 30 });
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

  return tl;
};

const isMobile = () => {
  return (
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  );
};

const animateContactInfoItems = (items: HTMLElement[]) => {
  if (items.length === 0) return;

  if (isMobile()) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              items,
              { opacity: 0, y: 20, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
              },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (items[0]) {
      observer.observe(items[0]);
    }
  } else {
    gsap.fromTo(
      items,
      { opacity: 0, y: 20, scale: 0.95 },
      {
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
      },
    );
  }
};

const animateSocialLinks = (links: HTMLElement[]) => {
  if (links.length === 0) return;

  if (isMobile()) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              links,
              { opacity: 0, scale: 0.8, rotation: -10 },
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: "back.out(1.7)",
              },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (links[0]) {
      observer.observe(links[0]);
    }
  } else {
    gsap.fromTo(
      links,
      { opacity: 0, scale: 0.8, rotation: -10 },
      {
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
      },
    );
  }
};

const createContactItemHover = (element: HTMLElement) => {
  const icon = element.querySelector(".contact-icon");
  const arrow = element.querySelector(".contact-arrow");

  element.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(arrow, {
      opacity: 1,
      x: 3,
      y: -3,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(arrow, {
      opacity: 0,
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
};

const createSocialLinkHover = (element: HTMLElement) => {
  const icon = element.querySelector(".social-icon");
  const text = element.querySelector(".social-text");

  element.addEventListener("mouseenter", () => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(icon, {
      scale: 1.2,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
    gsap.to(text, {
      fontWeight: 600,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(icon, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(text, {
      fontWeight: 400,
      duration: 0.2,
      ease: "power2.out",
    });
  });
};

const cleanupContactAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.trigger?.closest("#contact") ||
      trigger.trigger?.classList?.contains("contact-item") ||
      trigger.trigger?.classList?.contains("social-link")
    ) {
      trigger.kill();
    }
  });
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
      const mainAnimation = animateContactSection({
        title: titleRef.value,
        subtitle: subtitleRef.value,
        form: formRef.value,
        contactCard: contactInfoCard,
        socialCard: socialCard,
      });
      contactAnimations.push(mainAnimation);
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
    contactAnimations.forEach((animation) => {
      if (animation && animation.kill) {
        animation.kill();
      }
    });


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

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-default mb-1 group-hover:text-highlighted transition-colors"
                >
                  {{ contact.label }}
                </h3>
                <p
                  class="text-toned text-sm break-words group-hover:text-default transition-colors"
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
