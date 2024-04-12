<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import AppleFonts from '@/data/apple-fonts.json'

const block = ref(null)
const base = ref(null)

let titleBaseline = 0
const search = ref('Noto Sans KR')
const fontInfo = reactive({
  name: 'Noto Sans KR',
  size: 15
})
const baselineOffset = computed(() => {
  if (!block.value) return
  return getBaselineOffset(fontInfo.size)
})
const getBaselineOffset = (size) => {
  block.value.style.fontFamily = fontInfo.name
  block.value.style.fontSize = size + 'px'
  return size - (base.value.offsetTop - block.value.offsetTop)
}

const applyFont = () => {
  fontInfo.name = search.value
  titleBaseline = getBaselineOffset(100)
}

const MIN_SIZE = 12
const MAX_SIZE = 72

const initeW = ref(0)
const handlePos = ref(0)
const slider = ref(null)
const result = ref(null)
const resultValue = ref(0)
const controlStart = ({ target: control, pageX: initeX }) => {
  if (control.classList.contains('size-handle')) {
    handlePos.value = initeX
    initeW.value = result.value.offsetWidth
  } else {
    console.log(control)
    resultValue.value = updatePos(initeX - handlePos.value)
  }
  window.addEventListener('mousemove', changeValue)
  window.addEventListener('mouseup', controlEnd)
  window.addEventListener('touchend', controlEnd)
}

const changeValue = ({ pageX }) => {
  let move = pageX - handlePos.value
  resultValue.value = updatePos(move)
  fontInfo.size = convertedSize()
}

const updatePos = (distance) => {
  const offset = initeW.value + distance
  return offset < 0 ? 0 : offset > 300 ? 300 : offset
}

const controlEnd = () => {
  fontInfo.size = convertedSize()
  window.removeEventListener('mousemove', changeValue)
  window.removeEventListener('mouseup', controlEnd)
  window.removeEventListener('touchend', controlEnd)
}

const convertedSize = () => {
  return (
    Math.round(resultValue.value / (slider.value.offsetWidth / (MAX_SIZE - MIN_SIZE))) + MIN_SIZE
  )
}

const findPosToSize = (size) => {
  return (size - MIN_SIZE) * (slider.value.offsetWidth / (MAX_SIZE - MIN_SIZE))
}

const searchedList = computed(() => {
  if (search.value === '') return []
  return AppleFonts.filter((item) => item.fontName.indexOf(search.value) === 0)
})

onMounted(() => {
  if (block.value) {
    titleBaseline = getBaselineOffset(100)
  }
  handlePos.value = slider.value.getBoundingClientRect().x
  resultValue.value = findPosToSize(15)
})
</script>

<template>
  <div class="block" ref="block" :style="{ fontFamily: fontInfo.name }">
    Lqfglx<span ref="base"></span>
  </div>
  <div class="font-controller">
    <div class="insert-font ga-input button right">
      <input type="text" v-model="search" @keydown.enter.prevent="applyFont" />
      <div class="ga-button icon" @click="applyFont">
        <i class="icon fa fa-text"></i>
      </div>
    </div>
    <div class="set-size-range" ref="slider" @mousedown="controlStart" @touchstart="controlStart">
      <div class="size-result primary" ref="result" :style="{ width: `${resultValue}px` }"></div>
      <div
        class="size-handle ga-button icon tiny"
        :style="{ left: `${resultValue}px` }"
        @click="fontInfo.size++"
      >
        {{ fontInfo.size }}
      </div>
    </div>
  </div>
  <div class="font-info-wrapper">
    <div class="font-info-title">
      <span class="ga-tag label blue bold">Font Name</span>
      <span class="font-name">{{ fontInfo.name }}</span>
    </div>
    <div class="main-font-sample">
      <div class="area ghost">AaBb 가나다</div>
      <div
        class="area"
        :style="{ fontFamily: fontInfo.name, '--bl': titleBaseline + 'px' }"
        @click="saveFont"
      >
        AaBb 가나다
        <span></span>
      </div>
    </div>
    <div class="baseline-ratio">
      <span class="bold">Baseline Ratio:</span> {{ baselineOffset }}px / {{ fontInfo.size }}px ({{
        Math.round((baselineOffset / fontInfo.size) * 100) / 100
      }})
    </div>
    <div class="sample" :style="{ fontFamily: fontInfo.name }">
      <p>가나다라마바사아자차카타파하</p>
      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>1234567890)!@#$%^&*(</p>
    </div>
  </div>
  <div
    class="prev-font-weight about"
    :style="{ fontFamily: fontInfo.name, fontSize: fontInfo.size + 'px' }"
  >
    <div v-for="num in 9" :class="`weight-${num}00`" :key="num">
      {{ fontInfo.name }} weight: {{ num }}00
    </div>
  </div>
  <div class="font-list">
    <div
      class="font-item ga-tag label"
      v-for="font in searchedList"
      :key="font.fontName"
      @click="search = font.fontName"
    >
      {{ font.fontName }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.block {
  visibility: hidden;
  line-height: 1;
  position: fixed;
  top: 0;
  right: 0;
  span {
    font-size: 0;
    vertical-align: baseline;
    padding: 0 10px;
  }
}

.font-controller {
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  .set-size-range {
    cursor: pointer;
    position: relative;
    width: 300px;
    background-color: var(--color-border);
    height: 5px;
    border-radius: 5px;
    margin: 1em 0;
    .size-handle {
      cursor: grab;
      position: absolute;
      font-size: 12px;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
      padding: 10px;
      &:hover {
        border-radius: 50%;
        font-weight: bold;
        color: var(--color-text);
      }
    }
    .size-result {
      width: 0;
      height: 100%;
    }
  }
}
.font-info-wrapper {
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  .font-info-title {
    margin: 0 0 20px;
    .font-name {
      display: block;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
.sample {
  font-size: 24px;
  letter-spacing: 1px;
}
.main-font-sample {
  position: relative;
  margin-bottom: 20px;
}
.area {
  --bl: 0;
  font-size: 100px;
  display: inline-block;
  line-height: 1;
  background-color: var(--color-border);
  margin: 0;
  padding: 0;
  position: relative;
  outline: none;
  text-shadow: 0px 0px 1px var(--color-text);
  span {
    position: absolute;
    width: 100%;
    background-color: red;
    left: 0;
    bottom: 0;
    height: var(--bl);
    opacity: 0.16;
  }
  &:focus {
    border: 1px solid var(--color-border);
    background-color: transparent;
    span {
      display: none;
    }
  }
  &.ghost {
    // font-size: 100px;
    // line-height: 1;
    position: absolute;
    z-index: 10;
    background-color: transparent;
    top: 0;
    left: 0;
    color: gray;
    opacity: 0;
    &:hover {
      opacity: 0.3;
    }
  }
}
.prev-font-weight {
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
}
.about {
  .weight-100 {
    font-weight: 100;
  }
  .weight-200 {
    font-weight: 200;
  }
  .weight-300,
  .light {
    font-weight: 300;
  }
  .weight-400 {
    font-weight: 400;
  }
  .weight-500 {
    font-weight: 500;
  }
  .weight-600 {
    font-weight: 600;
  }
  .weight-700,
  .bold {
    font-weight: 700;
  }
  .weight-800 {
    font-weight: 800;
  }
  .weight-900 {
    font-weight: 900;
  }
}
.font-list {
  padding: 20px;
}
</style>
