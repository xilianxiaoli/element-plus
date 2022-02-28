import { h, useParentForm } from '@formily/vue'
import { IFormFeedback } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue'

import type { ElButton as ElButtonProps } from 'element-plus'
import { ElButton } from 'element-plus'

export type ISubmitProps = {
  onClick?: (e: MouseEvent) => any
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
} & (typeof ElButtonProps)

export const Submit = observer(
  defineComponent({
    name: 'FSubmit',
    props: ['onClick', 'onSubmit', 'onSubmitSuccess', 'onSubmitFailed'],
    setup(props, { attrs, slots }) {
      const formRef = useParentForm()

      return () => {
        const {
          onClick = attrs?.click,
          onSubmit = attrs?.submit,
          onSubmitSuccess = attrs?.submitSuccess,
          onSubmitFailed = attrs?.submitFailed,
        } = props
        const form = formRef?.value
        return h(
          ElButton,
          {
            attrs: {
              nativeType: attrs?.submit ? 'button' : 'submit',
              type: 'primary',
              ...attrs,
              loading:
                attrs.loading !== undefined ? attrs.loading : form?.submitting,
            },
            click: (e: any) => {
              console.log(22222);
              if (onClick) {
                if (onClick(e) === false) return
              }
              if (onSubmit) {
                form
                  ?.submit(onSubmit as (e: any) => void)
                  .then(onSubmitSuccess as (e: any) => void)
                  .catch(onSubmitFailed as (e: any) => void)
              }
            },
          },
          slots
        )
      }
    },
  })
)

export default Submit
