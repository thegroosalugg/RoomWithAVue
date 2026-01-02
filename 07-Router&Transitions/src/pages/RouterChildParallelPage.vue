<template>
  <VHeading title="[Parallel] <RouterView/>" class="box" />
  <VScrollDummy color="teal-500" :elements="8" />
</template>

<script setup lang="ts">
  import VScrollDummy from '@/components/test/VScrollDummy.vue'
  import VHeading from '@/components/ui/VHeading.vue'
</script>
