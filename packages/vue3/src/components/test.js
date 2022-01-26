import { defineComponent, h, onMounted } from 'vue'

export const bb = defineComponent({
    name: 'BB',
    props: {
        onChange: {
            type: Function,
            default: () => { }
        }
    },
    setup(props, { attrs, slots, emit }) {
        onMounted(() => {
            console.log('onMounted');
            emit('change')
            props.onChange()
        })
        return () => {
            console.log('BB attrs:', attrs, props);
            let data = {
                ...attrs,
            }

            return h('div', data, 'bbbb')
        }
    },
})

export const aa = defineComponent({
    name: 'AA',
    props: [
        'onClose'
    ],
    setup(curProps, { attrs, slots, emit }) {

        onMounted(() => {
            emit('close')
        })

        console.log('AA', attrs);
        // onchange from f/vue
        const afn = () => console.log('afn')
        const props = {
            ...attrs,
            onChange() {
                console.log('onChange');
            },
            afn
        }
        console.log('aa', props);
        return () => (h(bb, { ...props }, slots))
    }
})

// 函数式组件的差异点

// 3.0 将 $listeners 移除了 关于 attrs 和 props 合并的问题
// 有组件 A ，组件A中渲染了组件B，组件A没有props，组件B有 props onChange 参数，
// 在 A 组件中，声明了一个onChange函数传给B，通过解构的方式覆盖attrs的原有参数
// 在使用A组件的时候，传入一个 onChange 参数，因为A中没有声明这个props，所以onChange作为 attrs 传递
// 正常来说，B组件接受到的 onChange 参数就是一个正常的函数，但结果并不是这样，
// B中接收到的 onChange 参数是一个数组，数组中有两个函数，分别是 A 组件接收到的 attrs.onChange  和 A组件中声明的 onChange
// 要是模板组件就不会出现这个问题，props 和 attrs 是分开的<图>

// 因为attrs 和 props 合并了，所以在组件上定义事件有两种方式
// 一种是在组件中加上 v-on:close 事件监听器，那么该事件就转成 onChange:()=>() 作为属性 attrs 传递给组件
// 另一种是通过props的方式，如 :onChange="func" 
// 这两种方式都可以在组件中可通过 emit('change') 通知该事件，因为在内部事件定义和props合并成了一个attrs，那么emit是如何区分哪些是事件，哪些可以通知的呢？
// 若属性如下 attrs={a:12,onB:()=>(),Onc:()=>()} ，只要符合 onXxx 格式的属性就可以被emit触发，所以若在模板组件中定义一个 onXxx props，emit是可以触发的 ，即使该事件是props也一样可以被触发
// 所以在定义 props 的时候不要使用 onXxx 的格式，避免与事件混淆