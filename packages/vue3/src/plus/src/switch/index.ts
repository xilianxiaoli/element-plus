import { connect, mapProps } from '@formily/vue'

import type { ElSwitch as ElSwitchProps } from 'element-plus'
import { ElSwitch } from 'element-plus'

export type SwitchProps = typeof ElSwitchProps

export const Switch = connect(ElSwitch, mapProps({ readOnly: 'readonly' }))

export default Switch
