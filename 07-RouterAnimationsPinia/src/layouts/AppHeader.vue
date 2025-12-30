<template>
  <header ref="headerRef" :class="{ visible: isVisible }">
    <div class="content-left">
      <button aria-label="left-sidebar-mobile" @click="openSidebar('left')">☰</button>
    </div>
    <div class="nav-bar">
      <!-- Configure BrandLogo inline -->
      <BrandLogo responsive />
      <!-- Update Nav Links -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/router">Router</RouterLink>
        <RouterLink to="/animations">Animations</RouterLink>
        <RouterLink to="/pinia">Pinia</RouterLink>
      </nav>
    </div>
    <div class="content-center">
      <!-- Replace Dummy Search with real component -->
      <input type="search" placeholder="Search..." class="box" :style="{ width: '100%', padding: 'var(--padding-sm)' }">
    </div>
    <div class="content-right">
      <VClassToggleButton style="margin: 0 0.5rem" />
      <button aria-label="right-sidebar" @click="openSidebar('right')">☰</button>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { RouterLink } from 'vue-router';
  import BrandLogo from '@/components/brand/BrandLogo.vue';
  import VClassToggleButton from '@/components/test/VClassToggleButton.vue';
  import { useSidebar } from '@/lib/composables/useSidebar';

  // auto hide on scroll
  const emit = defineEmits<{(e: 'resize', height: number): void }>()

  const headerRef = ref<HTMLElement | null>(null)
  const isVisible = ref(true)

  let lastScroll = 0
  let observer: ResizeObserver | null = null

  function handleScroll() {
    const current = window.scrollY
    isVisible.value = current < lastScroll || current < 50
    lastScroll = current
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)

    const header = headerRef.value
    if (!header) return

    observer = new ResizeObserver(() => {
      emit('resize', header.offsetHeight)
    })

    observer.observe(header)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    observer?.disconnect()
  })

  // sidebar control
  const { openSidebar } = useSidebar()
</script>

<style scoped>
  header {
    flex-shrink: 0; /* when using height instead of min-height on top wrapper (body/#app) */
    position: fixed;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    overflow-x: auto;
    background-color: var(--page);
    box-shadow: var(--shadow-md);
    transition: transform 0.3s ease-in-out;
    transform: translateY(-100%);

    &.visible { transform: translateY(0); }

    @media (min-width: 1024px) { padding: 1.5rem; }
  }

  /* 3 elements visible at 1 time: nav-bar/center/right | left/navbar/right */
  .nav-bar, .content-left, .content-right, .content-center {
    flex-basis: 33.3333%;
  }

  /* center nav-bar: keep main wrapper here, outsource <nav> children as components if needed */
  .nav-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    :first-child { /* center brand logo when nav not visible */
      margin: 0 auto;

      @media (min-width: 768px) { margin: 0; }
    }

    nav {
      display: none;
      gap: 0.5rem;

      @media (min-width: 768px) { display: flex; }

      a {
        transition: var(--transition);

        &:hover { text-decoration-line: underline; }
      }
    }
  }

  .content-left {
    display: block;

    @media (min-width: 768px) { display: none; }
  }

  .content-center {
    display: none;

    @media (min-width: 768px) { display: flex; }
  }

  .content-right {
    display: flex;
    justify-content: flex-end;
  }

  button {
    width: 30px;
    aspect-ratio: 1;
    padding: 0.25rem;
    border: var(--border);
    border-radius: var(--rounded-sm);
    color: var(--accent);
    background-color: var(--box);
  }
</style>
