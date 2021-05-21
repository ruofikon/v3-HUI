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
    }
  }
}
export default Fn
