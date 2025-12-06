<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const sectionRef = useTemplateRef("sectionRef");
const contentRef = useTemplateRef("contentRef");
const profileRef = useTemplateRef("profileRef");

const skills = [
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
];

onMounted(() => {
  if (!sectionRef.value) return;

  gsap.set(sectionRef.value, { opacity: 0, y: 30 });

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

  if (profileRef.value) {
    gsap.set(profileRef.value, { opacity: 0, x: -30 });

    gsap.to(profileRef.value, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: profileRef.value,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }

  if (contentRef.value) {
    const sections = contentRef.value.children;

    Array.from(sections).forEach((section, index) => {
      gsap.set(section, {
        opacity: 0,
        y: 20,
        transition: "none",
      });

      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1 + 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onComplete: () => {
          gsap.set(section, { transition: "" });
        },
      });
    });
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <section id="about" ref="sectionRef" class="py-20 md:py-32">
    <div class="text-center mb-16">
      <h2 class="text-4xl lg:text-5xl font-bold text-foreground mb-4">
        About Me
      </h2>
    </div>

    <div class="grid lg:grid-cols-3 gap-12 items-start">
      <div
        ref="profileRef"
        class="lg:col-span-1 text-center lg:text-left group"
      >
        <div
          class="bg-muted/50 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-muted/70 hover:shadow-lg hover:-translate-y-1"
        >
          <div
            class="w-32 h-32 mx-auto lg:mx-0 bg-muted rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
          >
            <span class="text-4xl font-bold text-muted-foreground">SR</span>
          </div>
          <h3 class="text-2xl font-semibold text-foreground mb-2">
            Sethy Rung
          </h3>
          <p class="text-muted-foreground mb-6">Full Stack Developer</p>
          <p class="text-muted-foreground leading-relaxed">
            Passionate about building modern web applications with clean code
            and exceptional user experiences.
          </p>
        </div>
      </div>

      <div ref="contentRef" class="lg:col-span-2 space-y-12">
        <div class="prose prose-neutral max-w-none">
          <h3 class="text-2xl font-semibold text-foreground mb-4">
            My Approach
          </h3>
          <p class="text-muted-foreground leading-relaxed mb-4">
            I'm a full-stack developer with expertise in modern web
            technologies. I focus on creating applications that are not only
            functional but also provide exceptional user experiences.
          </p>
          <p class="text-muted-foreground leading-relaxed">
            With experience across the entire development stack, I enjoy
            tackling complex problems and turning ideas into reality through
            clean, maintainable code.
          </p>
        </div>

        <div>
          <h3 class="text-2xl font-semibold text-foreground mb-6">
            Skills & Technologies
          </h3>
          <ul class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <li
              v-for="(skill, index) in skills"
              :key="index"
              class="flex items-center space-x-2"
            >
              <div class="w-2 h-2 bg-inverted rounded-full"></div>
              <span class="text-muted-foreground">{{ skill }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
