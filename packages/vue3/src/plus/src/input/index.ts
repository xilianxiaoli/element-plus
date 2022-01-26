import { composeExport, transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { InputProps as ElInputProps } from 'element-plus'
import { ElInput } from 'element-plus'

export type InputProps = ElInputProps

const TransformElInput = transformComponent<InputProps>(ElInput, {
  change: 'update:modelValue',
})

const InnerInput = connect(
  TransformElInput,
  mapProps({ readOnly: 'readonly' }, { value: 'modelValue' }),
  mapReadPretty(PreviewText.Input)
)

const TextArea = connect(
  InnerInput,
  mapProps((props) => {
    return {
      ...props,
      type: 'textarea',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export const Input = composeExport(InnerInput, {
  TextArea,
})

export default Input
