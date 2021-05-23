function Fn (state, props, ctx) {
  return {

    // 选中 导出value 值
    selected: function (optionItem) {
      // console.log('這是单选选中', optionItem)
      state.el.oInput.blur()
      state.selectedObj = optionItem
      // state.searchValue = optionItem.hLabel

      this.changeValue() // 导出value 值

      setTimeout(() => {
        state.el.oMemu.style.display = 'none'
      }, 100)
    },

    // 清空
    clear: function () {
      state.searchValue = ''
      state.selectedObj = {}
      state.el.oPlaceholder.style.display = 'block'
      state.el.oInput.style.display = 'none'
      state.el.oInputIcon.className = 'suffix-icon iconfont icon-down'

      this.changeValue() // 导出value 值
    },

    // 失焦
    blur: function () {
      // 如果selected 里面没有值,则清空input值
      if (!state.selectedObj.hValue) {
        state.searchValue = ''
      }
      setTimeout(() => {
        if (!state.searchValue && !state.selectedObj.hValue) {
          state.el.oPlaceholder.style.display = 'block'
          state.el.oInput.style.display = 'none'
        }
      }, 200)
    },

    // 导出 value
    changeValue: function () {
      const value = state.selectedObj.hValue || ''
      ctx.emit('update:modelValue', value)
    },

    // 默认选中
    _mounted: function () {
      if (props.modelValue) {
        state.el.oPlaceholder.style.display = 'none'
        state.el.oInput.style.display = 'block'
        state.selectedObj = state.menuMap[props.modelValue]
        state.searchValue = state.selectedObj.hLabel
        // console.log()
      }
    }
  }
}
export default Fn
