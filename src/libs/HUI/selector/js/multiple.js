function Fn (state, props, ctx) {
  return {

    // 选中 导出value 值
    selected: function (optionItem) {
      // 先判断是否已经选择, 如果已有则删除
      if (state.selectedTagsValue.includes(optionItem.hValue)) {
        this.addOrDelTags({ type: 'del', tagItem: optionItem, showMenu: true })
        ctx.emit('selected', optionItem, state.selectedTags)
        return
      }
      // 否则新增 将选中项放到 tags
      this.addOrDelTags({ type: 'add', tagItem: optionItem })
      ctx.emit('selected', optionItem, state.selectedTags)
      // 清空input值
      state.searchValue = ''
      state.el.oInput.value = ''

      // 如果自动展开下拉菜单则不关闭 否则延迟关闭下来菜单,避免拿不到值
      state.el.oInput.focus()
      if (props.autoShowMenu) {
        setTimeout(() => {
          state.el.oMemu.style.display = 'block'
        }, 200)
      } else {
        setTimeout(() => {
          state.el.oMemu.style.display = 'none'
        }, 200)
      }
    },

    // 清空
    clear: function () {
      state.selectedTags = []
      state.selectedTagsValue = []
      this.changeValue()
    },

    // 失焦
    blur: function () {
      ctx.emit('onBlur')
    },

    /**
     * 处理选中和取消选择
     * @param {*} options
     * @param {*} options.type add & del
     * @param {*} options.tagItem 选择项或删除项
     * @param {*} options.showMenu 删除的时候是否隐藏下拉菜单
     */
    addOrDelTags: function (options) {
      if (options.type === 'add') {
        // 如果value有重复的,则用后面覆盖前面
        state.selectedTags = state.selectedTags.map(item => {
          if (item.hValue === options.hValue) {
            item = options
          }
          return item
        })

        state.selectedTags.push(options.tagItem)
        state.selectedTagsValue.push(options.tagItem.hValue)
        state.el.oInputIcon.className = 'suffix-icon iconfont h-icon-close'

        // 导出 value 值
        this.changeValue()

        if (!props.autoShowMenu) {
          state.el.oMemu.style.display = 'none'
        }
      } else {
        // console.log('[删除 tag]')
        state.selectedTags = state.selectedTags.filter(item => item.hValue !== options.tagItem.hValue)
        state.selectedTagsValue = state.selectedTagsValue.filter(value => value !== options.tagItem.hValue)

        // 导出 value 值
        this.changeValue()

        // 如果清空了 icon变化，
        const len = state.selectedTagsValue.length
        if (!len) {
          state.el.oInputIcon.className = 'suffix-icon iconfont h-icon-down'
        }

        setTimeout(() => {
          if (!options.showMenu) {
            state.el.oMemu.style.display = 'none'
            state.el.oInput.style.display = 'none'
            // placeholder显示
            !len && (state.el.oPlaceholder.style.display = 'block')
          } else {
            state.el.oInput.focus()
            // state.el.oPlaceholder.style.display = 'none'
          }
        }, 200)
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
      // 多选传入的必须是数组, 如果有则渲染
      const isLen = Array.isArray(props.modelValue) && props.modelValue.length
      if (isLen) {
        const selectedArr = props.modelValue
        // 隐藏placeholder
        state.el.oPlaceholder.style.display = 'none'

        // 将选中的勾选上 -- 多选
        if (props.multiple) {
          const selectedLabel = []
          selectedArr.forEach(item => {
            const isHave = state.menuMap[item]
            if (isHave) {
              selectedLabel.push(isHave)
            } else {
              // 如果找不到，则让 value作为key和值传入
              const obj = { hValue: item, hLabel: item, hText: item }
              obj[props.defaultPorp.value] = item
              obj[props.defaultPorp.label] = item
              selectedLabel.push(obj)
            }
          })

          state.selectedTags = selectedLabel
          state.selectedTagsValue = selectedArr
        }
      }
    }
  }
}
export default Fn
