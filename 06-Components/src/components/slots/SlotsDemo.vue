<template>
  <ModalWrapper :isOpen="modalIsOpen" :onClose="closeModal">
    <div>Modal Content</div>
  </ModalWrapper>
  <SideBar :isOpen="sidebarIsOpen" :onRight="sideBarIsOnRight" :onClose="closeSideBar">
    <!-- v-slot:slot-name === #slot-name (shorthand) -->
    <template #header>
      <nav>
        <button
          v-for="num in 6"
          :key="num"
          class="box"
          :style="buttonProps(num).style"
          @click="buttonProps(num).click"
        >
          {{ buttonProps(num).label }}
        </button>
      </nav>
    </template>
    <ul>
      <li v-for="num in 100" :key="num" class="box">{{ num }}</li>
    </ul>
  </SideBar>
  <section>
    <button class="button" @click="openModal">Open Modal</button>
    <button class="button" @click="openSideBar">Open SideBar</button>
    <button class="button" @click="toggleSideBarPosition">SideBar Left-Right</button>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import ModalWrapper from './ModalWrapper.vue'
  import SideBar from './SideBar.vue'

  const modalIsOpen = ref(false)
  const sidebarIsOpen = ref(false)
  const sideBarIsOnRight = ref(false)

  function openModal() {
    modalIsOpen.value = true
  }

  function closeModal() {
    modalIsOpen.value = false
  }

  function openSideBar() {
    sidebarIsOpen.value = true
  }

  function closeSideBar() {
    sidebarIsOpen.value = false
  }

  function toggleSideBarPosition() {
    sideBarIsOnRight.value = !sideBarIsOnRight.value
  }

  function buttonProps(num: number) {
    let label = num.toString()
    let style = {}
    let click = () => console.log('click ' + num)

    const specialNum = sideBarIsOnRight.value ? 1 : 6

    if (num === specialNum) {
      label = 'X'
      click = closeSideBar
      style = sideBarIsOnRight.value ? { marginRight: 'auto' } : { marginLeft: 'auto' }
    }

    return { label, style, click }
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
  section {
    display: flex;
    gap: 0.5rem;
    margin: auto;
  }
  nav {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: var(--border);
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
</style>
