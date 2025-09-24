export function useGSAP() {
  const { $gsap, $ScrollSmoother, $ScrollTrigger } = useNuxtApp();
  return {
    gsap: $gsap,
    ScrollSmoother: $ScrollSmoother,
    ScrollTrigger: $ScrollTrigger,
  };
}
