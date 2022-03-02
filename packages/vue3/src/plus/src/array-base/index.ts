import {
  defineComponent,
  provide,
  InjectionKey,
  Ref,
  inject,
  toRefs,
  ref,
  onBeforeUnmount,
  PropType,
} from 'vue'
import { Fragment, useField, useFieldSchema, h } from '@formily/vue'
import { isValid, uid, clone } from '@formily/shared'
import { ArrayField } from '@formily/core'
import { stylePrefix } from '../__builtins__/configs'

import type { ElButton as ButtonProps } from 'element-plus'
import { ElButton } from 'element-plus'
import type { Schema } from '@formily/json-schema'
// TODO 
import { HandleDirective } from 'vue-slicksort'
import { composeExport } from '../__builtins__/shared'

export type IArrayBaseAdditionProps = {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
} & typeof ButtonProps

export type ArrayBaseMixins = {
  Addition?: typeof ArrayBaseAddition
  Remove?: typeof ArrayBaseRemove
  MoveUp?: typeof ArrayBaseMoveUp
  MoveDown?: typeof ArrayBaseMoveDown
  SortHandle?: typeof ArrayBaseSortHandle
  Index?: typeof ArrayBaseIndex
  useArray?: typeof useArray
  useIndex?: typeof useIndex
  useRecord?: typeof useRecord
}

export interface IArrayBaseProps {
  disabled?: boolean
  keyMap?: WeakMap<Object, String> | String[] | null
}

export interface IArrayBaseItemProps {
  index: number
  record: any
}

export interface IArrayBaseContext {
  field: Ref<ArrayField>
  schema: Ref<Schema>
  props: IArrayBaseProps
  attrs: {
    [key in string]?: any
  }
  keyMap?: WeakMap<Object, String> | String[] | null
}

const ArrayBaseSymbol: InjectionKey<IArrayBaseContext> =
  Symbol('ArrayBaseContext')
const ItemSymbol: InjectionKey<IArrayBaseItemProps> = Symbol('ItemContext')

const useArray = () => {
  return inject(ArrayBaseSymbol, null)
}

const useIndex = (index?: number) => {
  const { index: indexRef } = toRefs(inject(ItemSymbol))
  return indexRef ?? ref(index)
}

const useRecord = (record?: number) => {
  const { record: recordRef } = toRefs(inject(ItemSymbol))
  return recordRef ?? ref(record)
}

const isObjectValue = (schema: Schema) => {
  if (Array.isArray(schema?.items)) return isObjectValue(schema.items[0])

  if (schema?.items?.type === 'array' || schema?.items?.type === 'object') {
    return true
  }
  return false
}

const useKey = (schema: Schema) => {
  const isObject = isObjectValue(schema)
  let keyMap: WeakMap<Object, String> | String[] | null = null

  if (isObject) {
    keyMap = new WeakMap()
  } else {
    keyMap = []
  }

  onBeforeUnmount(() => {
    keyMap = null
  })

  return {
    keyMap,
    getKey: (record: any, index?: number) => {
      if (keyMap instanceof WeakMap) {
        if (!keyMap.has(record)) {
          keyMap.set(record, uid())
        }
        return `${keyMap.get(record)}-${index}`
      }

      if (!keyMap[index]) {
        keyMap[index] = uid()
      }

      return `${keyMap[index]}-${index}`
    },
  }
}

const getDefaultValue = (defaultValue: any, schema: Schema): any => {
  if (isValid(defaultValue)) return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getDefaultValue(defaultValue, schema.items[0])
  if (schema?.items?.type === 'array') return []
  if (schema?.items?.type === 'boolean') return true
  if (schema?.items?.type === 'date') return ''
  if (schema?.items?.type === 'datetime') return ''
  if (schema?.items?.type === 'number') return 0
  if (schema?.items?.type === 'object') return {}
  if (schema?.items?.type === 'string') return ''
  return null
}

const ArrayBaseInner = defineComponent({
  name: 'ArrayBase',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    keyMap: {
      type: [WeakMap, Array] as PropType<WeakMap<Object, String> | String[]>,
    },
  },
  setup(props, { slots, attrs }) {
    const field = useField<ArrayField>()
    const schema = useFieldSchema()

    provide(ArrayBaseSymbol, {
      field,
      schema,
      props: props as IArrayBaseProps,
      attrs,
      keyMap: (props as IArrayBaseProps).keyMap,
    })
    return () => {
      return h(Fragment, {}, slots)
    }
  },
})

const ArrayBaseItem = defineComponent({
  name: 'ArrayBaseItem',
  props: ['index', 'record'],
  setup(props: IArrayBaseItemProps, { slots }) {
    provide(ItemSymbol, props)
    return () => {
      return h(Fragment, {}, slots)
    }
  },
})

const ArrayBaseSortHandle = defineComponent({
  name: 'ArrayBaseSortHandle',
  props: ['index'],
  directives: {
    handle: HandleDirective,
  },
  setup(props, { attrs }) {
    const array = useArray()
    const prefixCls = `${stylePrefix}-array-base`

    return () => {
      if (!array) return null
      if (array.field.value?.pattern !== 'editable') return null

      return h(
        ElButton,
        {
          directives: [{ name: 'handle' }],
          class: [`${prefixCls}-sort-handle`],
          attrs: {
            size: 'small',
            type: 'text',
            icon: 'el-icon-rank',
            ...attrs,
          },
        },
        {}
      )
    }
  },
})

