<template>
  <FormLayout :labelCol="6" :wrapperCol="10">
    <SchemaField :schema="schema" />
    <Footer1>
      <span style="margin-left: 4px">扩展文案</span>
    </Footer1>
  </FormLayout>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, inject } from "vue";
import { FormDialog, FormLayout, FormItem, Input } from "../plus/src";
import { createSchemaField } from "@formily/vue";

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

export default defineComponent({
  components: {
    FormDialog,
    FormLayout,
    SchemaField,
    Footer1: FormDialog.Footer,
  },
  data() {
    const schema = {
      type: "object",
      properties: {
        aaa: {
          type: "string",
          title: "输入框1",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
        bbb: {
          type: "string",
          title: "输入框2",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
        ccc: {
          type: "string",
          title: "输入框3",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
        ddd: {
          type: "string",
          title: "输入框4",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
      },
    };
    return {
      schema,
    };
  },
});
</script>

<style></style>
