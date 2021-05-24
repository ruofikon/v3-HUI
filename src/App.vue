<template>
  <div class="index">
    <mySelect v-model="value1" label="单选1"></mySelect>
    <mySelect v-model="value2" label="单选2"></mySelect>

    <div>
      <h1>多选 不收起下拉框</h1>
      <div class="pp">{{value3}}</div>
      <h-selector
        class="my-select"
        v-model="value3"
        placeholder="请输入关键字搜索"

        :data="options3"
        :defaultPorp="{value: 'id', label: 'text'}"
        multiple
      >
        <!-- :autoShowMenu="false" -->
      </h-selector>

    </div>

    <div>
      <h1>多选 自动收起下拉框</h1>
      <div class="pp">选中 -- {{value4}}</div>
      <selects2 v-model="value4"></selects2>
    </div>

  </div>

</template>
<script>
import { onMounted, reactive, toRefs } from 'vue'

import mySelect from './components/mySelect'
import selects2 from './components/select2'
export default {

  components: {
    mySelect,
    selects2
  },
  setup (props) {
    const state = reactive({
      value1: '',
      value2: 4,
      value3: [],
      value4: [3, 4, 566],
      loading: false,
      options: [],
      options3: [
        { id: '1', text: '我是ab' },
        { id: '2', text: '哈' },
        { id: '3', text: '成' },
        { id: '4', text: '我' },
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

    }

    return {
      ...toRefs(state)
    }
  }
}
</script>
<style lang="scss">
 .my-select {
   margin: 0 100px;
 }
  h1 {
    text-align: center;
  }
 .index {
   display: flex;
 }
 .pp {
   text-align: center;
   margin-bottom: 20px;
 }
</style>
