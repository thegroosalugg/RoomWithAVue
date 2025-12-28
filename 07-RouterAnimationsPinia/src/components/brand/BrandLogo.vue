<template>
  <div class='brand-wrapper' :style="{ color: `var(--${color})`}">
    <!-- Replace SVG with brand SVG -->
    <svg
      fill="currentColor"
      width="20px"
      style="transform: translateX(5px)"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="256 144.03 200.51 47.92 121.08 47.92 256 281.61 390.92 47.92 311.49 47.92 256 144.03"
      />
      <polygon
        points="409.4 47.92 256 313.61 102.6 47.92 15.74 47.92 256 464.08 496.26 47.92 409.4 47.92"
      />
    </svg>
    <!-- Replace title with brand title -->
    <span :class="['brand-name', { responsive }]">ue App</span>
  </div>
</template>

<script setup lang="ts">
  import type { Color } from '@/lib/types/colors';

  withDefaults(defineProps<{ color?: Color; responsive?: boolean }>(), { color: 'accent' })
</script>

<style scoped>
  .brand-wrapper {
    display: flex;
    align-items: center;
    gap: 0.125rem;
    /* color: var(--accent); */
  }

  .brand-name {
    font-size: var(--text-base);
    font-weight: 700;
    text-wrap: nowrap;

    &.responsive {
      @media (min-width: 768px)  { display: none;   }
      @media (min-width: 1024px) { display: inline; }
    }
  }
</style>
