<template>
  <!-- preventDefault -->
  <form v-on:submit.prevent="submitForm">
    <input class="box" v-model="form.name"  placeholder="name" />
    <input class="box" v-model="form.email" placeholder="email" />
    <input class="box" v-model="form.phone" placeholder="phone" />
    <button class="button">Submit</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import User from '@/models/User';

  const formGroup = { name: '', email: '', phone: '' }
  const form = ref({ ...formGroup }) // v-model <input> values

  const emit = defineEmits<{ (e: 'submit', user: User): void }>() // output data to <parent>

  // emit event
  function submitForm() {
    const user = User.create(form.value)
    emit('submit', user)
    form.value = { ...formGroup }
  }
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: var(--margin);
    max-width: 300px;
  }
  button { align-self: flex-end; }
</style>
