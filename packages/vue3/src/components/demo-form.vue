<template>
  <Form
    :form="form"
    :label-col="6"
    :wrapper-col="10"
    @autoSubmit="log"
    @autoSubmitFailed="log"
  >
    <SchemaField>
      <SchemaStringField
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        :required="true"
      />
      <SchemaStringField
        name="select"
        title="选择框"
        x-decorator="FormItem"
        x-component="Select"
        :enum="[
          {
            label: '选项1',
            value: 1,
          },
          {
            label: '选项2',
            value: 2,
          },
        ]"
        :required="true"
      />
    </SchemaField>
    <FormButtonGroup alignFormItem>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, inject } from 'vue'

import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import {
    Form,
    Input,
    Select,
    FormItem,
    FormButtonGroup,
    Submit,
} from '../plus/src'


const form = createForm()
const fields = createSchemaField({ components: { Input, Select, FormItem } })

export default defineComponent({

    components: { FormButtonGroup, Submit, Form, ...fields },
    data() {
        return {
            form,
        }
    },

    methods: {
        log(value) {
            console.log(value)
        },
    },
})
</script>