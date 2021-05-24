function Fn (state, props, ctx) {
  return {

    // 选中 导出value 值
    selected: function (optionItem) {
      // 先判断是否已经选择, 如果已有则删除
      if (state.selectedTagsValue.includes(optionItem.hValue)) {
        this.addOrDelTags({ type: 'del', tagItem: optionItem })
        return
      }
      // 否则新增 将选中项放到 tags
      this.addOrDelTags({ type: 'add', tagItem: optionItem })

      // 清空input值
      state.searchValue = ''
      state.el.oInput.value = ''
      // 导出 value 值
      this.changeValue()

      // 如果自动展开下拉菜单则不关闭 否则延迟关闭下来菜单,避免拿不到值
      state.el.oInput.focus()
      if (props.autoShowMenu) {
        setTimeout(() => {
          state.el.oMemu.style.display = 'block'
        }, 150)
      } else {
        setTimeout(() => {
          state.el.oMemu.style.display = 'none'
        }, 150)
      }
    },

    // 计算selector 高度,
    renderHeight: function () {
    },

    // 清空
    clear: function () {
      state.selectedTags = []
      state.selectedTagsValue = []
      this.changeValue()
    },

    // 失焦
    blur: function () {

    },

    /**
     * 处理选中和取消选择
     * @param {*} options
     * @param {*} options.type add & del
     * @param {*} options.tagItem 选择项或删除项
     */
    addOrDelTags: function (options) {
      if (options.type === 'add') {
        state.selectedTags.push(options.tagItem)
        state.selectedTagsValue.push(options.tagItem.hValue)
        state.el.oInputIcon.className = 'suffix-icon iconfont icon-close'

        if (!props.autoShowMenu) {
          state.el.oMemu.style.display = 'none'
        }
      } else {
        // console.log('[删除 tag]')
        state.selectedTags = state.selectedTags.filter(item => item.hValue !== options.tagItem.hValue)
        state.selectedTagsValue = state.selectedTagsValue.filter(value => value !== options.tagItem.hValue)

        // 如果清空了 icon变化， placeholder显示
        const len = state.selectedTagsValue.length
        if (!len) {
          state.el.oInputIcon.className = 'suffix-icon iconfont icon-down'
        }

        setTimeout(() => {
          state.el.oMemu.style.display = 'none'
          state.el.oInput.style.display = 'none'
          !len && (state.el.oPlaceholder.style.display = 'block')
        }, 150)
      }
    },

    // 对外导出 value
    changeValue: function () {
      const value = state.selectedTagsValue || []
      // console.log('[对外导出]', value)
      ctx.emit('update:modelValue', value)
    },

    // 默认选中
    _mounted: function () {
      if (props.modelValue) {

      }
    }
  }
}
export default Fn
