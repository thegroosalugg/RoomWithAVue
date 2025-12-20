<!-- <template>
  <ul>
    // kebab-case: supported by Vue components. Can also be used to access JS camelCase props
    // use prop="to define strings" || :prop="to bind {all} [other] data types"
    <user-item
      :user="{ id: '1', name: 'Snake', email: 'snake@email.com', phone: '140.00' }"
      case-check="kebab-case"
      @select="handleSelect"
    />
    // PascalCase: preferred by Vue components
    <UserItem
      :user="{ id: '2', name: 'Otacon', email: 'otacon@email.com', phone: '140.85' }"
      caseCheck="camelCase"
      @select="handleSelect"
    />
    <UserItem :user="{ id: '3', name: 'Campbell', email: 'campbell@email.com', phone: '140.85' }" />
  </ul>
</template> -->

<template>
  <ul>
    <!-- $emit payload data directly; @selected: emitted event from <UserItem> -->
    <UserItem
      v-for="user in users"
      :key="user.id"
      :user="user"
      @selected="$emit('delete', user.id)"
    />
  </ul>
</template>

<script setup lang="ts">
  import User from '@/models/User'
  import UserItem from './UserItem.vue'

  defineProps<{ users: User[] }>()
  // like (output) in Angular - emits data to parent component
  defineEmits<{ (e: 'delete', userId: string): void }>()
  // **example: when event needs greater logic, save emit as const, and call inside a function
  // const emit = defineEmits<{ (e: 'delete', userId: string): void }>()

  // function clickHandler(userId: string) {
  //   emit('delete', userId)
  // }
</script>
