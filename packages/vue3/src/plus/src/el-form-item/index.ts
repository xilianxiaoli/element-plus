import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/vue'

// import type { FormItem as _ElFormItemProps } from 'element-plus'
import { ElFormItem as ElFormItemComponent } from 'element-plus'
// TODO 删除 _ElFormProps
export type ElFormItemProps = { title: string }

export const ElFormItem = connect(
  ElFormItemComponent,
  mapProps({ title: 'label', required: true }, (props, field) => ({
    error: !isVoidField(field)
      ? field.errors.length
        ? field.errors.join('，')
        : undefined
      : undefined,
  }))
)

export default ElFormItem
