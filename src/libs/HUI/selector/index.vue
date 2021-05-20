<template>
  <div class="h-selector" v-focus>
    <!-- input -->
    <h-input
      v-model="searchValue"
      :placeholder="placeholder"
    >
    </h-input>

    <!-- menu -->
    <h-select-menu
    :memu="menuData">
    </h-select-menu>
  </div>
</template>

<script>
import { reactive, toRefs, watch, onMounted } from 'vue'
import focus from '../directives/selector'
import HInput from './HInput'
import HSelectMenu from './HSelectMenu'
export default {
  name: 'HSelector',
  directives: {
    focus
  },
  components: {
    HInput,
    HSelectMenu
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },

    // 是否自动展示menu 默认 true
    autoShowMenu: {
      type: Boolean,
      default: true
    },

    // 数据
    data: {
      type: Array,
      required: true
    },

    // defaultPorp
    defaultPorp: {
      type: Object,
      default: () => ({ value: 'value', label: 'label' })
    }
  },
  setup (props) {
    const state = reactive({
      el: {}, // 用来存储节点
      searchValue: '', // 搜索值
      menuData: [], // 数据
      originMenu: [] // 备份数据

    })

    onMounted(() => {
      doData(props.data)
    })

    watch(() => state.searchValue, newVal => {
      console.log('[cahngevalue]', newVal)
    })

    // 改造数据

    const doData = (data) => {
      const _data = JSON.parse(JSON.stringify(data))
      const value = props.defaultPorp.value
      const label = props.defaultPorp.label

      const hData = _data.map(item => {
        item.hValue = item[value]
        item.hText = item[label]
        item.hLabel = item[label]
        return item
      })
      // console.log('[处理过的data]', hData)
      state.menuData = hData
      state.originMenu = state.menuData // 存储一份用来筛选
    }

    return {
      ...toRefs(state),
      doData
    }
  }

}
</script>

<style lang='scss'>
@import '../init.css';
@import '../theme-color.scss';
@import '../font/iconfont.css';

.h-selector {
  position: relative;
  width: 280px;
  border: 1px solid $border-color;
  border-radius: 4px;
  color: $text-color;
}

.iconfont {
  color: $placeholder-color;
}
</style>
