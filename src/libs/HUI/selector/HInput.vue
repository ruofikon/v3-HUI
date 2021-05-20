<template>
  <div class="h-input">
    <!-- placeholder -->
    <div class="h-placeholder">{{placeholder}}</div>

    <!-- input -->
    <input
      type="text"
      class="h-select-input"
      v-model="value"
    />

    <!-- suffix-span -->
    <span class="suffix-span">
      <i class="suffix-icon iconfont icon-down"></i>
    </span>

  </div>
</template>

<script>
import { toRefs, reactive, watch } from 'vue'
export default {
  name: 'HInput',
  props: {
    placeholder: String,
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    const state = reactive({
      value: '',
      timer: null
    })

    watch(() => state.value, newVal => {
      // ctx.emit('update:modelValue', newVal)
      changeValue(newVal)
    })

    watch(() => props.modelValue, newVal => {
      if (newVal !== state.value) {
        state.value = newVal
      }
    })

    // 派发 value 给select 加上防抖
    const changeValue = (value) => {
      if (state.timer) {
        clearTimeout(state.timer)
      }
      state.timer = setTimeout(() => {
        ctx.emit('update:modelValue', value)
        state.timer = null
      }, 400)
    }

    return {
      ...toRefs(state),
      changeValue
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../theme-color.scss';

  .h-input {
    display: flex;
    position: relative;
    height: 40px;
    padding: 0 30px 0 15px;
    // align-items: center;
    line-height: 40px;
    width: 100%;
  }

  .h-placeholder {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $placeholder-color;
  }

  .h-select-input {
    display: none;
    min-width: 60px;
    color: $text-color;
  }

  .suffix-span {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 100%;
    text-align: center;
  }
</style>
