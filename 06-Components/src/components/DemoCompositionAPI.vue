<template>
  <div class="box">
    <p>Reassigning in {{ count }}</p>
    <p>
      <span>{{ firstName }} {{ lastName }}</span>
      <span>{{ stack }}</span>
    </p>
    <button class="button" @click="reassign">Reassign</button>
  </div>
</template>

<script setup lang="ts">
  import { isReactive, isRef, reactive, ref, toRef, toRefs } from 'vue';

  const STACK = { frontEnd: ['vue', 'react'], backEnd: ['node'] }
  const  USER = { firstName: 'Jay', lastName: "Son", stack: STACK }

  const count = ref(4)
  const userRef = ref(USER) // provides reactive tracking to track any data type
  const userReactive = reactive(USER) // specifically for objects: unwraps them automatically so you do not need to acccess .value
  const firstNameRef = toRef(userReactive, 'firstName') // converts a regular object | nested ref prop to a ref
  const { firstName, lastName, stack } = toRefs(userRef.value) // converts multiple values to refs; allows destructuring

  setTimeout(() => {
    // all point to the same object in memory - changing any ref value changes the original object
    userRef.value.firstName = 'Chris' // refs are wrapped: nested props must access .value
    userReactive.lastName = 'Node' // reactive refs are automatically unwrapped: removes 1 level of nesting
    stack.value.frontEnd.push('angular')
    firstNameRef.value = firstName.value.toUpperCase()
  }, 4000)

  const interval = setInterval(() => {
    count.value -= 1
    if (count.value === 0) clearInterval(interval)
  }, 1000)

  console.log(
    '\nSTACK is ref?', isRef(STACK),
    '\nstackRef is ref?', isRef(stack),
    '\nfirstName is ref?', isRef(firstNameRef),
    '\nuserRef is ref?', isRef(userRef),
    '\nuserReactive is reactive?', isReactive(userReactive),
  )

  function reassign() {
    // reactive cannot be completely reassigned like refs: use Object.assign to set a new object value
    Object.assign(userReactive, { firstName: 'Dot', lastName: 'Env', stack: { frontEnd: [] } })
  }
</script>

<style scoped>
  .box {
    margin: var(--margin);
    width: 90%;
    max-width: var(--screen-sm);
  }
  .button {
    display: block;
    margin-left: auto;
  }
  p {
    margin: 0.5rem;
    color: var(--blue-500);
    &:nth-of-type(2) { color: var(--emerald-500); }
    &:nth-of-type(3) { color: var(--red-500);     }

    span { display: block; }
  }
</style>
