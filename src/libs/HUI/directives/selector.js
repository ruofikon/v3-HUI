
// 单选
function isNotMultiple (el, ctx) {
  const oInput = el.querySelector('.h-select-input')
  // ctx.instance.el.oInput = oInput

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
  const options = { ...ctx.instance.el, instance: ctx.instance }

  // oInput 失焦的时候 显示 placeholder 和 icon
  oInput.addEventListener('blur', function () {
    setTimeout(() => {
      oMemu.style.display = 'none'
      oInputIcon.className = 'suffix-icon iconfont h-icon-down'
    }, 100)
  }, false)

  // oInput 聚焦的时候 显示 search-icon
  oInput.addEventListener('focus', function () {
    oInputIcon.className = 'suffix-icon iconfont h-icon-search'
  }, false)

  elMouseEvent(options)

  // icon hover事件
  oInputIconMouseEvent(options)
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
  const options = { ...ctx.instance.el, instance: ctx.instance }
  // console.log('多选', ctx.instance)

  // input 聚焦的时候
  oInput.addEventListener('focus', function () {
  }, false)

  // input 失焦的时候 调用失焦方法
  oInput.addEventListener('blur', function () {
    ctx.instance.onblur()
  }, false)

  // 监听 下拉区域之外的点击事件 隐藏下拉框 隐藏 input
  document.addEventListener('click', function () {
    // console.log('下拉区域之外的点击事件')
    oMemu.style.display = 'none'
    oInput.style.display = 'none'
    oInputIcon.className = 'suffix-icon iconfont h-icon-down'
    oInput.value = ''
    if (ctx.instance.multiple) {
      !ctx.instance.selectedTagsValue.length && (oPlaceholder.style.display = 'block')
    } else {

    }
  }, false)

  elMouseEvent(options)

  // icon hover事件
  oInputIconMouseEvent(options)
}
// 是否自动展示 menu
function isShowMenu (oMemu, instance) {
  if (instance.autoShowMenu) {
    oMemu.style.display = 'block'
  }
}

// el hover 事件

function elMouseEvent (options) {
  // el 点击 隐藏placeholder 显示input 聚焦
  options.el.addEventListener('click', function () {
    // 先将其他下拉框隐藏,再打开自己的
    const otherMenuDrop = document.querySelectorAll('.h-select-menu')
    for (let i = 0; i < otherMenuDrop.length; i++) {
      otherMenuDrop[i].style.display = 'none'
    }

    options.oPlaceholder.style.display = 'none'
    options.oInput.style.display = 'block'
    options.oInput.focus()
    options.oInputIcon.className = 'suffix-icon iconfont h-icon-search'
    isShowMenu(options.oMemu, options.instance)
  }, false)

  // el hover
  options.el.addEventListener('mouseenter', function () {
    // 单选且有值
    const _one = !options.instance.multiple && options.oInput.value
    // 多选且有值
    const _multiple = options.instance.multiple && options.instance.selectedTagsValue.length
    if (_one) {
      options.oInputIcon.className = 'suffix-icon iconfont h-icon-close'
    } else if (_multiple) {
      options.oInputIcon.className = 'suffix-icon iconfont h-icon-close'
    }
  }, false)

  options.el.addEventListener('mouseleave', function () {
    // 单选且有值
    const _one = !options.instance.multiple && options.oInput.value
    // 多选且有值
    const _multiple = options.instance.multiple && options.instance.selectedTagsValue.length
    if (_one) {
      options.oInputIcon.className = 'suffix-icon iconfont h-icon-down'
    } else if (_multiple) {
      options.oInputIcon.className = 'suffix-icon iconfont h-icon-close'
      if (options.oInput.style.display === 'none') {
        options.oInputIcon.className = 'suffix-icon iconfont h-icon-down'
      }
    }
  }, false)
}

// 图标 hover 事件
function oInputIconMouseEvent (options) {
  // oInputIcon hover
  options.oInputIcon.addEventListener('mouseenter', function () {
    // 单选且有值
    const _one = !options.instance.multiple && options.oInput.value
    // 多选且有值
    const _multiple = options.instance.multiple && options.instance.selectedTagsValue.length
    if (_one) {
      options.oInputIcon.className = 'suffix-icon iconfont h-icon-close'
    } else if (_multiple) {
      options.oInputIcon.className = 'suffix-icon iconfont h-icon-close'
    }
  }, false)

  // oInputIcon hover
  options.oInputIcon.addEventListener('mouseleave', function () {
    // 单选且有值
    const _one = !options.instance.multiple && options.oInput.value
    // 多选且有值
    const _multiple = options.instance.multiple && options.instance.selectedTagsValue.length
    if (_one) {
      options.oInputIcon.className = 'suffix-icon iconfont h-icon-down'
    } else if (_multiple) {
      options.oInputIcon.className = 'suffix-icon iconfont h-icon-close'
      if (options.oInput.style.display === 'none') {
        options.oInputIcon.className = 'suffix-icon iconfont h-icon-down'
      }
    }
  }, false)

  // oInputIcon cilck
  options.oInputIcon.addEventListener('click', function (e) {
    changeIconEvent(e, this, options)
  }, false)
}

// 图标变化
function changeIconEvent (e, that, options) {
  if (that.className.includes('h-icon-down')) {
    that.className = 'suffix-icon iconfont h-icon-search'
    options.oInput.focus()
  } else {
    // window.event ? window.event.cancelBubble = true : e.stopPropagation()
    if (that.className.includes('h-icon-close')) {
      options.instance.clear()
      that.className = 'suffix-icon iconfont h-icon-down'
      options.oInput.style.display = 'none'
      options.oPlaceholder.style.display = 'block'
      options.oMemu.style.display = 'none'
    } else if (that.className.includes('h-icon-search')) {
      // 调用搜索方法
      // console.log(oInput.value)
      options.instance.changeInput(options.oInput.value)
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
