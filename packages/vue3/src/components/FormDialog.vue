<template>
  <ElButton @click="handleOpen">点击打开弹窗表单</ElButton>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, Fragment } from "vue";
import { FormDialog, FormLayout, FormItem, Input } from "../plus/src";
import { ElButton } from "element-plus";
import DialogForm from "./DialogForm.vue";

export default defineComponent({
  components: { ElButton },
  data() {
    return {};
  },
  methods: {
    handleOpen() {
      FormDialog("弹框表单", DialogForm)
        .forOpen((payload, next) => {
          setTimeout(() => {
            next({
              initialValues: {
                aaa: "123",
              },
            });
          }, 1000);
        })
        .forConfirm((payload, next) => {
          setTimeout(() => {
            console.log(payload);
            next(payload);
          }, 1000);
        })
        .forCancel((payload, next) => {
          setTimeout(() => {
            console.log(payload);
            next(payload);
          }, 1000);
        })
        .open()
        .then(console.log)
        .catch(console.error);
    },
  },
});
</script>
