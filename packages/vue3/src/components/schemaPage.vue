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
import { defineComponent, toRefs, reactive, ref } from 'vue'
import { createForm } from '@formily/core'
import { Input, FormItem, Password, Select } from '../plus/src'

const { SchemaField } = createSchemaField({})

export default defineComponent({
    name: 'SchemaPage',
    components: { FormProvider, SchemaField, FormConsumer },
    props: {
        SchemaConfig: {
            type: Object,
            default: () => { }
        }
    },
    setup(props) {
        const form = createForm() //
        const { SchemaConfig } = toRefs(props)
        const SchemaFieldComps = { Input, FormItem, Password, Select }
        return {
            form, SchemaConfig, SchemaFieldComps
        }
    }
})
</script>

<style>
</style>