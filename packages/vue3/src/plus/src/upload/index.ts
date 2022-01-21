import { Field } from '@formily/core'
import { defineComponent, PropType } from 'vue'
import { connect, mapProps, useField, Fragment, h } from '@formily/vue'

import type {
  ElUpload as ElUploadProps,
  UploadFile,
} from 'element-plus/es/components/upload/src/upload.type'

import { ElUpload, ElButton } from 'element-plus'


export interface IUploadProps {
  errorAdaptor?: (error?: ErrorEvent) => String
  textContent?: String,
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
        // TODO onChange 变成了数组
        onChange(
          file: UploadFile,
          fileList: UploadFile[]
        ) {
          console.log('into onChange');
          ; (attrs.onChange as Function)?.(file, fileList)
          setFeedBack()
          // emit('change', fileList)
        },

        onRemove(
          file: UploadFile,
          fileList: UploadFile[]
        ) {
          ; (attrs.onRemove as Function)?.(file, fileList)
          setFeedBack()
          emit('change', fileList)
        },

        onError(
          error: ErrorEvent,
          file: UploadFile,
          fileList: UploadFile[]
        ) {
          ; (attrs.onError as Function)?.(error, file, fileList)

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
                  h('i', { staticClass: 'el-icon-upload' }, {}),
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
              'i',
              {
                staticClass: 'el-icon-plus',
              },
              {}
            )
          }

          return h(
            ElButton,
            { props: { icon: 'el-icon-upload2' } },
            { default: () => [curProps.textContent] }
          )
        }
      }
      console.log(props);
      return h(ElUpload, { ...props }, children)
    }
  },
})

export const Upload = connect(
  UploadWrapper,
  mapProps({ readOnly: 'readonly', value: 'fileList' })
)

export default Upload
