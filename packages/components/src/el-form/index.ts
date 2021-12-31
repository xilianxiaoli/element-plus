import { Form } from '@formily/core'
import { FormProvider as _FormProvider, createForm } from '@formily/vue'
// import type { FormRulesMap as _ElFormProps } from 'element-plus'
import type {  Component } from 'vue'
import { ElForm as ElFormComponent } from 'element-plus'

const FormProvider = _FormProvider as unknown as Component

// TODO 删除 _ElFormProps
export type ElFormProps = {
  form?: Form
  component: Component
  onAutoSubmit?: (values: any) => any
}
// TODO : FunctionalComponentOptions<ElFormProps>
export const ElForm = {
  functional: true,
  render(h, context) {
    const {
      form = createForm({}),
      component = ElFormComponent,
      onAutoSubmit = context.listeners?.autoSubmit,
      ...props
    } = context.props
    const submitHandler = (
      Array.isArray(onAutoSubmit) ? onAutoSubmit[0] : onAutoSubmit
    ) as (values: any) => any
    return h(FormProvider, { props: { form } }, [
      h(
        component,
        {
          ...context.data,
          props,
          nativeOn: {
            submit: (e: Event) => {
              e?.stopPropagation?.()
              e?.preventDefault?.()
              form.submit(submitHandler)
            },
          },
        },
        context.children
      ),
    ])
  },
}

export default ElForm
