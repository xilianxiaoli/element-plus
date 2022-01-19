<template>
  <!-- <EleCom></EleCom> -->
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
import EleCom from '../components/eleCom.vue'

const Input = {
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
        // 'plan.desc': {
        //     key: 'plan.desc',
        //     type: 'string',
        //     title: 'number',
        //     'x-component': 'Input',
        //     'x-component-props': {
        //         type: 'number'
        //     },
        //     'x-decorator': 'FormItem'
        // },
        // 'plan.rr': {
        //     key: 'plan.rr',
        //     type: 'string',
        //     title: 'TextArea',
        //     'x-component': 'Input.TextArea',
        //     'x-component-props': {
        //         rows: "2"
        //     },
        //     'x-decorator': 'FormItem'
        // }
    }
}

const Password = {
    type: 'Object',
    title: 'Password',
    properties: {
        'plan.title': {
            key: 'plan.title',
            title: 'string',
            'x-component': 'Password',
            'x-component-props': {
                placeholder: "Please input password"
            },
            'x-decorator': 'FormItem'
        }
    }
}

const Select = {
    type: 'Object',
    title: 'Select',
    properties: {
        'plan.title': {
            type: 'string',
            title: '单选',
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
        },
        'plan.title1': {
            type: 'string',
            title: '多选',
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
                placeholder: "Please input password",
                multiple: true
            },
            'x-decorator': 'FormItem'
        }
    }
}

const DatePicker = {
    type: 'Object',
    title: 'DatePicker',
    properties: {
        'time': {
            type: 'string',
            title: '日期选择',
            'x-component': 'DatePicker',
            'x-component-props': {

            },
            'x-decorator': 'FormItem'
        },
        'daterange': {
            type: 'string',
            title: '日期范围选择',
            'x-component': 'DatePicker',
            'x-component-props': {
                type: 'daterange'
            },
            'x-decorator': 'FormItem'
        }
    }
}

const TimePicker = {
    type: 'Object',
    title: 'DatePicker',
    properties: {
        'time': {
            type: 'string',
            title: '时间选择',
            'x-component': 'TimePicker',
            'x-component-props': {
                placeholder: '选择时间'
            },
            'x-decorator': 'FormItem'
        },
        'timeDis': {
            type: 'string',
            title: '时间选择-禁用',
            default: new Date(2016, 9, 10, 18, 30),
            'x-component': 'TimePicker',
            "x-disabled": true,
            'x-component-props': {},
            'x-decorator': 'FormItem'
        }
    }
}

const InputNumber = {
    type: 'Object',
    title: 'InputNumber',
    properties: {
        'num': {
            type: 'number',
            title: '数字输入',
            'x-component': 'InputNumber',
            'x-component-props': {
                placeholder: '请输入'
            },
            'x-decorator': 'FormItem'
        },
        // 'numDis': {
        //     type: 'number',
        //     title: '数字输入-禁用',
        //     default: 123,
        //     'x-component': 'InputNumber',
        //     "x-disabled": true,
        //     'x-component-props': {},
        //     'x-decorator': 'FormItem'
        // }
    }
}

const Cascader = {
    type: 'Object',
    title: 'Cascader',
    properties: {
        'num': {
            type: 'string',
            title: '选择器',
            'x-component': 'Cascader',
            enum: [
                {
                    value: 'guide',
                    label: 'Guide',
                    children: [
                        {
                            value: 'disciplines',
                            label: 'Disciplines',
                            children: [
                                {
                                    value: 'consistency',
                                    label: 'Consistency',
                                },
                                {
                                    value: 'feedback',
                                    label: 'Feedback',
                                },
                                {
                                    value: 'efficiency',
                                    label: 'Efficiency',
                                },
                                {
                                    value: 'controllability',
                                    label: 'Controllability',
                                },
                            ],
                        },
                        {
                            value: 'navigation',
                            label: 'Navigation',
                            children: [
                                {
                                    value: 'side nav',
                                    label: 'Side Navigation',
                                },
                                {
                                    value: 'top nav',
                                    label: 'Top Navigation',
                                },
                            ],
                        },
                    ],
                }],
            'x-component-props': {
                placeholder: '请输入',
                options: [
                    {
                        value: 'guide',
                        label: 'Guide',
                        children: [
                            {
                                value: 'disciplines',
                                label: 'Disciplines',
                                children: [
                                    {
                                        value: 'consistency',
                                        label: 'Consistency',
                                    },
                                    {
                                        value: 'feedback',
                                        label: 'Feedback',
                                    },
                                    {
                                        value: 'efficiency',
                                        label: 'Efficiency',
                                    },
                                    {
                                        value: 'controllability',
                                        label: 'Controllability',
                                    },
                                ],
                            },
                            {
                                value: 'navigation',
                                label: 'Navigation',
                                children: [
                                    {
                                        value: 'side nav',
                                        label: 'Side Navigation',
                                    },
                                    {
                                        value: 'top nav',
                                        label: 'Top Navigation',
                                    },
                                ],
                            },
                        ],
                    }]
            },
            'x-decorator': 'FormItem'
        }
    }
}

const Radio = {
    type: 'object',
    title: 'Radio',
    properties: {
        radio: {
            type: 'boolean',
            title: '单选',
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
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
            'x-component-props': {
                optionType: 'button',
            },
        },
    },
}

const configList = [Cascader]


export default defineComponent({
    components: { com, SchemaPage, EleCom },

    setup(props) {
        return {
            configList
        }
    }
})
</script>

<style>
</style>