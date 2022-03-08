<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="log">提交</Submit>
    <FormConsumer>
      <template #default="{ form }">
        {{ JSON.stringify(form.values) }}
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, inject } from "vue";
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField, FormConsumer } from "@formily/vue";
import {
  FormButtonGroup,
  Submit,
  FormItem,
  Space,
  Input,
  ArrayTabs,
  Switch,
} from "../plus/src";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Space,
    Input,
    ArrayTabs,
    Switch,
  },
});

export default defineComponent({
  components: {
    FormProvider,
    FormButtonGroup,
    Submit,
    FormConsumer,
    ...SchemaField,
  },

  data() {
    const form = createForm();
    const schema = {
      type: "object",
      properties: {
        string_array: {
          type: "array",
          title: "字符串数组",
          "x-decorator": "FormItem",
          maxItems: 3,
          "x-component": "ArrayTabs",
          items: {
            type: "string",
            "x-decorator": "FormItem",
            required: true,
            "x-component": "Switch",
          },
        },
        // array: {
        //   type: "array",
        //   title: "对象数组",
        //   "x-decorator": "FormItem",
        //   maxItems: 3,
        //   "x-component": "ArrayTabs",
        //   items: {
        //     type: "object",
        //     properties: {
        //       aaa: {
        //         type: "string",
        //         "x-decorator": "FormItem",
        //         title: "AAA",
        //         required: true,
        //         "x-component": "Input",
        //       },
        //       bbb: {
        //         type: "string",
        //         "x-decorator": "FormItem",
        //         title: "BBB",
        //         required: true,
        //         "x-component": "Input",
        //       },
        //     },
        //   },
        // },
      },
    };

    return {
      form,
      schema,
    };
  },
  methods: {
    log(values) {
      console.log(values);
    },
  },
});
</script>

<style lang="scss" scoped></style>
