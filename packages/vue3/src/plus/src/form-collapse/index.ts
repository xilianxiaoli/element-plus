import { ElCollapse, ElCollapseItem, ElBadge } from 'element-plus'
import { model } from '@formily/reactive'
import type {
  ElCollapse as CollapseProps,
  ElCollapseItem as CollapseItemProps,
} from 'element-plus'
import {
  useField,
  useFieldSchema,
  RecursionField,
  h,
  Fragment,
} from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { Schema, SchemaKey } from '@formily/json-schema'
import { composeExport, stylePrefix } from '../__builtins__'
import { toArr } from '@formily/shared'
import { computed, defineComponent, PropType } from 'vue'
import { GeneralField } from '@formily/core'

type ActiveKeys = string | number | Array<string | number>

type ActiveKey = string | number

type Panels = { name: SchemaKey; props: any; schema: Schema }[]

export interface IFormCollapse {
  activeKeys: ActiveKeys
  hasActiveKey(key: ActiveKey): boolean
  setActiveKeys(key: ActiveKeys): void
  addActiveKey(key: ActiveKey): void
  removeActiveKey(key: ActiveKey): void
  toggleActiveKey(key: ActiveKey): void
}

export type IFormCollapseProps = {
  formCollapse?: IFormCollapse
  activeKey?: ActiveKey
} & typeof CollapseProps

const usePanels = (collapseField: GeneralField, schema: Schema) => {
  const panels: Panels = []
  schema.mapProperties((schema, name) => {
    const field = collapseField.query(collapseField.address.concat(name)).take()
    if (field?.display === 'none' || field?.display === 'hidden') return
    if (schema['x-component']?.indexOf('FormCollapse.Item') > -1) {
      panels.push({
        name,
        props: {
          ...schema?.['x-component-props'],
          key: schema?.['x-component-props']?.key || name,
        },
        schema,
      })
    }
  })
  return panels
}

const createFormCollapse = (defaultActiveKeys?: ActiveKeys) => {
  // TODO 领域模型？作用？
  const formCollapse = model({
    activeKeys: defaultActiveKeys,
    setActiveKeys(keys: ActiveKeys) {
      formCollapse.activeKeys = keys
    },
    hasActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        if (formCollapse.activeKeys.includes(key)) {
          return true
        }
      } else if (formCollapse.activeKeys == key) {
        return true
      }
      return false
    },
    addActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) return
      formCollapse.activeKeys = toArr(formCollapse.activeKeys).concat(key)
    },
    removeActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        formCollapse.activeKeys = formCollapse.activeKeys.filter(
          (item) => item != key
        )
      } else {
        formCollapse.activeKeys = ''
      }
    },
    toggleActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) {
        formCollapse.removeActiveKey(key)
      } else {
        formCollapse.addActiveKey(key)
      }
    },
  })
  return formCollapse
}

const FormCollapse = observer(
  defineComponent({
    inheritAttrs: false,
    props: {
      formCollapse: { type: Object as PropType<IFormCollapse> },
      activeKey: {
        type: [String, Number],
      },
    },
    setup(props, { attrs, emit }) {
      const field = useField()
      const schema = useFieldSchema()
      const prefixCls = `${stylePrefix}-form-collapse`
      const formCollapseRef = computed(
        // 不加上props类型，编译就会报错
        () => (props as IFormCollapseProps).formCollapse ?? createFormCollapse()
      )

      const takeActiveKeys = (panels: Panels) => {
        if (props.activeKey) return props.activeKey
        if (formCollapseRef.value?.activeKeys)
          return formCollapseRef.value?.activeKeys
        if (attrs.accordion) return panels[0]?.name
        return panels.map((item) => item.name)
      }

      const badgedHeader = (key: SchemaKey, props: any) => {
        const errors = field.value.form.queryFeedbacks({
          type: 'error',
          address: `${field.value.address.concat(key)}.*`,
        })
        if (errors.length) {
          return h(
            ElBadge,
            {
              class: [`${prefixCls}-errors-badge`],
              props: {
                value: errors.length,
              },
            },
            { default: () => props.title }
          )
        }
        return props.title
      }

      return () => {
        const panels = usePanels(field.value, schema.value)
        const activeKey = takeActiveKeys(panels)
        return h(
          ElCollapse,
          {
            class: prefixCls,
            modelValue: activeKey,
            on: {
              change: (key: string | string[]) => {
                emit('input', key)
                formCollapseRef.value.setActiveKeys(key)
              },
            },
          },
          {
            default: () => {
              return panels.map(({ props, schema, name }, index) => {
                return h(
                  ElCollapseItem,
                  {
                    key: index,
                    props: {
                      ...props,
                      name,
                    },
                  },
                  {
                    default: () => [
                      h(RecursionField, { props: { schema, name } }, {}),
                    ],
                    title: () =>
                      h(
                        'span',
                        {},
                        { default: () => badgedHeader(name, props) }
                      ),
                  }
                )
              })
            },
          }
        )
      }
    },
  })
)

// TODO 调试 使用 Fragment 会有 warn
const FragmentComponent = defineComponent({
  name: 'Fragment',
  render() {
    return this.$slots.default()
  },
})

export const FormCollapseItem = defineComponent({
  name: 'FFormCollapseItem',
  setup(_props, { attrs, slots }) {
    return () => h('span', {}, slots)
  },
})



const composeFormCollapse = composeExport(FormCollapse, {
  Item: FormCollapseItem,
  createFormCollapse,
})

export { composeFormCollapse as FormCollapse }
export default composeFormCollapse