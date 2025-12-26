<template>
  <!-- ** SLOTS -->
  <VModal :isOpen="modalIsOpen" :onClose="closeModal">
    <div id="modal-content">Modal Content</div>
  </VModal>
  <!--** MULTI SLOTS -->
  <AppSidebar :isOpen="sidebarIsOpen" :onRight="sideBarIsOnRight" :onClose="closeSideBar">
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
  </AppSidebar>
  <!--** Generic Page Controls -->
  <nav>
    <button class="button" @click="openModal">Open Modal</button>
    <button class="button" @click="openSideBar">Open SideBar</button>
    <button class="button" @click="toggleSideBarPosition">SideBar Left-Right</button>
  </nav>
  <!-- ** SLOT PROPS (React: Render Props) -->
  <!-- #default: access to main slot, with multi-slots, or slots with props. Can be set on <VSearchList #default="props"> when only 1 used slot -->
  <VSearchList :items="users" searchKey="name">
    <template #default="{ item, query }">
      <p v-if="query">Matched for: {{ query }}</p>
      <article class="box">
        <h2>Name: {{ item.name }}</h2>
        <p>Phone: {{ item.phone }}</p>
        <p>Email: {{ item.email }}</p>
      </article>
    </template>
    <template #empty="{ query }">
      <p>SlotsDemo.vue, no matches for</p>
      <p>{{ query }}</p>
    </template>
  </VSearchList>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import VModal from './VModal.vue'
  import AppSidebar from './AppSidebar.vue'
  import VSearchList from './VSearchList.vue'
  import { USERS } from '@/data/users'

  const modalIsOpen = ref(false)
  const sidebarIsOpen = ref(false)
  const sideBarIsOnRight = ref(false)

  const users = ref(USERS)

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

  // sidebar close button auto stype, position & function
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
  #modal-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 150px;
    padding: 1rem;
    border: var(--border);
    border-radius: var(--rounded-xl);
    background-color: var(--page);
    color: var(--fuchsia-500);
  }
  nav {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: var(--border);
    overflow-x: scroll;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
  /* Parent scoped styles can also style the First Wrapper of a Child Component (Careful when selecting DOM elements specifically with children) */
  .search-list {
    margin: var(--margin);
    max-width: 300px;
  }
</style>
