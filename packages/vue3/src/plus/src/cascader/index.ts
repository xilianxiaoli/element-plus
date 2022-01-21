import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElCascader } from 'element-plus'
import { transformComponent } from '../__builtins__/shared'

// import { PreviewText } from '../preview-text'
import type { ElCascader as ElCascaderProps } from 'element-plus'

export type CascaderProps = typeof ElCascaderProps

const TransformElCascader = transformComponent<CascaderProps>(ElCascader, {
  change: 'update:modelValue',
})

export const Cascader = connect(
  TransformElCascader,
  mapProps({ dataSource: 'options' }, { value: 'modelValue' }),

)

export default Cascader


// export const Cascader = observer(ElCascader)
// export const Cascader = (ElCascader)