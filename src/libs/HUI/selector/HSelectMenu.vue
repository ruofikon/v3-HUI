<template>
  <div class="h-select-menu">

    <ul class="h-menu">

      <li class="empty-item" v-show="empty && !loading">
        <slot name="empty"></slot>
      </li>

      <li class="loading-item" v-show="loading">
        <slot name="loading"></slot>
      </li>
      <li class="h-menu-item"
        v-for="item in memu"
        :key="item.hValue"
        @click.stop="onSelected(item)"
      >
      <span :class="[{'selected': item.hValue === selectedObj.hValue }]">
        <slot :option="item"></slot>
      </span>
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
    },
    loading: {
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
