<template>
  <header class="box">
    <h1>Users</h1>
  </header>
  <AddUser @submit="onSubmit" />
  <UserList :users="users" @delete="deleteUser" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { USERS } from '@/api/users'
  import User from '@/models/User'
  // local component scoping
  import AddUser from './components/AddUser.vue'
  import UserList from './components/UserList.vue'

  const users = ref<User[]>(USERS)

  function onSubmit(user: User) {
    users.value.unshift(user)
  }

  function deleteUser(userId: string) {
    users.value = users.value.filter(({ id }) => id !== userId)
  }
</script>

<style scoped>
  header {
    width: 90%;
    max-width: 40rem;
    margin: 3rem auto;
    border-color: var(--accent);
    background-color: var(--accent);
    color: var(--page);
    text-align: center;
    font-size: var(--text-3xl);
  }
</style>
