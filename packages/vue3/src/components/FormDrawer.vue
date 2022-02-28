<template>
  <ElButton @click="handleOpen">点击打开FormDrawer</ElButton>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, ref, inject } from "vue";
import { FormDrawer } from "../plus/src";
import { ElButton } from "element-plus";
import DrawerForm from "./DrawerForm.vue";

export default defineComponent({
  components: { ElButton },
  data() {
    return {};
  },
  methods: {
    handleOpen() {
      FormDrawer({ title: "抽屉表单", size: "50%" }, DrawerForm)
        .forOpen((payload, next) => {
          setTimeout(() => {
            next({
              initialValues: {
                aaa: "123",
              },
            });
          }, 1000);
        })
        .open()
        .then((values) => {
          console.log("values", values);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
</script>
