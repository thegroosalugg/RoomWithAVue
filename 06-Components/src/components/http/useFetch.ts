import { ref, type Ref } from 'vue'
import fetchData from './fetchData'
import type { ApiError, Fetch } from './fetchData'

interface ReqHandler<T> extends Fetch {
  onSuccess?: (res: T) => void
    onError?: (err: ApiError) => void
}

interface UseFetch<T> {
   isLoading: Ref<boolean>
       error: Ref<ApiError | null>
  reqHandler: (config: ReqHandler<T>) => Promise<T | void>
}

// Overload 1: initData provided → data is Ref<T>
export function useFetch<T>(initData: T): UseFetch<T> & { data: Ref<T> }

// Overload 2: initData omitted → data is Ref<T | null>
export function useFetch<T>(): UseFetch<T> & { data: Ref<T | null> }

// Implementation
export function useFetch<T>(initData?: T) {
  const data = ref<T | null>(initData ?? null)
  const isLoading = ref(false)
  const error = ref<ApiError | null>(null)

  async function reqHandler(config: ReqHandler<T>) {
    const { onSuccess, onError, ...fetchConfig } = config
    isLoading.value = true

    try {
      const res = await fetchData(fetchConfig)
      data.value = res
      onSuccess?.(res)
      return res
    } catch (err) {
      const apiErr = err as ApiError
      error.value = apiErr
      onError?.(apiErr)
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, reqHandler }
}
