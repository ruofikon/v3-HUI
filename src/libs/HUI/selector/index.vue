<template>
  <div class="h-select-comp"  v-focus @click.stop="()=>{}">
    <div :class="['h-selector', {'is-focus': isFocus}]">
      <!-- h-input 单选 -->
      <h-input
        v-if="!multiple"
        v-model="searchValue"
        :placeholder="placeholder"
        :selectedObj="selectedObj"
        @changeInput="changeInput"
        @onfocus="onfocus"
        @onblur="onblur"
      ></h-input>

      <!-- h-trigger 多选-->
      <h-trigger
        v-if="multiple"
        :selectedTags="selectedTags"
        :placeholder="placeholder"
        @closeTag="closeTag"
        @changeInput="changeInput"

      >

      </h-trigger>

    </div>
    <div class="h-menu-box">
      <!-- menu -->
      <h-select-menu
        :memu="menuData"
        :empty="isEmpty"
        :loading="loading"
        :selectedObj="selectedObj"
        :selectedTagsValue="selectedTagsValue"
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

  </div>
</template>

<script>
import { reactive, toRefs, watch, onMounted } from 'vue'
import focus from '../directives/selector'
import HInput from './HInput'
import HSelectMenu from './HSelectMenu'
import HTrigger from './HTrigger'
import useNotMultipleFn from './js/notMultiple'
import useMultipleFn from './js/multiple'
import useSearchFn from './js/search'
import useDoData from './js/dodata'
export default {
  name: 'HSelector',
  directives: {
    focus
  },
  components: {
    HInput,
    HSelectMenu,
    HTrigger
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
      type: [String, Number, Array],
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
    // 自定义搜索方法
    remoteMethod: {
      type: Function
    },

    // 自定义滚动加载方法
    selectMenuScroll: {
      type: Function
    },
    // 滚动距离,默认50
    scrollBottomValue: {
      type: Number,
      default: 50
    }
  },
  setup (props, ctx) {
    const state = reactive({
      el: {}, // 用来存储节点
      searchValue: '', // 搜索值
      menuData: [], // 数据 用以渲染
      originMenu: [], // 备份数据 用以本地搜索
      menuMap: new Map(), // 数据 对象类型,用以默认选中的筛选
      historyMap: new Map(), // 搜索历史记录
      selectedObj: {}, // 单选选中的
      selectedTags: [], // 多选选中的项
      selectedTagsValue: [], // 多选选中的项的value值
      isFocus: false, // 聚焦状态
      isEmpty: false // 空状态

    })

    const doData = useDoData(state, props, ctx)
    const selectedFn = useNotMultipleFn(state, props, ctx)
    const multipleFn = useMultipleFn(state, props, ctx)
    const searchFn = useSearchFn(state, props, ctx)

    onMounted(() => {
      // 如果是本地数据
      if (!props.remote) {
        doData.getData(props.data)
        // 监听空值
        state.isEmpty = !(state.menuData.length > 0)
        // console.log('如果是本地数据', props.data)
      }
    })

    // 监听数据源, 如果发生改变则处理数据
    watch(() => props.data, ndata => {
      doData.getData(props.data)
      // 监听空值
      state.isEmpty = !(state.menuData.length > 0)
      // console.log('isEmpty', state.isEmpty)
      // console.log('props.data', props.data)
      // selectedFn._mounted() // 默认选中
    })

    // 默认选中只需要执行一次
    const stop = watch(() => props.data, ndata => {
      if (!props.multiple) {
        selectedFn._mounted() // 默认选中
      }
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
      console.log('[changeInput]', val)

      // 先查找历史记录
      const history = searchFn.searchHistory(val)
      if (history) return

      // 如果没有历史记录 则检索menuData
      // 如果远程加载
      if (props.remote) {
        state.menuData = []
        state.originMenu = []

        state.el.oMemu.style.display = 'block'
        if (typeof props.remoteMethod === 'function') {
          // 调用自定义搜索方法
          props.remoteMethod(val)
        }
        state.searchValue = val
      } else {
        // 非远程加载
        searchFn.search(val)
      }
    }

    // 选中 select 区分单选和多选
    const onSelected = (optionItem) => {
      if (!props.multiple) {
        selectedFn.selected(optionItem) // 单选选中
      } else {
        multipleFn.selected(optionItem)
      }
    }

    const onfocus = (value) => {
      // state.isEmpty = false

      // 如果自动展示， 则聚焦的时候暴露搜索方法
      if (props.autoShowMenu) {
        changeInput('')
      } else {
        // 非自动展示
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
        multipleFn.blur()
      }
    }

    // 清空 清空视图并导出value值
    const clear = () => {
      if (!props.multiple) {
        selectedFn.clear()
      } else {
        multipleFn.clear()
      }
    }

    // 多选删除tag
    const closeTag = (tag) => {
      multipleFn.addOrDelTags({ type: 'del', tagItem: tag })
    }

    // 隐藏下拉菜单
    const hiddenMenu = () => {
      state.el.oMemu.style.display = 'none'
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
        //  滚动到底的时候 对外暴露方法
        if (typeof props.selectMenuScroll === 'function') {
          props.selectMenuScroll(that)
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
      menuScroll,
      closeTag,
      hiddenMenu
    }
  }

}
</script>

<style lang='scss'>
@import '../init.css';
@import '../font/iconfont.css';
@import '../css/select.scss';

</style>
