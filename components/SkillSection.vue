<template>
  <section class="@container/skill">
    <div class="px-4 md:px-12 lg:px-20">
      <div
        v-motion-fade-visible-once
        class="w-fit mx-auto px-2 py-1 text-emerald-400 rounded-full border border-gray-300 flex items-center justify-center gap-2"
      >
        <UIcon name="i-lucide-library" />
        <h2 class="font-bold bg-gradient-to-r">Skills</h2>
      </div>
      <p
        v-motion-fade-visible-once
        :delay="300"
        class="mx-auto my-6 text-center computer:my-14 @3xl/skill:max-w-[488px] tablet:text-xl text-neutral-950"
      >
        Hello I’m Sethy. I’m a full-stack web developer More than
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
        class="my-6 flex justify-between items-center gap-6 flex-col @3xl/skill:flex-row-reverse @3xl/skill:items-start relative"
      >
        <div
          class="@3xl/skill:sticky @3xl/skill:top-16 max-w-sm p-4 border border-gray-200 rounded-2xl shadow-sm space-y-2"
        >
          <NuxtImg
            src="/images/sethy-profile.jpg"
            class="w-full max-h-80 @3xl/skill:max-h-auto object-cover rounded-xl"
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
          class="grow w-full @3xl/skill:max-w-[640px] @5xl/skill:max-w-[720px] space-y-8"
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
              class="grid-cols-4 @xl/skill:grid-cols-5 @5xl/skill:grid-cols-6"
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
    </div>
    <div class="px-4 md:px-12 lg:px-20 mt-16">
      <div v-motion-fade-visible-once class="pb-4 border-b border-gray-300">
        <div class="flex items-center gap-4">
          <UIcon name="i-lucide-corner-right-down" class="text-2xl" />
          <h2 class="font-bold text-4xl">Works</h2>
        </div>
      </div>
      <UTable
        v-motion-fade-visible-once
        :data="works"
        :columns="columns"
        class="flex-1"
        :ui="{
          thead: 'hidden',
          tr: 'transition-all group hover:bg-black',
          td: 'py-6 text-base text-black group-hover:text-white',
        }"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import TextHighlight from "@/components/Texts/TextHighlight.vue";
import AnimateGrid from "@/components/Miscellaneous/AnimateGrid.vue";
import ShimmerButton from "@/components/Buttons/ShimmerButton.vue";
import type { TableColumn } from "@nuxt/ui";

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

type Work = {
  start: Date;
  end: Date;
  company: string;
  role: string;
};

const columns: TableColumn<Work>[] = [
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) =>
      h("div", [
        h(
          "p",
          { class: "group-hover:text-white" },
          `${row.original.start.getFullYear()} - ${
            isCurrentDate(row.original.end)
              ? "Present"
              : row.original.end.getFullYear()
          }`
        ),
        h(
          "p",
          { class: "text-xs text-gray-500" },
          calculateDuration(row.original.start, row.original.end)
        ),
      ]),
  },
  { accessorKey: "company", header: "Company" },
  { accessorKey: "role", header: "Role" },
];

const works = ref<Work[]>([
  {
    start: new Date("2023-11-01"),
    end: new Date("2025-01-01"),
    company: "Credit Bureau Cambodia",
    role: "Full stack developer | Vue & Nuxt & Spring boot",
  },
  {
    start: new Date("2025-03-17"),
    end: new Date(),
    company: "InnoBlock",
    role: "Frontend web developer | Vue & Nuxt",
  },
]);
</script>
