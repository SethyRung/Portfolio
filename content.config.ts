import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: "page",
      source: "projects/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        release: z.string(),
        image: z.string(),
        url: z.string(),
      }),
    }),
  },
});
