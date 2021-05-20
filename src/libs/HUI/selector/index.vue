<template>
  <div class="h-selector" v-focus>
    <!-- input -->
    <h-input
      v-model="searchValue"
      :placeholder="placeholder"
      :selectedValue="selectedValue"
      @changeInput="changeInput"
    >
    </h-input>

    <!-- menu -->
    <h-select-menu
      :memu="menuData"
      @onSelected="onSelected"
    >
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
    },

    // 多选 默认 false
    multiple: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const state = reactive({
      el: {}, // 用来存储节点
      searchValue: '', // 搜索值
      menuData: [], // 数据
      originMenu: [], // 备份数据
      selectedValue: '' // 单选选中的

    })

    onMounted(() => {
      doData(props.data)
    })

    watch(() => state.searchValue, newVal => {

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

    // 筛选
    const searchItem = (value) => {
      console.log('[筛选]', value)
      if (!value) {
        setTimeout(() => {
          state.menuData = state.originMenu
        }, 200)
        return
      }
      const _value = value.toLowerCase()
      state.menuData = state.originMenu.filter(item => {
        if (item.hLabel.toLowerCase().includes(_value)) {
          // item.hText = item.hLabel.replace(new RegExp(_value, 'g'), `<span class="h-same-text">${_value}</span>`)
          // console.log(item)
          return item
        }
      })
    }

    // 选中 select 区分单选和多选
    const onSelected = (optionItem) => {
      if (!props.multiple) {
        selectOne(optionItem)
      } else {

      }
    }

    // 单选时选中 option 赋值给 input 并传给外界
    const selectOne = (optionItem) => {
      // state.searchValue = optionItem.hLabel
      // state.el.oInput.blur()
      state.selectedValue = optionItem.hLabel
      // setTimeout(() => {
      //   state.menuData = state.originMenu
      // }, 600)
    }

    // 输入搜索
    const changeInput = (val) => {
      // console.log('[changeInput]', val)
      searchItem(val)
    }

    return {
      ...toRefs(state),
      doData,
      onSelected,
      selectOne,
      searchItem,
      changeInput
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

.h-same-text {
  color: $theme-color;
}
</style>
