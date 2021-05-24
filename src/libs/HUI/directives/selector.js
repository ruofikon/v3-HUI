let _vNode, instance

function isNotMuitiple (el, ctx) {
  const oInput = el.querySelector('.h-select-input')
  ctx.instance.el.oInput = oInput
  _vNode = ctx.instance.el
  instance = ctx.instance

  // el 点击 隐藏placeholder 显示input 聚焦
  el.addEventListener('click', function () {
    _vNode.oPlaceholder.style.display = 'none'
    _vNode.oInput.style.display = 'block'
    _vNode.oInput.focus()
    _vNode.oInputIcon.className = 'suffix-icon iconfont icon-search'
    isShowMenu()
  }, false)

  // oInput 失焦的时候 显示 placeholder 和 icon
  _vNode.oInput.addEventListener('blur', function () {
    setTimeout(() => {
      _vNode.oMemu.style.display = 'none'
      _vNode.oInputIcon.className = 'suffix-icon iconfont icon-down'
    }, 100)
  }, false)

  // oInput 聚焦的时候 显示 search-icon
  _vNode.oInput.addEventListener('focus', function () {
    _vNode.oInputIcon.className = 'suffix-icon iconfont icon-search'
  }, false)

  // oInput hover
  _vNode.oInput.addEventListener('mouseenter', function () {
    // console.log('[鼠标移入]', _vNode.oInput.value)
    if (_vNode.oInput.value) {
      _vNode.oInputIcon.className = 'suffix-icon iconfont icon-close'
    }
  }, false)
  // oInput hover
  _vNode.oInput.addEventListener('mouseleave', function () {
    if (_vNode.oInput.value) {
      // console.log('[dowm]', _vNode.oInput.value)
      _vNode.oInputIcon.className = 'suffix-icon iconfont icon-down'
    } else {
      _vNode.oInputIcon.className = 'suffix-icon iconfont icon-search'
    }
  }, false)

  // oInputIcon hover
  _vNode.oInputIcon.addEventListener('mouseenter', function () {
    if (_vNode.oInput.value) {
      _vNode.oInputIcon.className = 'suffix-icon iconfont icon-close'
    }
  }, false)

  // oInputIcon hover
  _vNode.oInputIcon.addEventListener('mouseleave', function () {
    if (_vNode.oInput.value) {
      _vNode.oInputIcon.className = 'suffix-icon iconfont icon-down'
    } else {
      _vNode.oInputIcon.className = 'suffix-icon iconfont icon-search'
    }
  }, false)

  // oInputIcon cilck
  _vNode.oInputIcon.addEventListener('click', function (e) {
    changeIconEvent(e, this.className)
  }, false)
}
// 是否自动展示 menu
function isShowMenu () {
  if (instance.autoShowMenu) {
    _vNode.oMemu.style.display = 'block'
  }
}

// 图标变化
function changeIconEvent (e, className) {
  if (className.includes('icon-down')) {
    _vNode.oInputIcon.className = 'suffix-icon iconfont icon-search'
    _vNode.oInput.focus()
  } else {
    window.event ? window.event.cancelBubble = true : e.stopPropagation()
    if (className.includes('icon-close')) {
      instance.clear()
      _vNode.oInput.blur()
    }
  }
}

// 下拉菜单滚动
function menuScroll (params) {
  let timer
  _vNode.menuDom.addEventListener('scroll', function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      instance.menuScroll(this)
    }, 400)
  }, false)
}

export default {
  mounted (el, ctx) {
    // console.log('[el]', el)
    // console.log('[instance]', instance)
    // const oInput = el.querySelector('.h-select-input')
    const oPlaceholder = el.querySelector('.h-placeholder')
    const oInputIcon = el.querySelector('.suffix-icon')
    const oMemu = el.querySelector('.h-select-menu')
    const menuDom = el.querySelector('ul.h-menu')

    // 将节点信息存储到 selector
    ctx.instance.el = {
      // oInput,
      oPlaceholder,
      oInputIcon,
      oMemu,
      menuDom
    }

    // 单选
    if (!ctx.instance.multiple) {
      isNotMuitiple(el, ctx)
    } else {

    }

    // 下拉菜单滚动
    menuScroll(el, ctx)
  }
}
