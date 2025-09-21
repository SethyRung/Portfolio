import gsap from 'gsap'

export const animateText = (element: HTMLElement, text: string, delay = 0) => {
  const chars = text.split('')
  element.innerHTML = chars.map(char => `<span class="inline-block opacity-0" style="transform: translateY(10px) scale(0.9);">${char === ' ' ? '&nbsp;' : char}</span>`).join('')

  gsap.to(element.children, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.04,
    delay,
    ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  })
}

export const animateOnScroll = (selector: string, animation = {}) => {
  gsap.fromTo(selector,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      ...animation
    }
  )
}

export const parallaxEffect = (element: HTMLElement, speed = 0.5) => {
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}