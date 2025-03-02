<template>
  <div
    :class="
      cn(
        'relative grid w-full max-w-full items-center',
        props.class
          ? props.class
          : props.logos.length < 4
          ? `grid-cols-[repeat(var(--grid-cols),_minmax(0,_1fr))]`
          : 'grid-cols-4'
      )
    "
    :style="{
      transform: `perspective(${props.perspective}px) rotateX(${props.rotateX}deg) rotateY(${props.rotateY}deg)`,
      '--glow-start-color': textGlowStartColor,
      '--glow-end-color': textGlowEndColor,
      '--grid-cols': props.logos.length,
    }"
  >
    <div
      v-for="(item, index) in props.logos"
      :key="index"
      ref="card"
      class="aspect-square p-3 flex justify-center items-center rounded border border-transparent transition-all duration-200 shadow-[2px_2px_5px_rgba(217,251,232,0.5),_3px_3px_10px_rgba(217,251,232,0.5),_6px_6px_20px_rgba(217,251,232,0.1)] dark:shadow-[2px_2px_5px_rgba(31,41,55,0.2),_3px_3px_10px_rgba(31,41,55,0.2),_6px_6px_20px_rgba(31,41,55,0.1)] dark:hover:shadow-[3px_3px_5px_rgba(31,41,55,1),_5px_5px_10px_rgba(31,41,55,1),_10px_10px_20px_rgba(31,41,55,1)] [&>svg]:opacity-75 hover:[&>svg]:opacity-100 [&>svg]:duration-200 [&>svg]:[shape-rendering:geometricPrecision]"
    >
      <slot name="logo" :logo="item" :index="index"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const card = templateRef("card");

type Props = {
  class?: string;
  perspective?: number;
  textGlowStartColor?: string;
  textGlowEndColor?: string;
  logos: any[];
  rotateX?: number;
  rotateY?: number;
};

const props = withDefaults(defineProps<Props>(), {
  class: undefined,
  textGlowStartColor: "#38ef7d80",
  textGlowEndColor: "#38ef7d",
  perspective: 600,
  rotateX: 0,
  rotateY: 0,
});

onMounted(() => {
  card.value?.forEach((el) => {
    const { isOutside } = useMouseInElement(el);

    watch(isOutside, (isOutside) => {
      if (!isOutside) {
        el.classList.add("card-raised-big");
      } else {
        el.classList.remove("card-raised-big");
      }
    });
  });
});
</script>

<style scoped>
.card-raised-big {
  z-index: 100;
  border: 1px solid rgba(0, 193, 106, 0.5);
  background-color: white;
  transform: scale(1.1);
  animation: text-glow 1.5s alternate infinite ease-in-out;
}

.dark .card-raised-big {
  border: 1px solid rgba(217, 251, 232, 0.3);
  background-color: #020420;
}

@keyframes text-glow {
  0% {
    filter: drop-shadow(0px 0px 2px var(--glow-start-color));
  }

  100% {
    filter: drop-shadow(0px 1px 8px var(--glow-end-color));
  }
}
</style>
