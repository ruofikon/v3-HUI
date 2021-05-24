<template>
  <div>
    <h1>{{label}}</h1>
      <h-selector
        class="my-select"
        v-model="value"
        placeholder="请输入关键字搜索"
        :data="options"
        :defaultPorp="{value: 'id', label: 'text'}"
        multiple
        :autoShowMenu="false"
        remote
        :loading="loading"
        :remote-method="filterable"
      >
      <!-- :autoShowMenu="false" -->
        <template #empty>
          <span>没有无数据呢</span>
        </template>
      </h-selector>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from 'vue'
import axios from 'axios'
export default {
  props: {
    label: String,
    modelValue: {
      type: [Array],
      default: () => []
    }
  },
  setup (props, ctx) {
    const state = reactive({
      value: [],
      loading: false,
      options: []

    })

    watch(() => state.value, nval => {
      if (nval !== props.modelValue) {
        ctx.emit('update:modelValue', nval)
      }
    })

    onMounted(() => {
      getList('')
    })

    function getList (key, loading) {
      loading && (state.loading = true)
      axios.get('/config/datas/options.json').then(res => {
        // console.log(res)
        state.options = res.data.filter(item => {
          return item.text.includes(key)
        })
        loading && (state.loading = false)
        state.value = props.modelValue
      }).catch(err => {
        console.log(err)
        loading && (state.loading = false)
      })
    }

    function filterable (value) {
      getList(value, true)
    }

    return {
      ...toRefs(state),
      filterable
    }
  }
}
</script>

<style>

</style>
