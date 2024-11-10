import {
  createFetch,
  MaybeRef,
  UseFetchReturn,
  UseFetchOptions
} from '@vueuse/core'

async function addAuthorizationHeader({ options }: { options: any }) {
  if (!('headers' in options)) {
    options.headers = {}
  }

  options.headers['Authorization'] = `Bearer ${window.localStorage.getItem('accessToken')}`
}

export const customFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_HOST,
  options: {
    async beforeFetch({ options }) {
      await addAuthorizationHeader({ options })
      return { options }
    },
    async afterFetch({ response, data }) {
      if ('success' in data && data.success !== true) {
        throw new Error('api failed')
      }
      if (response.status > 400) {
        throw new Error('API call failed')
      }
      return { response, data }
    }
  }
})

export function useApiFetch<T>(
  url: MaybeRef<string>
): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
export function useApiFetch<T>(
  url: MaybeRef<string>,
  useFetchOptions: UseFetchOptions
): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
export function useApiFetch<T>(
  url: MaybeRef<string>,
  options: RequestInit,
  useFetchOptions?: UseFetchOptions
): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>
export function useApiFetch<T>(
  url: MaybeRef<string>,
  ...args: any[]
): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
  // @ts-ignore: spread operator
  return customFetch(url, ...args)
}
