<template>
  基础组件
  <div v-for="(config, index) in configList" :key="index">
    <h3>{{ config.title }}</h3>
    <SchemaPage :SchemaConfig="config"></SchemaPage>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import com from '../components/com.vue'
import SchemaPage from '../components/schemaPage.vue'

const configList = [
    {
        type: 'Object',
        title: 'Input',
        properties: {
            'plan.title': {
                key: 'plan.title',
                type: 'string',
                title: 'string',
                'x-component': 'Input',
                'x-component-props': {
                    type: 'string'
                },
                'x-decorator': 'FormItem'
            },
            'plan.desc': {
                key: 'plan.desc',
                type: 'string',
                title: 'number',
                'x-component': 'Input',
                'x-component-props': {
                    type: 'number'
                },
                'x-decorator': 'FormItem'
            },
            'plan.rr': {
                key: 'plan.rr',
                type: 'string',
                title: 'TextArea',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                    rows: "2"
                },
                'x-decorator': 'FormItem'
            }
        }
    },
    {
        type: 'Object',
        title: 'Password',
        properties: {
            'plan.title': {
                key: 'plan.title',
                type: 'string',
                title: 'string',
                'x-component': 'Password',
                'x-component-props': {
                    placeholder: "Please input password"
                },
                'x-decorator': 'FormItem'
            }
        }
    },
    {
        type: 'Object',
        title: 'Select',
        properties: {
            'plan.title': {
                key: 'plan.title',
                type: 'string',
                title: 'string',
                'x-component': 'Select',
                enum: [
                    {
                        label: '选项1',
                        value: 1,
                    },
                    {
                        label: '选项2',
                        value: 2,
                    },
                ],
                'x-component-props': {
                    placeholder: "Please input password"
                },
                'x-decorator': 'FormItem'
            }
        }
    }
]


export default defineComponent({
    components: { com, SchemaPage },

    setup(props) {
        return {
            configList
        }
    }
})
</script>

<style>
</style>