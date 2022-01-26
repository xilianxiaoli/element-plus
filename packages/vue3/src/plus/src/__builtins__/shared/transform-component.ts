import type { Component } from 'vue'
import { h, defineComponent } from 'vue'
import { merge } from '@formily/shared'
// import { h } from '@formily/vue'

type ListenersTransformRules = Record<string, string>

// transformRules 用来修改事件名称，同时原先事件保留 {原有的事件触发名称:新定义的事件触发名称} eg:{A:B}，组件已纯在A事件，AB事件将响应同一个动作
export const transformComponent = <T extends Record<string, any>>(
  tag: any,
  transformRules?: ListenersTransformRules,
  defaultProps?: Partial<T>
): Component<T> | any => {
  return defineComponent({
    setup(props, { attrs, slots }) {
      return () => {
        let data = {
          ...attrs,
        }
        if (transformRules) {
          const listeners = transformRules
          Object.keys(listeners).forEach((extract) => {
            const event = listeners[extract]
            data[`on${event[0].toUpperCase()}${event.slice(1)}`] =
              attrs[`on${extract[0].toUpperCase()}${extract.slice(1)}`]
          })
        }
        if (defaultProps) {
          data = merge(defaultProps, data)
        }
        return h(tag, data, slots)
      }
    },
  })
}
