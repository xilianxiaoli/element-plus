import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '../preview-text'
import type { ElTimePicker as ElTimePickerProps } from 'element-plus'
import { ElTimePicker } from 'element-plus'

export type TimePickerProps = typeof ElTimePickerProps

const TransformElTimePicker = transformComponent<TimePickerProps>(
  ElTimePicker,
  {
    change: 'update:modelValue',
  }
)

export const TimePicker = connect(
  TransformElTimePicker,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(PreviewText.TimePicker)
)

export default TimePicker
