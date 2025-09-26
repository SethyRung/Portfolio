<script setup lang="ts">
const { gsap, ScrollTrigger } = useGSAP();

const sectionRef = useTemplateRef("sectionRef");
const cardRef = useTemplateRef("cardRef");
const contentRef = useTemplateRef("contentRef");

const avatarContainer = useTemplateRef("avatarContainer");
const avatarBase = useTemplateRef("avatarBase");
const hoverRipple = useTemplateRef("hoverRipple");
const clickRipples = useTemplateRef("clickRipples");
const ambientRipple = useTemplateRef("ambientRipple");

let rippleTimeout: number | null = null;
let clickRippleCount = 0;

const skills = [
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
];

const handleHoverRipple = () => {
  if (!hoverRipple.value) return;

  if (rippleTimeout) {
    clearTimeout(rippleTimeout);
  }

  gsap.set(hoverRipple.value, {
    scale: 0,
    opacity: 0,
  });

  gsap.to(hoverRipple.value, {
    scale: 1.3,
    opacity: 0.4,
    duration: 0.6,
    ease: "power2.out",
  });

  setTimeout(() => {
    if (hoverRipple.value) {
      gsap.to(hoverRipple.value, {
        scale: 1.6,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, 200);

  rippleTimeout = setTimeout(() => {
    if (hoverRipple.value) {
      gsap.set(hoverRipple.value, {
        scale: 0,
        opacity: 0,
      });
    }
  }, 1000);
};

const handleClickRipple = (event: MouseEvent) => {
  if (!clickRipples.value || !avatarContainer.value) return;

  clickRippleCount++;

  const rect = avatarContainer.value.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const ripple = document.createElement("div");
  ripple.className = "absolute bg-default/40 rounded-full pointer-events-none";
  ripple.style.width = "0px";
  ripple.style.height = "0px";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.transform = "translate(-50%, -50%)";

  clickRipples.value.appendChild(ripple);

  gsap.to(ripple, {
    width: `${size * 2}px`,
    height: `${size * 2}px`,
    opacity: 0.6,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => {
      gsap.to(ripple, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          ripple.remove();
        },
      });
    },
  });

  if (avatarBase.value) {
    gsap.to(avatarBase.value, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(avatarBase.value!, {
          scale: 1.05,
          duration: 0.2,
          ease: "elastic.out(1, 0.3)",
        });
      },
    });
  }

  setTimeout(() => {
    if (ambientRipple.value) {
      gsap.to(ambientRipple.value, {
        scale: 1.2,
        opacity: 0.6,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(ambientRipple.value!, {
            scale: 1,
            opacity: 0.3,
            duration: 0.6,
            ease: "power2.inOut",
          });
        },
      });
    }
  }, 100);

  if (clickRippleCount > 10) {
    const existingRipples = clickRipples.value.children;
    if (existingRipples.length > 5) {
      existingRipples[0]?.remove();
    }
    clickRippleCount = Math.max(0, clickRippleCount - 1);
  }
};

const createAmbientRippleAnimation = () => {
  if (!ambientRipple.value) return;

  const ambientTimeline = gsap.timeline({ repeat: -1 });

  ambientTimeline
    .to(ambientRipple.value, {
      scale: 1.1,
      opacity: 0.4,
      duration: 2,
      ease: "power2.inOut",
    })
    .to(ambientRipple.value, {
      scale: 1,
      opacity: 0.3,
      duration: 2,
      ease: "power2.inOut",
    });

  return ambientTimeline;
};

