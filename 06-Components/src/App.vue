<template>
  <header class="box">
    <h1>Users</h1>
  </header>
  <UserList />
</template>

<script setup lang="ts">
  // local component scoping
  import UserList from './components/UserList.vue'
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
