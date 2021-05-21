<template>
  <div class="h-select-menu">
    <ul class="h-menu">
      <li class="empty-item" v-show="empty">无数据</li>
      <li class="h-menu-item"
        v-for="item in memu"
        :key="item.hValue"
        @click.stop="onSelected(item)"
      >
      <span :class="[{'selected': item.hValue === selectedObj.hValue }]">{{ item.hText }}</span>
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
    },
    // 选中的值
    selectedObj: {
      type: Object,
      default: () => ({})
    },
    empty: {
      typeof: Boolean,
      default: false
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
    padding: 6px 0;
    overflow: hidden;
    border: 1px solid $border-color;
    border-radius: 4px;
    background-color: #fff;
    z-index: 9999;
    box-shadow: 0 0px 1px 0;

  }

  .h-menu {
    height: 100%;
    max-height: 300px;
    // padding: 5px 0;
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
    padding: 4px 0 4px 10px;
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
    background-color: #f3f3f3;
  }

  .selected {
    color: $theme-color;
    font-weight: 700;
  }

  .empty-item {
    padding: 10px 0;
    text-align: center;
  }
</style>
