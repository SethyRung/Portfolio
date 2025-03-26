export default defineAppConfig({
  ui: {
    colors: {
      primary: "emerald",
    },
    navigationMenu: {
      compoundVariants: [
        {
          variant: "pill",
          active: true,
          highlight: false,
          class: {
            link: "before:bg-transparent",
          },
        },
      ],
    },
  },
});
