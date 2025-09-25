export function useGSAP() {
  const { $gsap, $ScrollSmoother, $ScrollTrigger, $ScrollToPlugin } =
    useNuxtApp();
  return {
    gsap: $gsap,
    ScrollSmoother: $ScrollSmoother,
    ScrollTrigger: $ScrollTrigger,
    ScrollToPlugin: $ScrollToPlugin,
  };
}
