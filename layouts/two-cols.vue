<template>
  <div class="slidev-layout two-cols">
    <div class="two-cols-left">
      <slot />
    </div>
    <div class="two-cols-right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}
.two-cols-left,
.two-cols-right {
  min-width: 0;
}
</style>
