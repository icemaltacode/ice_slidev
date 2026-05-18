<template>
  <div class="slidev-layout end">
    <div class="end-body">
      <slot>
        <h1>Thank you</h1>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.end {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--ice-primary) 0%,
    var(--ice-primary-strong) 100%
  );
  color: white;
}
.end-body {
  text-align: center;
}
.end-body :deep(h1),
.end-body :deep(h2),
.end-body :deep(p) {
  color: white;
}
.end-body :deep(h1) {
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
}
.end-body :deep(p) {
  font-size: 1.25rem;
  opacity: 0.85;
  margin-top: 1rem;
}
</style>
