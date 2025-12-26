<template>
  <UserFormCreate @submit="onSubmit" />
  <UserList :users="users" @delete="deleteUser" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { USERS } from '@/data/users'
  // local component scoping
  import UserFormCreate from './UserFormCreate.vue'
  import UserList from './UserList.vue'
  import type User from '@/models/User'

  const users = ref<User[]>(USERS)

  function onSubmit(user: User) {
    users.value.unshift(user)
  }

  function deleteUser(userId: string) {
    users.value = users.value.filter(({ id }) => id !== userId)
  }
</script>
