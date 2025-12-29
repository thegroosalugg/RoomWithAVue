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
        <button class="button square" @click="closeSideBar" :style>X</button>
        <section>
          <button v-for="letter in ['a', 'b', 'c', 'd', 'e']" :key="letter" class="box square">
            {{ letter }}
          </button>
        </section>
      </nav>
    </template>
    <VScrollDummy color="fuchsia-500" :elements="35" />
  </AppSidebar>
  <!--** Generic Page Controls -->
  <nav style="justify-content: center; align-items: stretch; overflow-x: scroll;">
    <button class="button" @click="openModal">Open Modal</button>
    <button class="button" @click="openSideBar">Open SideBar</button>
    <button class="button" @click="toggleSideBarPosition">SideBar Left-Right</button>
  </nav>
  <!-- ** SLOT PROPS (React: Render Props) -->
  <!-- #default: access to main slot, with multi-slots, or slots with props. Can be set on <VSearchList #default="props"> when only 1 used slot -->
  <VSearchList :items="users" searchKey="name">
    <template #default="{ item, query }">
      <article class="box">
        <h2>
          <strong v-if="query">{{ query }} === </strong>
          <span v-else>Name: </span>
          <span>{{ item.name }}</span>
        </h2>
        <p>Phone: {{ item.phone }}</p>
        <p>Email: {{ item.email }}</p>
      </article>
    </template>
    <template #empty="{ query }">
      <p>DemoSlots.vue: no matches for</p>
      <strong>{{ query }}</strong>
    </template>
  </VSearchList>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import VModal from './VModal.vue'
  import AppSidebar from './AppSidebar.vue'
  import VSearchList from './VSearchList.vue'
  import VScrollDummy from '../VScrollDummy.vue';
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

  const style = computed(() => {
    const [order, margin] = sideBarIsOnRight.value ? [0, '0 auto 0 0'] : [1, '0 0 0 auto']
    return { order, margin }
  })
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
    align-items: center;
    gap: 0.5rem;
    padding: var(--padding-md);
    border-bottom: var(--border);

    section {
      display: flex;
      gap: 0.5rem;
      padding: 0.25rem;
      overflow-x: scroll;
    }
  }
  .square {
    min-width: 44px;
    height: 44px;
  }
  /* Parent scoped styles can also style the First Wrapper of a Child Component (Careful when selecting DOM elements specifically with children) */
  .search-list {
    margin: var(--margin);
    max-width: 300px;
  }
</style>
