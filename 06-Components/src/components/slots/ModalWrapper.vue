<!-- you can have multiple slots; add a name prop to each slot beyond the first; bind to template with v-slot -->
<!--
<slot name="content-type" />
<template v-slot="content-type">
  <your-content />
</template>
-->

<template>
  <div v-if="isOpen" class="backdrop" @click="handleClose" :data-closing="isClosing" />
  <dialog :open="isOpen" :data-closing="isClosing">
    <!-- <slot> === { children } (React) | <ng-content> (Angular) -->
    <slot />
  </dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // reactive values (isOpen) would lose reactivity if destructured: Vue binds them to ref, <script setup> executes only once
  const { onClose } = defineProps<{ isOpen: boolean; onClose: () => void }>()

  const isClosing = ref(false)

  function handleClose() {
    isClosing.value = true
    setTimeout(() => {
      isClosing.value = false
      onClose() // calls the prop to set isOpen = false in parent
    }, 300) // duration matches CSS animation
  }
</script>

<style scoped>
  .backdrop {
    --opacity: 0.75;
    position: fixed;
    z-index: 10;
    inset: 0;
    width: 100%;
    min-height: 100vh; /* inset + MIN-height -> prevents on-zoom backdrop waterfall */
    background-color: rgba(0, 0, 0, var(--opacity));
    cursor: pointer;
    transition: background-color 0.3s ease;
    animation: fadeIn 300ms ease-out forwards;

    &:hover { --opacity: 0.55; }
    &[data-closing='true'] { --opacity: 0; }
  }
  dialog {
    position: fixed;
    z-index: 30;
    inset: 0;
    margin: auto; /* (inset: 0 | margin: auto) replaces the (top: 50% | left: 50% | transform: translate(-50%, -50%)) hack */
    max-height: 85%;
    max-width: 90%;
    overflow: auto;
    border: none;
    background: none;
    animation: slideInFromTop 300ms ease-out forwards;

    &[data-closing='true'] { animation: slideOutToTop 300ms ease-in forwards; }
  }
</style>
