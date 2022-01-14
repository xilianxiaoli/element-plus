<template>
  <FormProvider :form="form">
    <Field
      name="price"
      title="价格"
      :initialValue="5.2"
      :decorator="[FormItem]"
      :component="[Input]"
    />
    <Field
      name="count"
      title="数量"
      :initialValue="100"
      :decorator="[FormItem]"
      :component="[
        Input,
        {
          placeholder: '请输入',
          style: {
            width: 100,
          },
        },
      ]"
    />
    <FormConsumer>
      <template #default="{ form }">
        <FormItem>
          = {{ `${form.values.price * form.values.count} 元` }}</FormItem
        >
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { Input, FormItem } from '../plus/src'
import { FormProvider, FormConsumer, Field } from '@formily/vue'

const form = createForm()

export default {
    components: { FormProvider, FormConsumer, Field },
    data() {
        this.form = form;
        this.Input = Input;
        this.FormItem = FormItem;
        // return {
        //     form,
        //     Input,
        //     FormItem,
        // }
    },
}
</script>