<template>
  <div>
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
    <h1>521521521521521521521521</h1>
    <h1>---- {{ value }} ----</h1>

  </div>

</template>
<script>
import { onMounted, reactive, toRefs } from 'vue'
import axios from 'axios'
export default {
  setup (props) {
    const state = reactive({
      value: '',
      loading: false,
      options: [],
      options2: [
        { id: '1', text: '我是ab' },
        { id: '2', text: '我是ab哈哈' },
        { id: '3', text: '我是aca按实际成' },
        { id: '4', text: '我是Ajj爱吃' },
        { id: '5', text: '我是ab为是问' },
        { id: '6', text: '我是abd我前端群无多哈哈哈哈哈哈哈哈哈哈哈' },
        { id: '7', text: '我是abd汽车全额去' },
        { id: '8', text: '我是ab八十陈乔恩' },
        { id: '9', text: '我是ab范围分为' },
        { id: '10', text: 'a我是ab电放费大V' },
        { id: '11', text: '我是ab上档次' },
        { id: '12', text: '我是ab请求' },
        { id: '13', text: '我是ab请问父亲' },
        { id: '14', text: '我是ab去' },
        { id: '15', text: '我是a前往的全微分' },
        { id: '16', text: '我是区分' },
        { id: '17', text: '委屈额是问' },
        { id: '18', text: '我是前往的群无多' },
        { id: '19', text: '我是起床去二分器' },
        { id: '20', text: '我是yty' },
        { id: '21', text: '我是bb' },
        { id: '22', text: '我是cc' },
        { id: '23', text: '我是ddsdw' },
        { id: '24', text: '我是ddwvwev' },
        { id: '25', text: '我是ddwfqefqef' },
        { id: '26', text: '我是ddqqdqf' },
        { id: '27', text: '我是邓萃雯' },
        { id: '28', text: '问问v薇恩' },
        { id: '29', text: '薇恩把是为V' },
        { id: '30', text: '任务范围访问' },
        { id: '31', text: '问问请求' },
        { id: '32', text: '存储把v' },
        { id: '33', text: '我是a威风威风' },
        { id: '34', text: '我是AAAA' },
        { id: '35', text: '我是Alll' },
        { id: '36', text: 'AlllGiuliaA' },
        { id: '37', text: 'AAll来了aa' },
        { id: '38', text: 'kkk' },
        { id: '39', text: '我是abfwefw44' },
        { id: '40', text: '我是ab1111' }

      ]
    })

    onMounted(() => {
      getList('')
    })

    function getList (key, loading) {
      loading && (state.loading = true)
      axios.get('http://localhost:8080/config/datas/options.json').then(res => {
        // console.log(res)
        state.options = res.data.filter(item => {
          return item.text.includes(key)
        })
        loading && (state.loading = false)
      }).catch(err => {
        console.log(err)
        loading && (state.loading = false)
      })
    }

    function filterable (value) {
      // console.log('[远程搜索]', value)
      getList(value, true)
      // setTimeout(() => {
      //   state.options = state.options2.filter(item => {
      //     return item.text.includes(value)
      //   })
      //   state.loading = false
      // }, 1000)
    }

    return {
      ...toRefs(state),
      filterable
    }
  }
}
</script>
<style lang="scss">
 .my-select {
   margin: 100px 0 0 100px;
 }
</style>
