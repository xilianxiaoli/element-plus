import { observer } from "@formily/reactive-vue";
import { defineComponent, reactive, computed, PropType, h } from 'vue'
import { useField, useFieldSchema, RecursionField } from '@formily/vue'
import { ArrayField } from '@formily/core'
import { ElTabs, ElTabPane, ElBadge } from 'element-plus'


export const TT = observer(
    defineComponent({
        inheritAttrs: false,
        // props: ['onChange'],
        setup(p, { slots }) {
            const fieldRef = useField<ArrayField>();
            const schemaRef = useFieldSchema()

            return () => {
                console.log('fieldRef.value.value:', fieldRef.value.value);
                const value = Array.isArray(fieldRef.value.value) ? fieldRef.value.value : []
                const dataSource = value?.length ? value : [{}]
                const renderItems = () =>
                    dataSource?.map((item, index) => {
                        const items = Array.isArray(schemaRef.value.items)
                            ? schemaRef.value.items[index]
                            : schemaRef.value.items
                        return h(
                            'div',
                            {

                            },
                            {
                                default: () =>
                                    [h(
                                        RecursionField,
                                        {
                                            schema: items,
                                            name: index,
                                        },
                                        {}
                                    )],
                            }
                        )
                    })
                return h(
                    'div',
                    {
                        class: 'test-input'
                    },
                    {
                        default: () => [renderItems()],
                    }

                )
            }
        }
    })
)

// export { TT }

export default TT