<!-- <Transition children require a single child. Component created to preserve <main> style inheritance -->
<template>
  <div id="page-wrapper">
    <slot />
  </div>
</template>

<style scoped>
  #page-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
