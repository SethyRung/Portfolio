<script setup lang="ts"></script>

<template>
  <div class="bg-default font-geist relative">
    <AppHeader />
    <ScrollSmootherWrapper>
      <UMain>
        <UContainer class="overflow-x-hidden">
          <slot></slot>
        </UContainer>
      </UMain>
      <AppFooter />
    </ScrollSmootherWrapper>
  </div>
</template>
