<script setup lang="ts"></script>

<template>
  <div class="bg-default font-geist relative">
    <AppHeader />
    <ScrollSmootherWrapper>
      <UMain>
        <UContainer>
          <slot></slot>
        </UContainer>
      </UMain>
      <AppFooter />
    </ScrollSmootherWrapper>
  </div>
</template>
