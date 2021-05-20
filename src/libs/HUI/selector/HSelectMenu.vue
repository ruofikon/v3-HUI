<template>
  <div class="h-select-menu">
    <ul class="h-menu">
      <li class="h-menu-item"
        v-for="item in memu"
        :key="item.hValue"
        @click="onSelected(item)"
        v-html="item.hText"
      >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HSelectMenu',
  props: {
    // 数据
    memu: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ctx) {
    const onSelected = (item) => {
      ctx.emit('onSelected', item)
    }

    return {
      onSelected
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../theme-color.scss';

  .h-select-menu {
    display: none;
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    overflow: hidden;
    border: 1px solid $border-color;
    border-radius: 4px;
    background-color: #fff;
    z-index: 9999;
  }

  .h-menu {
    height: 100%;
    max-height: 200px;
    padding: 5px 0;
    overflow-y: auto;
  }

    /* 滚动条样式 */
  .h-menu::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /*定义滑块 内阴影+圆角*/
  .h-menu::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #e9e9e9;
  }

  .h-menu-item {
    padding: 2px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    transition: background-color .2s;
    -webkit-transition: background-color .2s;
    -o-transition: background-color .2s;
    -moz-transition: background-color .2s;
  }
  .h-menu-item:hover {
    background-color: #e9e9e9;
  }
</style>
