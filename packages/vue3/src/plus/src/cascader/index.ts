import { useField } from '@formily/vue'
import { ElCascader } from 'element-plus'
import { transformComponent } from '../__builtins__/shared'
import { defineComponent, h } from 'vue'
import { PreviewText } from '../preview-text'
import type { ElCascader as ElCascaderProps } from 'element-plus'
import { observer } from '@formily/reactive-vue'
import { isVoidField, Field } from '@formily/core'

export type CascaderProps = typeof ElCascaderProps

export const Cascader = observer(
  defineComponent({
    name: 'FCascader',
    props: ['onChange'],
    setup(props, { slots, attrs }) {
      const fieldRef = useField()

      return () => {
        const field = fieldRef.value as Field
        let com = field && !isVoidField(field) && field.pattern === 'readPretty'
          ? PreviewText.Cascader
          : ElCascader;
        return h(
          com,
          {
            ...attrs,
            modelValue: field?.value,
            options: field?.dataSource,
            onChange: (...args: any[]) => {
              setTimeout(() => {
                props.onChange(...args)
              }, 0)
            },
          }
          , slots
        )
      }
    }
  })
)

export default Cascader