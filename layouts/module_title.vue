<script setup lang="ts">
import bgImage from '../assets/bg_main.png'
</script>

<template>
  <div class="slidev-layout module-title" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="mt-stack">
      <div class="mt-title">
        <slot>
          <h1>Module #1</h1>
        </slot>
      </div>
      <div class="mt-number">
        <slot name="number">
          <p>#1</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.module-title {
  position: relative;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mt-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.75rem;
}

.mt-title :deep(h1),
.mt-title :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  line-height: 1.02;
  color: white;
  margin: 0;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
}

.mt-number :deep(p),
.mt-number :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 28pt;
  line-height: 1.2;
  color: white;
  margin: 0;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
}
</style>
