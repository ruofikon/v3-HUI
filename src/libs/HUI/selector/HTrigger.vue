<template>
  <div class="h-trigger">
    <!-- placeholder -->
    <div class="h-placeholder">{{placeholder}}</div>

    <!-- tigger -->
    <div class="h-trigger-tags">
      <div class="h-tags" v-if="selectedTags.length">
        <span class="h-span-tag" v-for="tag in selectedTags" :key="tag.hValue">
          <span class="h-tag-label">{{tag.hText}}</span>
          <i class="tag iconfont h-icon-close" @click.stop="closeTag(tag)"></i>
        </span>
      </div>

      <!-- input -->
      <input
        type="text"
        class="h-trigger-input"
        v-model="value"
        @input="changeInput"
        @focus="onFocus"
      />
    </div>
      <!-- @input="changeInput"
      @focus="onFocus"
      @blur="onBlur" -->

    <!-- suffix-span -->
    <span class="suffix-span">
      <i class="suffix-icon iconfont h-icon-down"></i>
    </span>
  </div>
</template>

<script>
import { toRefs, reactive, watch } from 'vue'
export default {
  name: 'HTrigger',
  props: {
    placeholder: String,

    modelValue: {
      type: String,
      default: ''
    },
    selectedTags: {
      type: Array,
      default: () => []
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
        ctx.emit('update:modelValue', state.value)
        ctx.emit('changeInput', state.value)
        state.timer = null
      }, 400)
    }

    // 聚焦的时候, 清除input值, 如果有选值则不派发更新
    const onFocus = () => {
      state.value = ''
      ctx.emit('onfocus', state.value)
    }

    // close
    const closeTag = (item) => {
      ctx.emit('closeTag', item)
    }

    return {
      ...toRefs(state),
      changeInput,
      onFocus,
      closeTag
    }
  }
}
</script>
