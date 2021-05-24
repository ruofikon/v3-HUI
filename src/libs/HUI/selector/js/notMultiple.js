function Fn (state, props, ctx) {
  return {

    // 选中 导出value 值
    selected: function (optionItem) {
      // console.log('這是单选选中', optionItem)
      state.el.oInput.blur()
      state.selectedObj = optionItem
      // state.searchValue = optionItem.hLabel

      this.changeValue() // 导出value 值

      // 延迟关闭下来菜单,避免拿不到值
      setTimeout(() => {
        state.el.oMemu.style.display = 'none'
      }, 100)
    },

    // 清空
    clear: function () {
      // 清除input值 选中对象
      state.searchValue = ''
      state.selectedObj = {}

      // 展示placeholder 下来icon 隐藏input
      state.el.oPlaceholder.style.display = 'block'
      state.el.oInput.style.display = 'none'
      state.el.oInputIcon.className = 'suffix-icon iconfont icon-down'

      // 导出value 值
      this.changeValue()
    },

    // 失焦
    blur: function () {
      // 如果selected 里面没有值,则清空input值
      if (!state.selectedObj.hValue) {
        state.searchValue = ''
      }

      // 延迟 避免选中失焦时拿不到值
      setTimeout(() => {
        // 如果input没有值 并且之前未选中 则显示placeholder
        if (!state.searchValue && !state.selectedObj.hValue) {
          state.el.oPlaceholder.style.display = 'block'
          state.el.oInput.style.display = 'none'
        }
      }, 200)
    },

    // 对外导出 value
    changeValue: function () {
      const value = state.selectedObj.hValue || ''
      ctx.emit('update:modelValue', value)
    },

    // 默认选中
    _mounted: function () {
      if (props.modelValue) {
        state.el.oPlaceholder.style.display = 'none'
        state.el.oInput.style.display = 'block'

        // 将选中的勾选上 -- 单选
        if (!props.multiple) {
          const isHave = state.menuMap[props.modelValue]
          // 如果数据里面有这个传入key就默认选中
          if (isHave) {
            state.selectedObj = isHave
            state.searchValue = state.selectedObj.hLabel
            console.log(state.selectedObj)
          } else {
            // 没有就展示placeholder
            state.el.oPlaceholder.style.display = 'block'
            state.el.oInput.style.display = 'none'
          }
        }
      }
    }
  }
}
export default Fn
