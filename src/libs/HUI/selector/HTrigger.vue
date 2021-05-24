<template>
  <div class="h-trigger">
    <!-- placeholder -->
    <div class="h-placeholder">{{placeholder}}</div>

    <!-- input -->
    <input
      type="text"
      class="h-select-input"
      v-model="value"
    />
      <!-- @input="changeInput"
      @focus="onFocus"
      @blur="onBlur" -->

    <!-- suffix-span -->
    <span class="suffix-span">
      <i class="suffix-icon iconfont icon-down"></i>
    </span>
  </div>
</template>

<script>
import { toRefs, reactive, watch } from 'vue'
export default {
  name: 'HTrigger',
  props: {
    placeholder: String,
    selectedObj: {
      type: Object,
      default: () => ({})
    },
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

    watch(() => props.modelValue, newVal => {
      if (newVal !== state.value) {
        state.value = newVal
      }
    })

    const changeInput = (e) => {
      // ctx.emit('changeInput')
      if (state.timer) {
        clearTimeout(state.timer)
      }
      state.timer = setTimeout(() => {
        // ctx.emit('update:modelValue', value)
        ctx.emit('changeInput', state.value)
        state.timer = null
      }, 400)
    }

    // 聚焦的时候, 清除input值, 如果有选值则不派发更新
    const onFocus = () => {
      // console.log('[聚焦]', props.selectedObj)
      state.value = []
      ctx.emit('onfocus', state.value)
    }

    // 失焦的时候, 如果有记录的选值就赋值
    const onBlur = () => {
      setTimeout(() => {
        // if (props.selectedObj.hLabel) {
        //   state.value = props.selectedObj.hLabel
        // }
      }, 150)

      ctx.emit('onblur')
    }

    return {
      ...toRefs(state),
      changeInput,
      onFocus,
      onBlur
    }
  }
}
</script>
