<template>
  <header ref="headerRef">
    <h2>HTTP Demo</h2>
    <section>
      <button class="button" @click="reqAll({ url: 'all' })">Fetch Array</button>
      <button class="button" @click="reqOne({ url: 'one', onSuccess })">Fetch Object</button>
    </section>
  </header>
  <VLoader v-if="loadingAll" />
  <VScrollList v-else-if="users.length" :trackedElements="['nav-header']" :localOffset="getHeight">
    <li v-if="loadingOne">
      <VLoader size="sm" color="white" />
    </li>
    <li v-for="{ id, name, email, phone } in users" :key="id" class="box">
      <h3>{{ name }}</h3>
      <p>{{ email }}</p>
      <p>{{ phone }}</p>
    </li>
  </VScrollList>
</template>

<script setup lang="ts">
  import type User from '@/models/User'
  import { computed, ref } from 'vue';
  import { useFetch } from './useFetch'
  import VLoader from './VLoader.vue'
  import VScrollList from '../slots/VScrollList.vue';

  // local <header> offset for <VScrollList>
  const headerRef = ref<HTMLElement | null>(null)
  const getHeight = computed(() => {
    return headerRef.value?.offsetHeight || 0
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
  .scroll-list {
    background: var(--element);
    min-height: 180px;
  }
</style>
