<template>
  <ModalWrapper :isOpen="isOpen" :onClose="closeModal">
    <div>Modal Content</div>
  </ModalWrapper>
  <button class="button" @click="openModal">Open Modal</button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import ModalWrapper from './ModalWrapper.vue'

  const isOpen = ref(false)

  function openModal() {
    isOpen.value = true
  }

  function closeModal() {
    isOpen.value = false
  }
</script>

<style scoped>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 150px;
    border: var(--border);
    border-radius: var(--rounded-xl);
    padding: 1rem;
    background-color: var(--page);
    color: var(--fuchsia-500);
  }
  button {
    margin: auto;
  }
</style>
