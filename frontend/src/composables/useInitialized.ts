import { until } from '@vueuse/core'

interface Initializable {
  initialize?(): Promise<any>
  initialized: boolean
}

type InitializeOptions = {
  sync: boolean
}

export async function useInitialized(
  stores: Initializable[],
  options: InitializeOptions = { sync: true }
) {
  const init = async (store: Initializable) => {
    if (store.initialize) {
      store.initialize().catch(() => {
        // ok
        // todo: should be ok only if error is "already-initialized"
      })
    }
    await until(() => store.initialized).toBeTruthy()
  }
  if (options.sync) {
    for (const store in stores) {
      await init(stores[store])
    }
  } else {
    await Promise.all(stores.map(init))
  }
}
