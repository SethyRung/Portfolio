import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const isMobile = () => {
  return (
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  );
};

export const animateText = (element: HTMLElement, text: string, delay = 0) => {
  const chars = text.split("");
  element.innerHTML = chars
    .map(
      (char) =>
        `<span class="inline-block opacity-0" style="transform: translateY(10px) scale(0.9);">${char === " " ? "&nbsp;" : char}</span>`,
    )
    .join("");

  gsap.to(element.children, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.04,
    delay,
    ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  });
};

export const animateOnScroll = (element: HTMLElement, animation = {}) => {
  // Set initial state
  gsap.set(element, {
    opacity: 0,
    y: 50,
  });

  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    ...animation,
  });
};

export const animateOnMobileScroll = (element: HTMLElement, animation = {}) => {
  if (isMobile()) {
    // Use Intersection Observer for mobile
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              element,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                ...animation,
              },
            );
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
  } else {
    // Use ScrollTrigger for desktop
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        ...animation,
      },
    );
  }
};

export const animateStaggerOnScroll = (
  elements: HTMLElement[],
  animation = {},
) => {
  if (isMobile()) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              elements,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                ...animation,
              },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (elements.length > 0) {
      observer.observe(elements[0]!);
    }
  } else {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: elements[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        ...animation,
      },
    );
  }
};

export const parallaxEffect = (element: HTMLElement, speed = 0.5) => {
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};
