<template>
  <div>
    <h1>{{label}}</h1>
      <h-selector
        class="my-select"
        v-model="value"
        placeholder="请输入关键字搜索"
        :data="options"
        :defaultPorp="{value: 'id', label: 'text'}"
        remote

        :loading="loading"
        :remote-method="filterable"
      >
        <template #empty>
          <span>没有无数据呢</span>
        </template>
      </h-selector>
      <!-- :autoShowMenu="false" -->
      <h1>---- {{ value }} ----</h1>
    </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from 'vue'
import axios from 'axios'
export default {
  props: {
    label: String,
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props) {
    const state = reactive({
      value: '',
      loading: false,
      options: []

    })

    watch(() => props.modelValue, nval => {
      // if (nval !== state.value) {
      //   state.value = nval
      // }
      // console.log('传进 value', nval)
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
