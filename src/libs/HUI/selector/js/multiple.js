function Fn (state, props, ctx) {
  return {

    // 选中 导出value 值
    selected: function (optionItem) {
      // console.log('這是多选选中', optionItem)
      // 先判断是否已经选择, 如果已有则删除
      if (state.selectedTagsValue.includes(optionItem.hValue)) {
        this.addOrDelTags({ type: 'del', tagItem: optionItem })
        return
      }
      // 否则新增 将选中项放到 tags
      this.addOrDelTags({ type: 'add', tagItem: optionItem })

      // 清空input值
      state.searchValue = ''
      // 导出 value 值
      this.changeValue()

      // 如果自动展开下拉菜单则不关闭 否则延迟关闭下来菜单,避免拿不到值
      if (props.autoShowMenu) {
        state.el.oInput.focus()
        state.el.oMemu.style.display = 'block'
        // setTimeout(() => {
        //   // input聚焦不变
        // }, 150)
      } else {
        setTimeout(() => {
          state.el.oMemu.style.display = 'none'
        }, 150)
      }
    },

    // 计算selector 高度,
    renderHeight: function () {
      // console.log('计算高度renderHeight =>', state.el.el.offsetHeight)
      state.el.oMemu.style.top = state.el.el.offsetHeight + 10 + 'px'
    },

    // 清空
    clear: function () {
      // // 清除input值 选中对象
      // state.searchValue = ''
      // state.selectedObj = {}

      // // 展示placeholder 下来icon 隐藏input
      // state.el.oPlaceholder.style.display = 'block'
      // state.el.oInput.style.display = 'none'
      // state.el.oInputIcon.className = 'suffix-icon iconfont icon-down'

      // // 导出value 值
      // this.changeValue()
    },

    // 失焦
    blur: function () {
      // // 如果selected 里面没有值,则清空input值
      // if (!state.selectedObj.hValue) {
      //   state.searchValue = ''
      // }

      // // 延迟 避免选中失焦时拿不到值
      // setTimeout(() => {
      //   // 如果input没有值 并且之前未选中 则显示placeholder
      //   if (!state.searchValue && !state.selectedObj.hValue) {
      //     state.el.oPlaceholder.style.display = 'block'
      //     state.el.oInput.style.display = 'none'
      //   }
      // }, 200)
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

        if (!props.autoShowMenu) {
          state.el.oMemu.style.display = 'none'
        }
      } else {
        // console.log('[删除 tag]')
        state.selectedTags = state.selectedTags.filter(item => item.hValue !== options.tagItem.hValue)
        state.selectedTagsValue = state.selectedTagsValue.filter(value => value !== options.tagItem.hValue)

        // 重新计算高度
        setTimeout(() => {
          this.renderHeight()
          state.el.oMemu.style.display = 'none'
          state.el.oInput.style.display = 'none'
        }, 150)
      }
    },

    // 对外导出 value
    changeValue: function () {
      // const value = state.selectedObj.hValue || ''
      // ctx.emit('update:modelValue', value)
    },

    // 默认选中
    _mounted: function () {
      if (props.modelValue) {

      }
    }
  }
}
export default Fn
