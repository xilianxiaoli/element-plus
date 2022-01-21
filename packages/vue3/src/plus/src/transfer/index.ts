import { connect, mapProps } from '@formily/vue'

import type { ElTransfer as ElTransferProps } from 'element-plus'
import { ElTransfer } from 'element-plus'
import { transformComponent } from '../__builtins__'

export type TransferProps = typeof ElTransferProps

const TransElTransfer = transformComponent<TransferProps>(ElTransfer, {
    change: 'update:modelValue'
})

export const Transfer = connect(TransElTransfer, mapProps({ dataSource: 'data', value: 'modelValue' }))

export default Transfer
