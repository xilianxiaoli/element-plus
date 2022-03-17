import { Field } from '@formily/core'
import { defineComponent, PropType } from 'vue'
import { connect, mapProps, useField, Fragment, h } from '@formily/vue'

import type {
  ElUpload as ElUploadProps,
  UploadFile,
} from 'element-plus'

import { ElUpload, ElButton, ElIcon } from 'element-plus'

import {
  UploadFilled,
  Upload as UploadIcon,
  Plus,
} from '@element-plus/icons-vue'


export interface IUploadProps {
  errorAdaptor?: (error?: ErrorEvent) => String
  textContent?: String,
  onChange?: (file: UploadFile, fileList: UploadFile[]) => void,
}
// <UploadProps>
const UploadWrapper = defineComponent<IUploadProps>({
  name: 'FUpload',
  props: {
    textContent: {
      type: String,
      default: '',
    },
    errorAdaptor: {
      type: Function as PropType<(error?: ErrorEvent) => String>,
      default: (error?: ErrorEvent) => {
        return error?.message || ''
      },
    },
    onChange: {
      type: Function,
      default: () => { }
    }
  } as any,
  // ts类型校验报错，临时使用 any 
  setup(curProps, { slots, attrs, emit }) {
    return () => {
      const fieldRef = useField<Field>()
      const setFeedBack = (error?: ErrorEvent) => {
        const message = curProps.errorAdaptor(error)

        fieldRef.value.setFeedback({
          type: 'error',
          code: 'UploadError',
          messages: message ? [message] : [],
        })
      }

      const props = {
        ...attrs,
        // onChange 变成了数组； vue3 下相同的attrs props在组件中会合并成数组 
        onChange(
          file: UploadFile,
          fileList: UploadFile[]
        ) {
          setFeedBack()
          emit('change', fileList)
        },

        onRemove(
          file: UploadFile,
          fileList: UploadFile[]
        ) {
          setFeedBack()
          emit('change', fileList)
        },

        onError(
          error: ErrorEvent,
          file: UploadFile,
          fileList: UploadFile[]
        ) {
          setTimeout(() => {
            setFeedBack(error)
          }, 0)
        },
      }
      const children = {
        ...slots,
      }
      if (!slots.default) {
        children.default = () => {
          const listType = attrs.listType
          const drag = attrs.drag

          if (drag) {
            return h(
              Fragment,
              {},
              {
                default: () => [
                  h(
                    ElIcon,
                    { style: { fontSize: '60px', margin: '40px 0 16px' } },
                    h(UploadFilled, { color: 'gray' }, {})
                  ),
                  h(
                    'div',
                    { staticClass: 'el-upload__text' },
                    { default: () => [curProps.textContent] }
                  ),
                ],
              }
            )
          }

          if (listType === 'picture-card') {
            return h(
              Plus,
              {
                style: {
                  width: '28px',
                  height: '28px',
                  marginTop: '60px',
                  color: 'gray',
                },
              },
              {}
            )
          }

          return h(
            ElButton,
            {},
            {
              default: () => [
                h(UploadIcon, {}, {}),
                curProps.textContent
              ]
            }
          )
        }
      }
      return h(ElUpload, { ...props }, children)
    }
  },
})

export const Upload = connect(
  UploadWrapper,
  mapProps({ readOnly: 'readonly', value: 'fileList' })
)

export default Upload
