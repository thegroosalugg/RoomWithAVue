import { ref, onUnmounted, provide, inject, type InjectionKey, type Ref } from 'vue'

type Dimension = 'Height' | 'Width'
interface DOMTracker {
    elements: Ref<Map<string, HTMLElement>>
    register: (key: string, element: HTMLElement) => void
  deregister: (key: string) => void
  // function type overload
  getElement: {
    (key: string): HTMLElement | undefined
    (key: string, dimension: Dimension): number
  }
}

const DOMTrackerKey: InjectionKey<DOMTracker> = Symbol('DOMTracker')

// Provider composable
export function provideDOMTracker() {
  const elements = ref(new Map<string, HTMLElement>())
  let observer: ResizeObserver | null = null

  // forces reactivity, as map() changes do not trigger it naturally
  function triggerUpdate() {
    elements.value = new Map(elements.value)
  }

  function register(key: string, element: HTMLElement) {
    elements.value.set(key, element)

    if (!observer) {
      observer = new ResizeObserver(() => {
        triggerUpdate()
      })
    }

    observer.observe(element)
    triggerUpdate()
  }

  function deregister(key: string) {
    const element = elements.value.get(key)
    if (element && observer) {
      observer.unobserve(element)
    }
    elements.value.delete(key)
    triggerUpdate()
  }

  // type overloads
  function getElement(key: string): HTMLElement | undefined
  function getElement(key: string, dimension:  Dimension): number
  function getElement(key: string, dimension?: Dimension) {
    const element = elements.value.get(key)
    if (!element) return undefined
    if (dimension) return element[`offset${dimension}`] ?? 0
    return element
  }

  onUnmounted(() => {
    observer?.disconnect()
  })

  const context: DOMTracker = {
    elements,
    register,
    deregister,
    getElement,
  }

  provide(DOMTrackerKey, context)

  return context
}

// Consumer composable
export function useDOMTracker() {
  const context = inject(DOMTrackerKey)

  if (!context) {
    throw new Error('useDOMTracker must be used within a component that calls provideDOMTracker')
  }

  return context
}
