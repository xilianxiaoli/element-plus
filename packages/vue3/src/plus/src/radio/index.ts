import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { defineComponent, PropType, } from 'vue'
import {
  composeExport,
  transformComponent,
  resolveComponent,
  SlotTypes,
} from '../__builtins__/shared'
import { PreviewText } from '../preview-text'
import type {
  ElRadio as ElRadioProps,
  ElRadioGroup as ElRadioGroupProps,
} from 'element-plus'
import {
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
} from 'element-plus'

export type RadioGroupProps = typeof ElRadioGroupProps & {
  value: any
  options?: (
    | (Omit<typeof ElRadioProps, 'value'> & {
      value: typeof ElRadioProps['label']
      label: SlotTypes
    })
    | string
  )[]
  optionType: 'defalt' | 'button'
}

export type RadioProps = typeof ElRadioProps

const TransformElRadioGroup = transformComponent(ElRadioGroup, {
  change: 'update:modelValue',
})

// 删除 defineComponent 的泛型声明 RadioGroupProps
const RadioGroupOption = defineComponent({
  name: 'FRadioGroup',
  props: {
    options: {
      type: Array as PropType<RadioGroupProps['options']>,
      default: () => [],
    },
    optionType: {
      type: String as PropType<RadioGroupProps['optionType']>,
      default: 'default',
    },
  } as any, // TODO 泛型定义报错所以先用 any
  setup(customProps, { attrs, slots }) {
    return () => {
      const options = customProps.options || []
      const OptionType =
        customProps.optionType === 'button' ? ElRadioButton : ElRadio
      const children =
        options.length !== 0
          ? {
            default: () =>
              options.map((option) => {
                if (typeof option === 'string') {
                  return h(
                    OptionType,
                    { props: { label: option } },
                    {
                      default: () => [
                        resolveComponent(slots?.option ?? option, { option }),
                      ],
                    }
                  )
                } else {
                  return h(
                    OptionType,
                    {
                      props: {
                        ...option,
                        value: undefined, // TODO 是否换成 modelValue
                        label: option.value,
                      },
                    },
                    {
                      default: () => [
                        resolveComponent(slots?.option ?? option.label, {
                          option,
                        }),
                      ],
                    }
                  )
                }
              }),
          }
          : slots
      return h(
        TransformElRadioGroup,
        {
          ...attrs
        },
        children
      )
    }
  },
})

const RadioGroup = connect(
  RadioGroupOption,
  mapProps({ dataSource: 'options' }, { value: 'modelValue' }),
  mapReadPretty(PreviewText.Select)
)
export const Radio = composeExport(ElRadio, {
  Group: RadioGroup,
})

export default Radio
