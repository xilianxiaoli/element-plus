import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'

import type { ElInputNumber as _ElInputNumberProps } from 'element-plus'
import { ElInputNumber } from 'element-plus'
// import { PreviewText } from '../preview-text'

export type InputNumberProps = typeof _ElInputNumberProps

const TransformElInputNumber = transformComponent<InputNumberProps>(
  ElInputNumber,
  {
    change: 'update:modelValue',
  }
)

export const InputNumber = connect(
  TransformElInputNumber,
  mapProps({ readOnly: 'readonly' }, { value: 'modelValue' }, (props) => {
    let controlsPosition = 'right'
    if (props.controlsPosition) {
      controlsPosition = props.controlsPosition
    }
    return {
      controlsPosition,
    }
  }),
  // mapReadPretty(PreviewText.Input)
)

export default InputNumber
