import type { Component } from 'vue'
import {
  defineComponent,
  provide,
  inject,
  readonly,
  InjectionKey,
  ref,
  Ref,
  toRef,
  reactive
} from 'vue'

export type CreateContext<T> = {
  Provider: Component
  Consumer: Component
  injectKey: InjectionKey<Ref<T>>
}
// 生产和消费组件
export const createContext = <T>(defaultValue?: T): CreateContext<T> => {
  const injectKey: InjectionKey<Ref<T>> = Symbol()
  return {
    Provider: defineComponent({
      name: 'ContextProvider',
      props: {
        value: {
          type: null,
          default() {
            return defaultValue ?? null
          },
        },
      } as { value: {} }, // TODO 不得以加上 as 
      setup(props, { slots }) {
        const value = toRef(props, 'value')
        provide(injectKey, readonly(value))

        return () => slots?.default?.()
      },
    }) as any,

    Consumer: defineComponent({
      name: 'ContextConsumer',
      setup(_props, { slots }) {
        const value = inject(injectKey)

        return () => slots?.default?.(value)
      },
    }) as any,
    injectKey,
  }
}

export const useContext = <T>(context: CreateContext<T>) => {
  const key = context.injectKey

  return inject(key, ref(null))
}
