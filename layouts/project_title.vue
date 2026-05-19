<script setup lang="ts">
import bestInTheWorld from '../assets/best_in_the_world.png'
import castle from '../assets/castle.png'
import iceLogo from '../assets/ice_logo.png'

withDefaults(
  defineProps<{
    label?: string
  }>(),
  { label: 'Practical Project' },
)
</script>

<template>
  <div class="slidev-layout project-title">
    <img :src="bestInTheWorld" class="pt-badge" alt="Best in the world" />
    <img :src="iceLogo" class="pt-logo" alt="ICE" />
    <img :src="castle" class="pt-castle" alt="" />

    <div class="pt-text">
      <div class="pt-title">
        <slot>
          <h1>Persistent Shopping Cart</h1>
        </slot>
      </div>
      <div class="pt-description">
        <slot name="description">
          <p>Add persistence to the shopping cart app, including a user registration and login system.</p>
        </slot>
      </div>
    </div>

    <div class="pt-unit">
      <span class="pt-unit-bar"></span>
      <span class="pt-unit-text">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.project-title {
  position: relative;
  background: #201f27;
  color: white;
  padding: 4rem 5rem;
  overflow: hidden;
}

.pt-badge {
  position: absolute;
  top: 3rem;
  left: 5rem;
  width: 160px;
  height: auto;
}

.pt-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.pt-castle {
  position: absolute;
  right: calc(6rem + 100px);
  bottom: 0;
  width: 38%;
  height: auto;
  display: block;
}

.pt-text {
  position: absolute;
  left: 5rem;
  top: 50%;
  transform: translateY(-30%);
  max-width: 50%;
}

.pt-title :deep(h1),
.pt-title :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 46pt;
  line-height: 1.05;
  color: white;
  margin: 0 0 1.5rem;
  letter-spacing: -0.01em;
}

.pt-description :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 24pt;
  line-height: 1.35;
  color: white;
  margin: 0;
  max-width: 28ch;
}

.pt-unit {
  position: absolute;
  right: 2rem;
  bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.pt-unit-bar {
  display: block;
  width: 1px;
  height: 64px;
  background: white;
}

.pt-unit-text {
  writing-mode: sideways-lr;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 26pt;
  color: white;
  letter-spacing: 0.01em;
  line-height: 1;
}
</style>
