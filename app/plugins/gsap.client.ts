import { defineNuxtPlugin } from "#app";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollSmoother);
  gsap.registerPlugin(ScrollTrigger);

  return {
    provide: {
      gsap,
      ScrollSmoother: ScrollSmoother,
      ScrollTrigger: ScrollTrigger,
    },
  };
});
