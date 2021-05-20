export default {
  mounted (el, ctx) {
    console.log('[el]', el)
    // console.log('[ctx.instance]', ctx.instance)
    const oInput = el.querySelector('.h-select-input')
    const oPlaceholder = el.querySelector('.h-placeholder')
    const oSelected = el.querySelector('.h-selected')
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
        oSelected.style.display = 'block'
        selectOne() // 选中时
        oInputIcon.className = 'suffix-icon iconfont icon-down'
      }, 100)
    }, false)

    // oInput 聚焦的时候 显示 search-icon
    oInput.addEventListener('focus', function () {
      oSelected.style.display = 'none'
      oInputIcon.className = 'suffix-icon iconfont icon-search'
    }, false)

    // 是否自动展示 menu
    function isShowMenu () {
      if (ctx.instance.autoShowMenu) {
        oMemu.style.display = 'block'
      }
    }

    // 如果是单选
    function selectOne () {
      const multiple = ctx.instance.multiple
      const value = ctx.instance.selectedValue
      // if 单选
      if (!multiple) {
        oMemu.style.display = 'none'
        oInput.style.display = 'none'
        // 选中时
        if (value) {
          oPlaceholder.style.display = 'none'
        } else {
          // 没选择
          oPlaceholder.style.display = 'block'
        }
      }
    }
  }
}