onMounted(() => {
  if (!sectionRef.value) return;

  let ambientTimeline: gsap.core.Timeline | undefined;
  if (ambientRipple.value) {
    ambientTimeline = createAmbientRippleAnimation();
  }

  gsap.set(sectionRef.value, { opacity: 0, y: 50 });

  gsap.to(sectionRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  if (avatarContainer.value) {
    const avatarTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: avatarContainer.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    if (avatarBase.value && hoverRipple.value) {
      avatarTimeline
        .set(avatarBase.value, { scale: 0, opacity: 0 })
        .to(avatarBase.value, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        })
        .to(
          hoverRipple.value,
          {
            scale: 1.5,
            opacity: 0.4,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          hoverRipple.value,
          {
            scale: 2,
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.2",
        )
        .to(avatarBase.value, {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(avatarBase.value, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)",
        });
    }
  }

  if (cardRef.value) {
    gsap.to(cardRef.value, {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  if (avatarContainer.value) {
    gsap.to(avatarContainer.value, {
      y: -30,
      scale: 1.02,
      rotation: 2,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }

  if (contentRef.value) {
    const contentChildren = Array.from(contentRef.value.children);

    // Set initial state for content children to be hidden
    gsap.set(contentChildren, { opacity: 0, y: 30 });

    gsap.to(contentChildren, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: contentRef.value,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }

  const floatingAccents = cardRef.value?.querySelectorAll(
    ".absolute.-top-2, .absolute.-bottom-2",
  );
  if (floatingAccents && floatingAccents.length > 0) {
    gsap.set(floatingAccents, { opacity: 0, scale: 0 });

    gsap.to(floatingAccents, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: cardRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }

  return () => {
    if (rippleTimeout) {
      clearTimeout(rippleTimeout);
    }
    if (ambientTimeline) {
      ambientTimeline.kill();
    }
  };
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  if (rippleTimeout) {
    clearTimeout(rippleTimeout);
    rippleTimeout = null;
  }

  if (clickRipples.value) {
    const ripples = clickRipples.value.children;
    Array.from(ripples).forEach((ripple) => ripple.remove());
  }
});
</script>

<template>
  <section id="about" ref="sectionRef" class="py-24 bg-default">
    <div class="text-center mb-16">
      <h2 class="text-3xl sm:text-4xl font-bold text-default mb-4">About Me</h2>
      <p class="text-lg text-toned max-w-2xl mx-auto">
        Get to know me, my journey, and what I bring to the table
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div ref="cardRef" class="relative">
        <div class="overflow-hidden border border-default shadow-lg rounded-xl">
          <div class="p-8">
            <div
              class="aspect-square bg-elevated rounded-xl flex items-center justify-center"
            >
              <div class="text-center">
                <div
                  ref="avatarContainer"
                  class="relative inline-block mb-6 cursor-pointer"
                  @mouseenter="handleHoverRipple"
                  @click="handleClickRipple"
                >
                  <div
                    ref="avatarBase"
                    class="relative w-32 h-32 bg-default rounded-full mx-auto flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-105 z-10"
                  >
                    <span class="text-3xl font-bold text-default">SR</span>
                  </div>

                  <div class="absolute inset-0 pointer-events-none">
                    <div
                      ref="hoverRipple"
                      class="absolute inset-0 bg-default rounded-full scale-0 opacity-0 transform transition-all duration-500 ease-out"
                    ></div>

                    <div
                      ref="clickRipples"
                      class="absolute inset-0 rounded-full overflow-hidden"
                    ></div>

                    <div
                      ref="ambientRipple"
                      class="absolute inset-0 bg-default/20 rounded-full scale-100 opacity-30 animate-pulse"
                    ></div>
                  </div>
                </div>

                <h3 class="text-xl font-semibold text-default mb-2">
                  Sethy Rung
                </h3>
                <p class="text-muted">Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-muted dark:to-toned rounded-full shadow-lg"
        ></div>
        <div
          class="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-green-400 to-blue-400 dark:from-muted dark:to-toned rounded-full shadow-lg"
        ></div>
      </div>

      <!-- Content -->
      <div ref="contentRef" class="space-y-8">
        <div>
          <h3 class="text-2xl font-semibold text-default mb-4">
            Passionate Developer
          </h3>
          <p class="text-toned leading-relaxed">
            I'm a passionate full-stack developer with expertise in modern web
            technologies. I love creating beautiful, functional applications
            that solve real-world problems and provide exceptional user
            experiences.
          </p>
        </div>

        <div>
          <h3 class="text-2xl font-semibold text-default mb-4">My Journey</h3>
          <p class="text-toned leading-relaxed">
            With over 3 years of experience in web development, I've worked on
            various projects ranging from small business websites to large-scale
            enterprise applications. I'm constantly learning and adapting to new
            technologies and best practices.
          </p>
        </div>

        <div>
          <h3 class="text-2xl font-semibold text-default mb-4">Expertise</h3>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="(skill, index) in skills"
              :key="index"
              class="flex items-center space-x-2"
            >
              <div class="w-1.5 h-1.5 bg-muted rounded-full"></div>
              <span class="text-sm text-toned">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
