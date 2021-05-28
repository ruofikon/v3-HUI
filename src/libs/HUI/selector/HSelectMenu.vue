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
        @click.stop="onSelected($event, item)"
      >
      <span :class="[{'selected': (item.hValue === selectedObj.hValue) || (selectedTagsValue.includes(item.hValue)) }]">
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
    // 单选选中的值
    selectedObj: {
      type: Object,
      default: () => ({})
    },
    // 多选选中的值
    selectedTagsValue: {
      type: Array,
      default: () => []
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
    const onSelected = (e, item) => {
      // e = e || window.event
      // e.preventDefault()
      ctx.emit('onSelected', item)
    }

    return {
      onSelected
    }
  }
}
</script>
