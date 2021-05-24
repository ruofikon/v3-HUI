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
      const _value = value.toLowerCase()
      state.menuData = state.originMenu.filter(item => {
        if (item.hLabel.toLowerCase().includes(_value)) {
        // item.hText = item.hLabel.replace(new RegExp(_value, 'g'), `<span class="h-same-text">${_value}</span>`)
        // console.log(item)
          return item
        }
      })

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
