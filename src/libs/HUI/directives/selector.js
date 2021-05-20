export default {
  mounted (el, ctx) {
    console.log('[ctx.instance]', ctx.instance)
    const oInput = el.querySelector('.h-select-input')
    const oPlaceholder = el.querySelector('.h-placeholder')
    const oInputIcon = el.querySelector('.suffix-icon')
    const oMemu = el.querySelector('.h-select-menu')

    // 将节点信息存储到 selector
    ctx.instance.el = {
      oInput,
      oPlaceholder,
      oInputIcon,
      oMemu
    }
    // el 点击 隐藏placeholder 显示input 聚焦
    el.addEventListener('click', function () {
      oPlaceholder.style.display = 'none'
      oInput.style.display = 'block'
      oInput.focus()

      isShowMenu()
    }, false)

    // oInput 失焦的时候 显示 placeholder 和 icon
    oInput.addEventListener('blur', function () {
      setTimeout(() => {
        oInput.style.display = 'none'
        oMemu.style.display = 'none'
        oPlaceholder.style.display = 'block'
        oInputIcon.className = 'suffix-icon iconfont icon-down'
      }, 200)
    }, false)

    // oInput 聚焦的时候 显示 search-icon
    oInput.addEventListener('focus', function () {
      oInputIcon.className = 'suffix-icon iconfont icon-search'
    }, false)

    // 开始搜索的时候
    ctx.instance.$watch(() => ctx.instance.searchValue, newValue => {
      console.log('[newValue - focus]', newValue)
      if (newValue) {
        oMemu.style.display = 'block'
      }
    })

    // 是否自动展示 menu
    function isShowMenu () {
      if (ctx.instance.autoShowMenu) {
        oMemu.style.display = 'block'
      }
    }
  }
}
