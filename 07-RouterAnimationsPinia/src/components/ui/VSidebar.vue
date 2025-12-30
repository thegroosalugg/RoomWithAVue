<template>
  <div class="backdrop" :class="{ visible: isOpen(position) }" @click="closeSidebar" />
  <aside :class="{ visible: isOpen(position), 'on-right': position === 'right' }">
    <div class="content">
      <header>
        <!-- .button is global CSS; .close for specificity for this button only -->
        <button class="button close" @click="closeSidebar">X</button>
        <slot name="header" />
      </header>
      <main>
        <slot />
      </main>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { useSidebar } from '@/lib/composables/useSidebar'

  defineProps<{ position: 'left' | 'right' }>()
  const { isOpen, closeSidebar } = useSidebar()
</script>

<style scoped>
  /* sidebars are persistent & accessible on all routes - they will be shown/hidden */
  .backdrop {
    --opacity: 0;
    --pointer: none;
    position: fixed;
    z-index: 10;
    inset: 0;
    display: none; /* Mobile Devices: no backdrop - sidebar takes up 100% space */
    width: 100%;
    height: 100vh; /* inset + height -> prevents on-zoom backdrop waterfall */
    background-color: rgba(0, 0, 0, var(--opacity));
    cursor: pointer;
    pointer-events: var(--pointer);
    transition: background-color 0.3s ease;

    &.visible  { --opacity: 0.75; --pointer: auto; }
    &:hover    { --opacity: 0.55; }
    @media (min-width: 768px) { display: block; } /* backdrop on large screens only */
  }

  aside {
    --left: 0; /* Default sidebar: on left hand side | on right with optional class */
    --translate: -100%;
    position: fixed;
    z-index: 20;
    inset: 0;
    right: 0;
    left: var(--left);
    height: 100vh;
    width: 100%; /* Mobile Devices: takes up full width */
    background: var(--page);
    transform: translate(var(--translate));
    transition: transform 0.3s ease;

    &.visible { transform: translate(0); }
    &.on-right { --left: auto; --translate: 100%; }
    @media (min-width: 768px) { width: 45%; } /* Large Devices: shares space with backdrop */
  }

  /* content wrapper can be replaced if needed; it ensures:
  - content has sticky close-button & confined within bounds of browser UI elements (mobile),
  - slot-content automatically scrolls */
  .content {
    height: 100dvh;
    display: flex;
    flex-direction: column;

    > header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;

      &.on-right { justify-content: end; }
      @media (max-width: 640px) { padding: 0.5rem; }
    }

    > main { flex: 1; overflow: auto; }
  }
  button.close {
    margin-left: auto;
    order: 1;
  }
  .on-right button.close {
    margin-left: 0;
    order: 0;
    &:only-child { margin-right: auto; }
  }
</style>
