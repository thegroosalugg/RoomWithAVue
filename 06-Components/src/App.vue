<template>
  <NavBar :activeTab="activeTab" @selected="setActiveTab" />
  <!-- KeepAlive: preserves component statel; can only accept one child; cannot have a comment in its bounds -->
  <!-- <component :is="allows you to dynamically inject a component from the <script>" /> -->
  <KeepAlive>
    <component :is="views[activeTab]" />
  </KeepAlive>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  // local component scoping
  import NavBar from './components/NavBar.vue'
  import PropsEmitsDemo from './components/props-emits/PropsEmitsDemo.vue'
  import ProvideInjectDemo from './components/provide-inject/ProvideInjectDemo.vue'
  import SlotsDemo from './components/slots/SlotsDemo.vue'

  const views = [
    PropsEmitsDemo,
    ProvideInjectDemo,
    SlotsDemo,
  ]

  const STORAGE_KEY = 'activeTab'

  const activeTab = ref(
    Number(localStorage.getItem(STORAGE_KEY)) || 0,
  )

  function setActiveTab(index: number) {
    activeTab.value = index
  }

  watch(activeTab, (value) => {
    localStorage.setItem(STORAGE_KEY, String(value))
  })
</script>
