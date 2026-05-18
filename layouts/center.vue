<template>
  <div class="slidev-layout center">
    <div class="center-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.center-body {
  text-align: center;
  max-width: 80%;
}
.center-body :deep(h1) {
  font-size: 3rem;
}
</style>
