import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent, PropType } from 'vue'
import {
  composeExport,
  transformComponent,
  resolveComponent,
  SlotTypes,
} from '../__builtins__/shared'
import type {
  ElCheckbox as _ElCheckboxProps,
  ElCheckboxGroup as ElCheckboxGroupProps,
} from 'element-plus'
import {
  ElCheckbox,
  ElCheckboxGroup,
  ElCheckboxButton,
} from 'element-plus'
// import { PreviewText } from '../preview-text'

type ElCheckboxProps = Omit<typeof _ElCheckboxProps, 'value'> & {
  value: ElCheckboxProps['label']
}

export interface CheckboxProps extends ElCheckboxProps {
  option: Omit<typeof _ElCheckboxProps, 'value'> & {
    value: ElCheckboxProps['label']
    label: SlotTypes
  }
}

const CheckboxOption = defineComponent({
  name: 'Checkbox',
  inheritAttrs: false,
  props: {
    option: {
      type: Object,
      default: null,
    },
  },
  setup(curtomProps, { attrs, slots }) {
    return () => {
      const props = attrs as unknown as CheckboxProps
      const option = curtomProps?.option
      if (option) {
        const children = {
          default: () => [
            resolveComponent(slots.default ?? option.label, { option }),
          ],
        }
        const newProps = {} as Partial<ElCheckboxProps>
        Object.assign(newProps, option)
        newProps.label = option.value
        delete newProps.value

        return h(
          attrs.optionType === 'button' ? ElCheckboxButton : ElCheckbox,
          {
            attrs: {
              ...newProps,
            },
          },
          children
        )
      }

      return h(
        ElCheckbox,
        {
          attrs: {
            ...props,
          }
        },
        slots
      )
    }
  },
})

export type CheckboxGroupProps = typeof ElCheckboxGroupProps & {
  value: any[]
  options?: Array<CheckboxProps | string>
  optionType: 'default' | 'button'
}

const TransformElCheckboxGroup = transformComponent(ElCheckboxGroup, {
  change: 'update:modelValue',
})

interface Icc {
  options: Array<any>,
  optionType: String
}

// <CheckboxGroupProps>
const CheckboxGroupOption = defineComponent({
  name: 'CheckboxGroup',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    optionType: {
      type: String as PropType<CheckboxGroupProps['optionType']>,
      default: 'default',
    },
  },
  // TODO 为了解决 ts 编译报错，临时方法 : Icc
  setup(customProps: Icc, { attrs, slots }) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
            default: () =>
              options.map((option) => {
                if (typeof option === 'string') {
                  return h(
                    Checkbox,
                    {
                      props: {
                        option: {
                          label: option,
                          value: option,
                        },
                      },
                      attrs: {
                        optionType: customProps.optionType,
                      },
                    },
                    slots?.option
                      ? { default: () => slots.option({ option }) }
                      : {}
                  )
                } else {
                  return h(
                    Checkbox,
                    {
                      props: {
                        option,
                      },
                      attrs: {
                        optionType: customProps.optionType,
                      },
                    },
                    slots?.option
                      ? { default: () => slots.option({ option }) }
                      : {}
                  )
                }
              }),
          }
          : slots
      return h(
        TransformElCheckboxGroup,
        {
          attrs: {
            ...attrs,
          },
        },
        children
      )
    }
  },
})

const CheckboxGroup = connect(
  CheckboxGroupOption,
  mapProps({ dataSource: 'options', value: 'modelValue' }),
  // mapReadPretty(PreviewText.Select, {
  //   multiple: true,
  // })
)

export const Checkbox = composeExport(connect(CheckboxOption), {
  Group: CheckboxGroup,
})