const ArrayBaseIndex = defineComponent({
  name: 'ArrayBaseIndex',
  setup(props, { attrs }) {
    const index = useIndex()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      return h(
        'span',
        {
          class: `${prefixCls}-index`,
          attrs,
        },
        {
          default: () => [`#${index.value + 1}.`],
        }
      )
    }
  },
})

const ArrayBaseAddition = defineComponent({
  name: 'ArrayBaseAddition',
  props: ['title', 'method', 'defaultValue'],
  setup(props, { attrs }) {
    const self = useField()
    const array = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (!array) return null
      if (array?.field.value.pattern !== 'editable') return null
      return h(
        ElButton,
        {
          class: `${prefixCls}-addition`,
          attrs: {
            icon: 'qax-icon-Alone-Plus',
            ...props,
          },
          on: {
            ...attrs,
            click: (e) => {
              if (array.props?.disabled) return
              const defaultValue = getDefaultValue(
                props.defaultValue,
                array?.schema.value
              )
              if (props.method === 'unshift') {
                array?.field?.value.unshift(defaultValue)
                array.attrs?.add?.(0)
              } else {
                array?.field?.value.push(defaultValue)
                array.attrs?.add?.(array?.field?.value?.value?.length - 1)
              }
              if (attrs.click && typeof attrs.click === 'function') {
                attrs.click(e)
              }
            },
          },
        },
        {
          default: () => [self.value.title || props.title],
        }
      )
    }
  },
})

const ArrayBaseRemove = defineComponent({
  name: 'ArrayBaseRemove',
  props: ['title', 'index'],
  setup(props, { attrs }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        ElButton,
        {
          ...attrs,
          class: `${prefixCls}-remove`,
          attrs: {
            type: 'text',
            size: 'small',
            icon: 'el-icon-delete',
          },
          on: {
            click: (e: MouseEvent) => {
              e.stopPropagation()
              if (Array.isArray(base?.keyMap)) {
                base?.keyMap?.splice(indexRef.value, 1)
              }

              base?.field.value.remove(indexRef.value as number)
              base?.attrs?.remove?.(indexRef.value as number)

              if (attrs.click && typeof attrs.click === 'function') {
                attrs.click(e)
              }
            },
          },
        },
        {
          default: () => [props.title],
        }
      )
    }
  },
})

const ArrayBaseMoveDown = defineComponent({
  name: 'ArrayBaseMoveDown',
  props: ['title', 'index'],
  setup(props, { attrs }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        ElButton,
        {
          ...attrs,
          class: `${prefixCls}-move-down`,
          attrs: {
            size: 'small',
            type: 'text',
            icon: 'el-icon-arrow-down',
          },
          on: {
            // ...listeners,
            click: (e: MouseEvent) => {
              e.stopPropagation()
              if (Array.isArray(base?.keyMap)) {
                base.keyMap.splice(
                  indexRef.value + 1,
                  0,
                  base.keyMap.splice(indexRef.value, 1)[0]
                )
              }

              base?.field.value.moveDown(indexRef.value as number)
              base?.attrs?.moveDown?.(indexRef.value as number)

              if (attrs.click && typeof attrs.click === 'function') {
                attrs.click(e)
              }
            },
          },
        },
        {
          default: () => [props.title],
        }
      )
    }
  },
})

const ArrayBaseMoveUp = defineComponent({
  name: 'ArrayBaseMoveUp',
  props: ['title', 'index'],
  setup(props, { attrs }) {
    const indexRef = useIndex(props.index)
    const base = useArray()
    const prefixCls = `${stylePrefix}-array-base`
    return () => {
      if (base?.field.value.pattern !== 'editable') return null
      return h(
        ElButton,
        {
          ...attrs,
          class: `${prefixCls}-move-up`,
          attrs: {
            size: 'small',
            type: 'text',
            icon: 'el-icon-arrow-up',

          },
          on: {
            // ...listeners,
            click: (e: MouseEvent) => {
              e.stopPropagation()
              if (Array.isArray(base?.keyMap)) {
                base.keyMap.splice(
                  indexRef.value - 1,
                  0,
                  base.keyMap.splice(indexRef.value, 1)[0]
                )
              }

              base?.field.value.moveUp(indexRef.value as number)
              base?.attrs?.moveUp?.(indexRef.value as number)

              if (attrs.click && typeof attrs.click === 'function') {
                attrs.click(e)
              }
            },
          },
        },
        {
          default: () => [props.title],
        }
      )
    }
  },
})

export const ArrayBase = composeExport(ArrayBaseInner, {
  Index: ArrayBaseIndex,
  Item: ArrayBaseItem,
  SortHandle: ArrayBaseSortHandle,
  Addition: ArrayBaseAddition,
  Remove: ArrayBaseRemove,
  MoveDown: ArrayBaseMoveDown,
  MoveUp: ArrayBaseMoveUp,
  useArray: useArray,
  useIndex: useIndex,
  useKey: useKey,
  useRecord: useRecord,
})
