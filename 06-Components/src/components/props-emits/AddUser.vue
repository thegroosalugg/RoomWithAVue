<template>
  <!-- preventDefault; attach form element ref -->
  <form v-on:submit.prevent="onSubmit" ref="formEl">
    <input class="box" v-model="form.name"  placeholder="name" />
    <input class="box" v-model="form.email" placeholder="email" />
    <input class="box" v-model="form.phone" placeholder="phone" />
    <button class="button">Submit</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import User from '@/models/User';

  const form = ref({ name: '', email: '', phone: '' }) // v-model <input> values
  const formEl = ref<HTMLFormElement | null>(null) // attach to <form> for reset()

  const emit = defineEmits<{ (e: 'submit', user: User): void }>() // output data to <parent>

  // emit event
  function onSubmit() {
    const user = User.create(form.value)
    emit('submit', user)
    formEl.value?.reset() // reset form
  }
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: var(--margin);
  }
  button {
    align-self: flex-end;
  }
</style>
