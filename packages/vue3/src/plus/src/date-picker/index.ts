import { transformComponent } from '../__builtins__/shared'
import { connect, mapProps, mapReadPretty } from '@formily/vue'

import type { ElDatePicker as ElDatePickerProps } from 'element-plus'
import { ElDatePicker } from 'element-plus'
// import { PreviewText } from '../preview-text'

export type DatePickerProps = typeof ElDatePickerProps

const TransformElDatePicker = transformComponent<DatePickerProps>(
  ElDatePicker,
  {
    change: 'update:modelValue',
  }
)

const getDefaultFormat = (props, formatType = 'format') => {
  const type = props.type

  if (type === 'week' && formatType === 'format') {
    return 'YYYY-WW'
  } else if (type === 'month') {
    return 'YYYY-MM'
  } else if (type === 'year') {
    return 'YYYY'
  } else if (type === 'datetime' || type === 'datetimerange') {
    return 'YYYY-MM-DD HH:mm:ss'
  }

  return 'YYYY-MM-DD'
}

export const DatePicker = connect(
  TransformElDatePicker,
  mapProps({ readOnly: 'readonly' },{value:'modelValue'}, (props) => {
    return {
      ...props,
      format: props.format || getDefaultFormat(props),
      valueFormat: props.valueFormat || getDefaultFormat(props, 'valueFormat'),
    }
  }),
  // mapReadPretty(PreviewText.DatePicker)
)

export default DatePicker
