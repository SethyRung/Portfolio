<template>
  <section id="about-me" class="@container/wrapper p-4 md:p-12 lg:p-20">
    <h2
      v-motion-slide-visible-once-left
      class="font-bold text-base text-emerald-500"
    >
      ../About me
    </h2>
    <p
      v-motion-fade-visible-once
      :delay="300"
      class="my-4 tablet:my-8 text-center @3xl/wrapper:text-left computer:my-14 @3xl/wrapper:max-w-[488px] tablet:text-xl text-neutral-950"
    >
      Hello I’m Sethy. I’m a
      <TextHighlight
        :delay="1500"
        class="bg-gradient-to-r from-emerald-400 to-emerald-400"
        text-end-color="var(--color-white)"
      >
        full-stack web developer
      </TextHighlight>
      More than
      <TextHighlight
        :delay="1500"
        class="bg-gradient-to-r from-emerald-400 to-emerald-400"
        text-end-color="var(--color-white)"
      >
        2 years
      </TextHighlight>
      experience.
    </p>
    <div
      v-motion-fade-visible-once
      :delay="300"
      class="my-6 flex justify-between items-center gap-6 flex-col @3xl/wrapper:flex-row-reverse @3xl/wrapper:items-start relative"
    >
      <div
        class="@3xl/wrapper:sticky @3xl/wrapper:top-16 max-w-sm p-4 border border-gray-200 rounded-2xl shadow-sm space-y-2"
      >
        <NuxtImg
          src="/images/sethy-profile.jpg"
          class="w-full max-h-80 @3xl/wrapper:max-h-auto object-cover rounded-xl"
          loading="lazy"
        />
        <ShimmerButton
          class="w-full mt-4 shadow-2xl"
          shimmer-size="2px"
          @click="downloadFile"
        >
          <span
            class="whitespace-pre-wrap flex items-center gap-2 text-sm leading-none tracking-tight text-white"
          >
            <UIcon name="i-lucide-download" size="20" />
            My Resume
          </span>
        </ShimmerButton>
      </div>
      <div
        class="grow w-full @3xl/wrapper:max-w-[640px] @5xl/wrapper:max-w-[720px] space-y-8"
      >
        <div
          v-for="(skill, index) in skills"
          :key="skill.title + index"
          class="w-full space-y-2"
        >
          <h3 class="font-bold">
            {{ skill.title }}
          </h3>
          <AnimateGrid
            :logos="skill.icons"
            class="grid-cols-4 @xl/wrapper:grid-cols-5 @5xl/wrapper:grid-cols-6"
          >
            <template #logo="{ logo }">
              <UIcon
                :name="logo.name"
                size="40"
                :style="{ color: logo.color }"
              />
            </template>
          </AnimateGrid>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import TextHighlight from "@/components/Texts/TextHighlight.vue";
import AnimateGrid from "@/components/Miscellaneous/AnimateGrid.vue";
import ShimmerButton from "@/components/Buttons/ShimmerButton.vue";

const skills: {
  title: string;
  icons: { name: string; color?: string; size?: string }[];
}[] = [
  {
    title: "Front-end",
    icons: [
      { name: "i-simple-icons-html5", color: "#E34F26" },
      { name: "i-simple-icons-css", color: "#663399" },
      { name: "i-simple-icons-javascript", color: "#F7DF1E" },
      { name: "i-simple-icons-typescript", color: "#3178C6" },
      { name: "i-simple-icons-vuedotjs", color: "#4FC08D" },
      { name: "i-simple-icons-nuxtdotjs", color: "#00DC82" },
      { name: "i-simple-icons-react", color: "#61DAFB" },
      { name: "i-simple-icons-nextdotjs", color: "#000000" },
      { name: "i-simple-icons-tailwindcss", color: "#06B6D4" },
      { name: "i-simple-icons-mui", color: "#007FFF" },
      { name: "i-simple-icons-vuetify", color: "#1867C0" },
      { name: "i-simple-icons-shadcnui", color: "#000000" },
    ],
  },
  {
    title: "Back-end",
    icons: [
      { name: "i-simple-icons-springboot", color: "#6DB33F" },
      { name: "i-simple-icons-express", color: "#000000" },
      { name: "i-simple-icons-nestjs", color: "#E0234E" },
      { name: "i-simple-icons-fastapi", color: "#009688" },
    ],
  },
  {
    title: "Datebase",
    icons: [
      { name: "i-simple-icons-mysql", color: "#4479A1" },
      { name: "i-simple-icons-postgresql", color: "#4169E1" },
      { name: "i-simple-icons-mongodb", color: "#47A248" },
    ],
  },
  {
    title: "Tools",
    icons: [
      { name: "i-simple-icons-docker", color: "#2496ED" },
      { name: "i-simple-icons-git", color: "#F05032" },
      { name: "i-simple-icons-postman", color: "#FF6C37" },
      { name: "i-simple-icons-github", color: "#181717" },
      { name: "i-simple-icons-gitlab", color: "#FC6D26" },
      { name: "i-simple-icons-render", color: "#000000" },
      { name: "i-simple-icons-vercel", color: "#000000" },
      { name: "i-simple-icons-netlify", color: "#00C7B7" },
    ],
  },
];

const downloadFile = async () => {
  try {
    const response = await $fetch<Blob>("/files/cv.pdf");
    const url = window.URL.createObjectURL(response);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "SethyRung.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch {
    const toast = useToast();
    toast.add({ title: "Download failed", color: "error" });
  }
};
</script>
