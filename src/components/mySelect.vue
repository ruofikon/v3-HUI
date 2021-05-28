<template>
  <div>
    <h1>{{label}}</h1>
    <div class="ccc">----选中 {{ value }} ----</div>
      <h-selector
        class="my-select"
        v-model="value"
        placeholder="请输入关键字搜索"
        :data="importOp2" :defaultPorp="{value: 'value', label: 'label'}"
      >
        <template #empty>
          <span>没有无数据呢</span>
        </template>
      </h-selector>
      <!-- :autoShowMenu="false" -->

    </div>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from 'vue'
import currencyData from '../data'
console.log('1212', currencyData)
// import axios from 'axios'
export default {
  props: {
    label: String,
    modelValue: {
      type: [String, Number],
      default: ''
    },
    defaultPorp: {
      type: Object,
      default: () => ({ value: 'id', label: 'text' })
    }
  },
  setup (props) {
    const state = reactive({
      value: '',
      loading: false,
      options: [],
      importOp2: []
    })

    watch(() => props.modelValue, nval => {
      // if (nval !== state.value) {
      //   state.value = nval
      // }
      console.log('传进 value', nval)
    })

    onMounted(() => {
      // getList('')
      state.importOp2 = currencyData
      console.log('[state]', currencyData)
      setTimeout(() => {
        state.value = '1'
      }, 1000)
    })

    function getList (key, loading) {
      // loading && (state.loading = true)
      // axios.get('/config/datas/options.json').then(res => {
      //   // console.log(res)
      //   state.options = res.data.filter(item => {
      //     return item.text.includes(key)
      //   })
      //   loading && (state.loading = false)
      //   state.value = props.modelValue
      // }).catch(err => {
      //   console.log(err)
      //   loading && (state.loading = false)
      // })
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
.ccc {
  text-align: center;
  margin-bottom: 20px;
}
</style>
