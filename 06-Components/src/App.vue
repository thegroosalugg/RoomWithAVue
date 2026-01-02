<template>
  <AppHeader :activeTab="activeTab" @selected="setActiveTab" />
  <!-- <component :is="allows you to dynamically inject a component from the <script>" /> -->
  <!-- KeepAlive: preserves component statel; can only accept one child; cannot have a comment in its bounds -->
  <main>
    <KeepAlive>
      <component :is="views[activeTab]" />
    </KeepAlive>
  </main>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  // local component scoping
  import AppHeader from './components/AppHeader.vue'
  import DemoPropsEmits from './components/props-emits/DemoPropsEmits.vue'
  import DemoProvideInject from './components/provide-inject/DemoProvideInject.vue'
  import DemoSlots from './components/slots/DemoSlots.vue'
  import DemoForm from './components/forms/DemoForm.vue'
  import DemoHTTP from './components/http/DemoHTTP.vue'
  import { provideDOMTracker } from './lib/composables/useDOMTracker';

  provideDOMTracker() // register and observe any DOM element

  const views = [DemoPropsEmits, DemoProvideInject, DemoSlots, DemoForm, DemoHTTP]

  const STORAGE_KEY = 'activeTab'

  const activeTab = ref(Number(localStorage.getItem(STORAGE_KEY)) || 0)

  function setActiveTab(index: number) {
    activeTab.value = index
  }

  watch(activeTab, (value) => {
    localStorage.setItem(STORAGE_KEY, String(value))
  })
</script>

<style scoped>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--inner);
  }
</style>
