<template>
  <!-- teleport: (React: createPortal) reference an HTML element, class or ID -->
  <teleport to="body">
    <div v-if="isOpen" class="backdrop" @click="close" :data-closing="isClosing" />
    <!-- using :open=boolean keeps <dialog> in the DOM always. As this component is re-usable, this could build up -->
    <dialog v-if="isOpen" open :data-closing="isClosing">
      <!-- <slot> === { children } (React) | <ng-content> (Angular) -->
      <slot />
    </dialog>
  </teleport>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  export interface VModalMethods {
     open: () => void
    close: () => void
  }

  const isOpen = ref(false)
  const isClosing = ref(false)

  const emit = defineEmits<{ closing: [] }>() // default signature; event only, no payload

  function open() {
    isOpen.value = true
  }

  function close() {
    isClosing.value = true
    setTimeout(() => {
      isClosing.value = false
      emit('closing')
      isOpen.value = false
    }, 300) // match CSS animation duration
  }

  defineExpose<VModalMethods>({ open, close }) // Expose methods to parent (React: useImperativeHandle)
</script>
<style scoped>
  /* modals are ephemereal and plentiful - they will be created/destroyed */
  .backdrop {
    --opacity: 0.75;
    position: fixed;
    z-index: 10;
    inset: 0;
    width: 100%;
    height: 100vh; /* inset + height -> prevents on-zoom backdrop waterfall */
    background-color: rgba(0, 0, 0, var(--opacity));
    cursor: pointer;
    transition: background-color 0.3s ease;
    animation: fade-in 300ms ease-out forwards;

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
    animation: slide-in-from-top 300ms ease-out forwards;

    &[data-closing='true'] { animation: slide-out-to-top 300ms ease-in forwards; }
  }
</style>
