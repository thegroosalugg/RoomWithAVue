<template>
  <div>
    <h2>HTTP Demo</h2>
    <section>
      <button class="button" @click="reqAll({ url: 'all' })">Fetch Array</button>
      <button class="button" @click="reqOne({ url: 'one', onSuccess })">Fetch Object</button>
    </section>
    <VLoader v-if="loadingAll" />
    <ul v-else>
      <li v-if="loadingOne">
        <VLoader size="sm" color="white" />
      </li>
      <li v-for="({ id, name, email, phone }) in users" :key="id" class="box">
        <h3>{{ name }}</h3>
        <p>{{ email }}</p>
        <p>{{ phone }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import type User from '@/models/User'
  import { useFetch } from './useFetch'
  import VLoader from './VLoader.vue'

  const { data: users, isLoading: loadingAll, reqHandler: reqAll } = useFetch<User[]>([])
  const { data, isLoading: loadingOne, reqHandler: reqOne } = useFetch<User>()

  function onSuccess(user: User) {
    console.log(data.value)
    users.value.unshift(user)
  }
</script>

<style lang="css" scoped>
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
    max-width: var(--screen-sm);
    margin: var(--margin);
    padding: 1rem;
  }
</style>
