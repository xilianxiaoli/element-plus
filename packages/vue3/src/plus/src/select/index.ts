import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from 'vue'
// import { PreviewText } from '../preview-text'

import type {
  ElSelect as ElSelectProps,
  ElOption as ElOptionProps,
} from 'element-plus'
import { ElSelect, ElOption } from 'element-plus'
import { resolveComponent } from '../__builtins__'

export type SelectProps = (typeof ElSelectProps) & {
  options?: Array<typeof ElOptionProps>,
} & {name:string}

// 删除了 defineComponent 的泛型声明
const SelectOption = defineComponent({
  name: 'FSelect',
  props: ['options'],
  setup(customProps, { attrs, slots }) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      ElOption,
                      { props: { value: option, label: option } }, // TODO props
                      {
                        default: () => [
                          resolveComponent(slots?.option, { option }),
                        ],
                      }
                    )
                  } else {
                    return h(
                      ElOption,
                      {
                        props: {
                          ...option,
                        },
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option, {
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
        ElSelect,
        {
          ...attrs,
        },
        children
      )
    }
  },
})

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true },{value:'modelValue'}),
  // mapReadPretty(PreviewText.Select)
)

export default Select
