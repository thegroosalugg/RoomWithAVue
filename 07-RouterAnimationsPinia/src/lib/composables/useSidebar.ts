import { inject, provide, ref } from 'vue'
import type { InjectionKey } from 'vue'

type Position = 'left' | 'right'

interface SidebarContext {
         isOpen: (position: Position) => boolean
    openSidebar: (position: Position) => void
   closeSidebar: () => void
}

// InjectionKey provides <type> safety; replaces string 'key' when using provide('key', value) | inject('key', defaultValue)
const sidebarKey: InjectionKey<SidebarContext> = Symbol()

// Provider composable
export function provideSidebar() {
  const activeSidebar = ref<Position | null>(null)

  function isOpen(position: Position) {
    return activeSidebar.value === position
  }

  function openSidebar(position: Position) {
    activeSidebar.value = position
  }

  function closeSidebar() {
    activeSidebar.value = null
  }

  const context: SidebarContext = { isOpen, openSidebar, closeSidebar }

  provide(sidebarKey, context)

  return context
}

// Consumer composable
export function useSidebar() {
  const context = inject(sidebarKey)

  if (!context) {
    throw new Error('useSidebar must be used within a component that calls provideSidebar')
  }

  return context
}
