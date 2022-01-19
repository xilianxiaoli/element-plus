import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElCascader } from 'element-plus'
import { transformComponent } from '../__builtins__/shared'

import {
  observer
} from '@formily/reactive-vue'

import type { ElCascader as ElCascaderProps } from 'element-plus'
// import { PreviewText } from '../preview-text'

export type CascaderProps = typeof ElCascaderProps

const TransformElCascader = transformComponent<CascaderProps>(ElCascader, {
  change: 'update:modelValue',
})

// export const Cascader = connect(
//   TransformElCascader,
//   mapProps({ dataSource: 'options' }, { value: 'modelValue' }),

//   // mapReadPretty(PreviewText.Cascader)
// )

// export default observer(Cascader)


// export const Cascader = observer(ElCascader)
export const Cascader = (ElCascader)







// export const Cascader = ElCascader

//{ value: 'modelValue' }
// const TransformElCascader = transformComponent<CascaderProps>(ElCascader, {
//   change: 'update:modelValue',
// })