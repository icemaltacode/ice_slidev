<script setup lang="ts">
import iceLogo from '../assets/ice_logo_black.png'
</script>

<template>
  <div class="slidev-layout educator">
    <img :src="iceLogo" class="ed-logo" alt="ICE" />

    <div class="ed-body">
      <slot>
        <h1>Your Educator</h1>
        <ul class="ed-list">
          <li><strong>📚 The Basics</strong><br>Fill me in</li>
          <li><strong>👤 Role</strong><br>Fill me in</li>
          <li><strong>🏆 Qualifications</strong><br>Fill me in</li>
          <li><strong>😊 Hobbies &amp; Other Stuff</strong><br>Fill me in</li>
        </ul>
      </slot>
    </div>

    <div class="ed-person ed-person-1">
      <div class="ed-person-photo">
        <slot name="photo1" />
      </div>
    </div>

    <div class="ed-person ed-person-2">
      <div class="ed-person-photo">
        <slot name="photo2" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.educator {
  position: relative;
  background: #f4ddd5;
  color: black;
  padding: 4rem 4.5rem 3rem;
}

.ed-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.ed-body {
  width: 55%;
}

.ed-body :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  color: #7B31FE;
  margin: 0 0 1.5rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.ed-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.ed-body :deep(li) {
  position: relative;
  padding-left: 1em;
  margin: 0.4em 0;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 24pt;
  color: black;
  line-height: 1.25;
}

.ed-body :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
  color: inherit;
  font-weight: 500;
}

.ed-body :deep(li strong) {
  font-weight: 900;
  font-size: 26pt;
}

/* Loose markdown lists wrap item content in <p>; without this override
   the global .slidev-layout p { color: var(--ice-fg) } takes over and
   the headers fade out in dark mode. */
.ed-body :deep(p) {
  color: black;
  margin: 0;
}

.ed-person {
  position: absolute;
  width: 30%;
}

.ed-person-photo {
  width: 90%;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  background: #f2b960;
  border-radius: 50%;
  overflow: hidden;
  box-shadow:
    0 0 0 4px #ffffff,
    0 16px 36px rgba(15, 23, 42, 0.18);
}

.ed-person-photo :deep(p) {
  width: 100%;
  height: 100%;
  margin: 0;
}

.ed-person-photo :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ed-person-1 {
  right: 4%;
  top: 4%;
}

.ed-person-2 {
  right: 18%;
  top: 38%;
}
</style>
