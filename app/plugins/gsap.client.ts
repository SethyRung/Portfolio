import { defineNuxtPlugin } from "#app";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);

  return {
    provide: {
      gsap,
      ScrollSmoother: ScrollSmoother,
      ScrollTrigger: ScrollTrigger,
      ScrollToPlugin: ScrollToPlugin,
    },
  };
});
