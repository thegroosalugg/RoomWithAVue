<template>
  <ul class="scroll-list" :style="{ maxHeight: getHeight }">
    <slot />
  </ul>
</template>

<!-- requires DOM tracker composable to calculate offsets -->
<script setup lang="ts">
  import { useDOMTracker } from '@/lib/composables/useDOMTracker'
  import { computed } from 'vue'

  interface Props {
    trackedElements: string[]
       localOffset?: number
            margin?: { v: number, u: 'em' | 'rem' | 'px' }
  }

  const props = withDefaults(defineProps<Props>(), {
    localOffset: 0,
         margin: () => ({ v: 2, u: 'rem' }),
  })

  const { getElement } = useDOMTracker()

  const getHeight = computed(() => {
    const trackedOffset = props.trackedElements.reduce((sum, key) => {
      return sum + getElement(key, 'Height')
    }, 0)

    const { localOffset, margin } = props
    return `calc(100dvh - ${trackedOffset}px - ${localOffset}px - ${margin.v}${margin.u})`
  })
</script>

<style scope>
  .scroll-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 95%;
    max-width: var(--screen-sm);
    margin: var(--margin);
    padding: 1rem;
    border-radius: var(--rounded-sm);
    overflow-y: scroll;
  }
</style>
