<template>
  this is A
  <Bcom :attrs="$attrs" :onChange="AA"></Bcom>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Bcom from './B.vue'

export default defineComponent({
    name: 'Acom',
    components: { Bcom },
    // props: ['onChange'],
    setup(p, { attrs, emit }) {
        const AA = () => { }
        return { AA }
    }
})
</script>

<style>
</style>