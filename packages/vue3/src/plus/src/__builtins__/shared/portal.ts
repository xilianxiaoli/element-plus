import { defineComponent, onBeforeUnmount, h } from 'vue'
import { Fragment } from '@formily/vue'
export interface IPortalProps {
  id?: string | symbol
}

const PortalMap = new Map<string | symbol, any>()

export const createPortalProvider = (id: string | symbol) => {
  const Portal = defineComponent({
    name: 'ProtalProvider',
    props: {
      id: {
        type: [String, Symbol],
        default: id,
      },
    },

    setup(props) {
      onBeforeUnmount(() => {
        const { id } = props
        if (id && PortalMap.has(id as string)) {
          PortalMap.delete(id as string)
        }
      })
    },

    render() {
      const { id } = this
      if (id && !PortalMap.has(id)) {
        PortalMap.set(id, this)
      }

      return h(Fragment, {}, this.$scopedSlots)
    },
  })

  return Portal
}
export function getPortalContext(id: string | symbol) {
  return PortalMap.get(id)
}
