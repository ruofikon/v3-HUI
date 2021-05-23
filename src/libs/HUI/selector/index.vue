<template>
  <div :class="['h-selector', {'is-focus': isFocus}]" v-focus>
    <!-- input -->
    <h-input
      v-show="!multiple"
      v-model="searchValue"
      :placeholder="placeholder"
      :selectedObj="selectedObj"
      @changeInput="changeInput"
      @onfocus="onfocus"
      @onblur="onblur"
    >

    </h-input>

    <!-- menu -->
    <h-select-menu
      :memu="menuData"
      :empty="isEmpty"
      :loading="loading"
      :selectedObj="selectedObj"
      @onSelected="onSelected"
    >

      <template #empty>
         <slot name="empty">无数据</slot>
      </template>
      <template #loading>
         <slot name="loading">加载中</slot>
      </template>
      <template #default="scope">
        <slot :option="scope.option">{{scope.option.hText}}</slot>
      </template>
    </h-select-menu>
  </div>
</template>

<script>
import { reactive, toRefs, watch, onMounted } from 'vue'
import focus from '../directives/selector'
import HInput from './HInput'
import HSelectMenu from './HSelectMenu'
import useNotMultipleFn from './js/notMultiple'
import useSearchFn from './js/search'
import useDoData from './js/dodata'
import useMenuScroll from './js/menuScroll'
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
    },

    // 值
    modelValue: {
      type: [String, Number],
      default: ''
    },

    // 加载中
    loading: {
      type: Boolean,
      default: false
    },

    // 远程加载
    remote: {
      type: Boolean,
      default: false
    },
    // 远程加载 方法
    remoteMethod: {
      type: Function
    },

    // 滚动 方法
    selectMenuScroll: {
      type: Function
    },
    // 滚动距离
    scrollBottomValue: {
      type: Number
    }
  },
  setup (props, ctx) {
    const state = reactive({
      el: {}, // 用来存储节点
      searchValue: '', // 搜索值
      menuData: [], // 数据
      originMenu: [], // 备份数据
      menuMap: new Map(), // 数据
      historyMap: new Map(), // 搜索历史记录
      selectedObj: {}, // 单选选中的
      isFocus: false,
      isEmpty: false,

      // 分页加载
      scrollInfo: {
        data: [],
        size: 20,
        currentPage: 1,
        count: 0,
        pageCount: 1
      }

    })

    const doData = useDoData(state, props, ctx)
    const selectedFn = useNotMultipleFn(state, props, ctx)
    const searchFn = useSearchFn(state, props, ctx)
    const scrollFn = useMenuScroll(state, props, ctx)

    onMounted(() => {
    })

    watch(() => props.data, ndata => {
      doData.getData(props.data)
      // 监听空值
      state.isEmpty = !(state.menuData.length > 0)
      // console.log('isEmpty', state.isEmpty)
      // selectedFn._mounted() // 默认选中
    })

    // 默认选中只需要执行一次
    const stop = watch(() => props.data, ndata => {
      selectedFn._mounted() // 默认选中
      stop()
    })

    // 监听 loading
    watch(() => props.loading, nloading => {
      // if false 则记录历史搜索记录
      if (!nloading && !state.historyMap[state.searchValue]) {
        state.historyMap[state.searchValue] = state.originMenu
      } else {

      }
    })

    // 输入搜索
    const changeInput = (val) => {
      // console.log('[changeInput]', val)
      // 将滚动加载的页面初始化
      // state.scrollInfo.currentPage = 1
      // state.scrollInfo.data = []

      // 先查找历史记录
      const history = searchFn.searchHistory(val)
      if (history.length > 0) {
        return
      }
      // 如果远程加载
      if (props.remote) {
        state.menuData = []
        state.originMenu = []

        // state.menuMap = new Map()

        state.el.oMemu.style.display = 'block'
        if (typeof props.remoteMethod === 'function') {
          props.remoteMethod(val)
        }
        state.searchValue = val
      } else {
        searchFn.search(val)
      }
    }

    // 选中 select 区分单选和多选
    const onSelected = (optionItem) => {
      if (!props.multiple) {
        selectedFn.selected(optionItem) // 单选选中
      } else {

      }
    }

    const onfocus = (value) => {
      // state.isEmpty = false

      // 如果自动展示， 则聚焦的时候暴露搜索方法
      if (props.autoShowMenu) {
        changeInput('')
      } else {
        state.menuData = state.originMenu
        state.isFocus = true
        state.isEmpty = !(state.menuData.length > 0)
        // console.log(state.historyMap)
      }
    }

    const onblur = (value) => {
      state.isFocus = false
      if (!props.multiple) {
        selectedFn.blur()
      } else {

      }
    }

    // 清空 清空视图并导出value值
    const clear = () => {
      if (!props.multiple) {
        selectedFn.clear()
      } else {

      }
    }

    // 下拉 menu 滚动
    const menuScroll = (that) => {
      const botval = props.scrollBottomValue || 50

      const scrollH = that.scrollHeight - botval - 10
      // 元素滚动高度
      const scrollT = that.scrollTop
      // 盒子高度
      const bottom = state.el.menuDom.offsetHeight
      if (scrollT + bottom >= scrollH) {
        // console.log(scrollH, bottom + scrollT)
        if (typeof props.selectMenuScroll === 'function') {
          props.selectMenuScroll(that)
        } else {
          scrollFn.scroll()
        }
        console.log('滚动到底啦 加入数据', state.menuData.length)
        // console.log(state.menuData)
      }
    }

    return {
      ...toRefs(state),
      onSelected,
      changeInput,
      onfocus,
      onblur,
      clear,
      menuScroll
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
  transition: border-color .2s;
  -webkit-transition: border-color .2s;
  -o-transition: border-color .2s;
  -moz-transition: border-color .2s;
}
.h-selector.is-focus {
  border-color: $theme-color;
}
.h-selector:hover {
  border-color: $theme-color;
}
.iconfont {
  color: $placeholder-color;
}

.h-same-text {
  color: $theme-color;
}
</style>
