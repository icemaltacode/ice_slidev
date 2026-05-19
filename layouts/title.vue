<script setup lang="ts">
import bgImage from '../assets/bg_main.png'
import iceLogo from '../assets/ice_logo.png'
import squiggle from '../assets/squiggle.png'
</script>

<template>
  <div class="slidev-layout title" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="title-top">
      <img :src="iceLogo" alt="ICE" class="title-logo" />
    </div>
    <div class="title-main">
      <slot>
        <h1>ICE Campus</h1>
      </slot>
    </div>
    <div class="title-footer">
      <slot name="footer">
        <p>icecampus.com</p>
      </slot>
      <img :src="squiggle" alt="" class="title-squiggle" />
    </div>
  </div>
</template>

<style scoped>
.title {
  position: relative;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.title-top {
  display: flex;
  justify-content: center;
  padding-top: 2.25rem;
}

.title-logo {
  width: 80px;
  height: auto;
  display: block;
}

.title-main {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.title-main :deep(h1),
.title-main :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 92pt;
  line-height: 1.05;
  color: white;
  margin: 0;
  letter-spacing: -0.04em;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
}

.title-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 4rem;
}

.title-footer :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 28pt;
  line-height: 1.2;
  color: white;
  margin: 0;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
}

.title-squiggle {
  width: 180px;
  height: auto;
  display: block;
  opacity: 0.95;
}
</style>
