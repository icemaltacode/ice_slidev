<script setup lang="ts">
import bgImage from '../assets/bg_main.png'
</script>

<template>
  <div class="slidev-layout unit-title" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="ut-stack">
      <div class="ut-title">
        <slot>
          <h1>Unit Title</h1>
        </slot>
      </div>
      <div class="ut-number">
        <slot name="number">
          <p>1.1.1</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-title {
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

.ut-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.75rem;
}

.ut-title :deep(h1),
.ut-title :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  line-height: 1.02;
  color: white;
  margin: 0;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
}

.ut-number :deep(p),
.ut-number :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 28pt;
  line-height: 1.2;
  color: white;
  margin: 0;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
}
</style>
