function Fn (state, props, ctx) {
  return {
    search: function (value) {
      // console.log('[筛选]', value)

      if (!value) {
        setTimeout(() => {
          state.menuData = state.originMenu
        }, 200)
        return
      }
      // 大小写转换
      const _value = value.toLowerCase()
      // 过滤筛选
      state.menuData = state.originMenu.filter(item => {
        if (item.hLabel.toLowerCase().includes(_value)) {
          return item
        }
      })
      // 判断结构是否是空数组 刷新 empty 状态
      state.isEmpty = Boolean(!state.menuData.length)
    },

    searchHistory: function (query) {
      // console.log('[history 参数]', query)
      // console.log('则记录历史搜索记录', state.historyMap)
      const data = state.historyMap[query]
      // console.log('[ history data ]', data)

      // 如果能查到历史 key
      if (data) {
        state.originMenu = data
        state.menuData = state.originMenu
        state.isEmpty = !(state.menuData.length > 0)
        state.el.oMemu.style.display = 'block'
      }

      // console.log(Boolean(data))

      return Boolean(data)
    }
  }
}
export default Fn
