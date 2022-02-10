<template>
  <FormProvider :form="form">
    <SchemaField :schema="SchemaConfig" :components="SchemaFieldComps" />
    <FormConsumer>
      <template #default="{ form }">
        <FormItem>
          {{ JSON.stringify(form.values) }}
        </FormItem>
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script lang="ts">
import { FormProvider, createSchemaField, FormConsumer } from '@formily/vue'
import { defineComponent, toRefs, reactive, ref, inject } from 'vue'
import { createForm } from '@formily/core'
import * as PlusCom from '../plus/src'

const { SchemaField } = createSchemaField({})

export default defineComponent({
    name: 'SchemaPage',
    components: { FormProvider, SchemaField, FormConsumer, FormItem: PlusCom.FormItem },
    props: {
        SchemaConfig: {
            type: Object,
            default: () => { }
        },
        formOptions: {
            type: Object,
            default: () => { }
        }
    },
    setup(props) {
        const { formOptions = {} } = props;
        const form = createForm(formOptions)
        const { SchemaConfig } = toRefs(props)
        if (SchemaConfig.value.initData) {
            form.setInitialValues(SchemaConfig.value.initData)
        }
        const SchemaFieldComps = PlusCom
        return {
            form, SchemaConfig, SchemaFieldComps
        }
    }
})
</script>

<style>
</style>