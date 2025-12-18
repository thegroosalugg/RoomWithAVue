<template>
  <section>
    <header>
      <h1>Users</h1>
    </header>
    <ul>
      <!-- kebab-case: supported by Vue components. Can also be used to access JS camelCase props -->
      <!-- use prop="to define strings" || :prop="to bind {all} [other] data types" -->
      <user-details
        :user="{ id: '1', name: 'Snake', email: 'snake@email.com', phone: '140.00' }"
        case-check="kebab-case"
      />
      <!-- PascalCase: preferred by Vue components -->
      <UserDetails
        :user="{ id: '2', name: 'Otacon', email: 'otacon@email.com', phone: '140.85' }"
        caseCheck="camelCase"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
  // local component scoping
  import UserDetails from './components/UserDetails.vue'
</script>

<style scoped>
  header {
    width: 90%;
    max-width: 40rem;
    margin: 3rem auto;
    padding: 1rem;
    border-radius: var(--rounded-lg);
    background-color: var(--accent);
    color: var(--page);
    box-shadow: var(--shadow-lg);
    text-align: center;
    font-size: var(--text-3xl);
  }
</style>
