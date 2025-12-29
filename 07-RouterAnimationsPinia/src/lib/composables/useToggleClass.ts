import { ref } from 'vue'

export function useToggleClass() {
  const hasClassList = ref(false)

  function toggleClass(className: string) {
    document.body.classList.toggle(className)
    hasClassList.value = document.body.classList.contains(className)
  }

  return { hasClassList, toggleClass }
}
