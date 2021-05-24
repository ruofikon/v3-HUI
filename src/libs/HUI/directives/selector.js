
// 单选
function isNotMultiple (el, ctx) {
  const oInput = el.querySelector('.h-select-input')
  // ctx.instance.el.oInput = oInput

  const oPlaceholder = el.querySelector('.h-placeholder')
  const oInputIcon = el.querySelector('.suffix-icon')
  const oMemu = el.querySelector('.h-select-menu')
  const menuDom = el.querySelector('ul.h-menu')
  ctx.instance.el = {
    oInput,
    oPlaceholder,
    oInputIcon,
    oMemu,
    menuDom
  }

  // el 点击 隐藏placeholder 显示input 聚焦
  el.addEventListener('click', function () {
    oPlaceholder.style.display = 'none'
    oInput.style.display = 'block'
    oInput.focus()
    // console.log('点击 隐藏placeholder', oInput)
    oInputIcon.className = 'suffix-icon iconfont icon-search'
    isShowMenu(oMemu, ctx.instance)
  }, false)

  // oInput 失焦的时候 显示 placeholder 和 icon
  oInput.addEventListener('blur', function () {
    setTimeout(() => {
      oMemu.style.display = 'none'
      oInputIcon.className = 'suffix-icon iconfont icon-down'
    }, 100)
  }, false)

  // oInput 聚焦的时候 显示 search-icon
  oInput.addEventListener('focus', function () {
    oInputIcon.className = 'suffix-icon iconfont icon-search'
  }, false)

  // oInput hover
  oInput.addEventListener('mouseenter', function () {
    // console.log('[鼠标移入]', oInput.value)
    if (oInput.value) {
      oInputIcon.className = 'suffix-icon iconfont icon-close'
    }
  }, false)
  // oInput hover
  oInput.addEventListener('mouseleave', function () {
    if (oInput.value) {
      // console.log('[dowm]', oInput.value)
      oInputIcon.className = 'suffix-icon iconfont icon-down'
    } else {
      oInputIcon.className = 'suffix-icon iconfont icon-search'
    }
  }, false)

  // oInputIcon hover
  oInputIcon.addEventListener('mouseenter', function () {
    if (oInput.value) {
      oInputIcon.className = 'suffix-icon iconfont icon-close'
    }
  }, false)

  // oInputIcon hover
  oInputIcon.addEventListener('mouseleave', function () {
    if (oInput.value) {
      oInputIcon.className = 'suffix-icon iconfont icon-down'
    } else {
      oInputIcon.className = 'suffix-icon iconfont icon-search'
    }
  }, false)

  // oInputIcon cilck
  oInputIcon.addEventListener('click', function (e) {
    changeIconEvent(e, this, oInput, ctx.instance)
  }, false)
}

// 多选
function multiple (el, ctx) {
  const oInput = el.querySelector('.h-trigger-input')
  const oPlaceholder = el.querySelector('.h-placeholder')
  const oInputIcon = el.querySelector('.suffix-icon')
  const oMemu = el.querySelector('.h-select-menu')
  const menuDom = el.querySelector('ul.h-menu')
  ctx.instance.el = {
    el,
    oInput,
    oPlaceholder,
    oInputIcon,
    oMemu,
    menuDom
  }
  // console.log('多选', ctx.instance)

  // el 点击 隐藏placeholder 显示input 聚焦
  el.addEventListener('click', function () {
    oPlaceholder.style.display = 'none'
    oInput.style.display = 'block'
    oInput.focus()
    oInputIcon.className = 'suffix-icon iconfont icon-search'
    isShowMenu(oMemu, ctx.instance)
  }, false)

  // input 聚焦的时候, 计算高度,重新定位下拉菜单
  oInput.addEventListener('focus', function () {
    // console.log('计算高度addEventListener', el.offsetHeight)
    oMemu.style.top = el.offsetHeight + 10 + 'px'
  }, false)

  // input 失焦的时候,关闭下拉菜单
  oInput.addEventListener('blur', function () {
    // console.log('失焦的时候,关闭下拉菜单')
    setTimeout(() => {
      ctx.instance.hiddenMenu()
    }, 100)
  }, false)
}
// 是否自动展示 menu
function isShowMenu (oMemu, instance) {
  if (instance.autoShowMenu) {
    oMemu.style.display = 'block'
  }
}

// 图标变化
function changeIconEvent (e, that, oInput, instance) {
  if (that.className.includes('icon-down')) {
    that.className = 'suffix-icon iconfont icon-search'
    oInput.focus()
  } else {
    window.event ? window.event.cancelBubble = true : e.stopPropagation()
    if (that.className.includes('icon-close')) {
      instance.clear()
      oInput.blur()
    }
  }
}

// 下拉菜单滚动
function menuScroll (el, ctx) {
  const menuDom = el.querySelector('ul.h-menu')
  let timer
  menuDom.addEventListener('scroll', function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      ctx.instance.menuScroll(this)
    }, 400)
  }, false)
}

export default {
  mounted (el, ctx) {
    // 单选
    if (!ctx.instance.multiple) {
      isNotMultiple(el, ctx)
    } else {
      // 多选
      multiple(el, ctx)
    }

    // 下拉菜单滚动
    menuScroll(el, ctx)
  }
}
