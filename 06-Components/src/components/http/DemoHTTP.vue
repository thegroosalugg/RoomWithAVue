<template>
  <header ref="headerRef">
    <h2>HTTP Demo</h2>
    <section>
      <button class="button" @click="reqAll({ url: 'all' })">Fetch Array</button>
      <button class="button" @click="reqOne({ url: 'one', onSuccess })">Fetch Object</button>
    </section>
  </header>
  <VLoader v-if="loadingAll" />
  <ul v-else-if="users.length" :style="{ maxHeight: getHeight }">
    <li v-if="loadingOne">
      <VLoader size="sm" color="white" />
    </li>
    <li v-for="{ id, name, email, phone } in users" :key="id" class="box">
      <h3>{{ name }}</h3>
      <p>{{ email }}</p>
      <p>{{ phone }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type User from '@/models/User'
  import { computed, ref } from 'vue';
  import { useDOMTracker } from '@/lib/composables/useDOMTracker';
  import { useFetch } from './useFetch'
  import VLoader from './VLoader.vue'

  // create scroll <list> that takes up only available screen space
  const { getElement } = useDOMTracker()
  const headerRef = ref<HTMLElement | null>(null)

  const getHeight = computed(() => {
    const navHeight = getElement('nav-header', 'Height')
    const offset = navHeight + (headerRef.value?.offsetHeight || 0)
    return `calc(100dvh - ${offset}px - 2rem)` // <ul> margin must be accounted for manually based on CSS (1rem auto = 2rem)
  })

  // HTTP Demo
  const { data: users, isLoading: loadingAll, reqHandler: reqAll } = useFetch<User[]>([])
  const { data, isLoading: loadingOne, reqHandler: reqOne } = useFetch<User>()

  function onSuccess(user: User) {
    console.log(data.value)
    users.value.unshift(user)
  }
</script>

<style scoped>
  h2 {
    font-size: var(--text-3xl);
    text-align: center;
    margin: 1rem;
  }
  section {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1rem;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 95%;
    max-width: var(--screen-sm);
    min-height: 200px;
    margin: var(--margin);
    padding: 1.5rem;
    border-radius: var(--rounded-lg);
    overflow-y: scroll;
    background: var(--element);
  }
</style>
