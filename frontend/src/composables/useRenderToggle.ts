import type { Ref } from 'vue'
import { ref } from 'vue'

type RenderToggleOptions = {
  openDelay: number
  closeDelay: number
}

type ComponentType = 'modal' | 'sideOver'

/**
 * Toggle and render components with delay.
 * Useful when you need to combine v-if and some other prop which triggers animation (such as :show with modals)
 * */
export default function useRenderToggle(
  componentType: ComponentType = 'modal',
  options: Partial<RenderToggleOptions> = {}
) {
  const render = ref(false)
  const visible = ref(false)
  const defaultOptions: RenderToggleOptions = {
    openDelay: 50,
    closeDelay: componentType === 'modal' ? 150 : 500,
  }
  options = Object.assign({}, defaultOptions, options)

  function toggle(toVisible: boolean) {
    if (toVisible) {
      render.value = toVisible
    } else {
      visible.value = toVisible
    }

    setTimeout(
      () => {
        if (toVisible) {
          visible.value = toVisible
        } else {
          render.value = toVisible
        }
      },
      toVisible ? options.openDelay : options.closeDelay
    )
  }

  return { toggle, visible, render }
}

/**
 * Same as render toggle but returnes a tripe for easier custom naming.
 *
 * The triple has the structure (toggle, visible, render)
 *
 * @example
 * const [toggleSideover, sideoverVisible] = useRenderToggleBindings()
 */
export function useRenderToggleBindings(
  componentType: ComponentType = 'modal',
  options: Partial<RenderToggleOptions> = {}
): [(toVisible: boolean) => void, Ref<boolean>, Ref<boolean>] {
  const { toggle, visible, render } = useRenderToggle(componentType, options)
  return [toggle, visible, render]
}
