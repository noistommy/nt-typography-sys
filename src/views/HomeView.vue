<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

let titleBaseline = 0

const block = ref(null)
const base = ref(null)

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
  block.value.style.fontSize = size + 'px'
  return size - (base.value.offsetTop - block.value.offsetTop)
}

const applyFont = () => {
  console.log(search.value)
  fontInfo.name = search.value
  titleBaseline = getBaselineOffset(60)
}

onMounted(() => {
  if (block.value) {
    titleBaseline = getBaselineOffset(60)
  }
})
</script>

<template>
  <div class="insert-font ga-input">
    <input type="text" v-model="search" @keydown.enter.prevent="applyFont" />
  </div>
  <div class="ga-button" @click="fontInfo.size++">{{ fontInfo.size }}</div>
  <div class="ga-button">{{ baselineOffset }}</div>
  <div class="block" ref="block" :style="{ fontFamily: fontInfo.name }">
    Lqfglx<span ref="base"></span>
  </div>
  <div class="font-info-wrapper">
    <div
      class="area"
      :style="{ fontFamily: fontInfo.name, '--bl': titleBaseline + 'px' }"
      @click="saveFont"
    >
      {{ fontInfo.name }}
      <span></span>
    </div>
    <div class="baseline-ratio">Baseline Ratio: {{ baselineOffset }}px / {{ fontInfo.size }}px</div>
    <div class="alphabet" :style="{ fontFamily: fontInfo.name }">
      <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
      <p>abcdefghijklmnopqrstuvwxyz</p>
      <p>1234567890</p>
    </div>
  </div>
  <div class="about" :style="{ fontFamily: fontInfo.name, fontSize: fontInfo.size + 'px' }">
    <div v-for="num in 9" :class="`weight-${num}00`" :key="num">
      {{ fontInfo.name }} weight: {{ num }}00
    </div>
  </div>
</template>
<style lang="scss" scoped>
.block {
  visibility: hidden;
  line-height: 1;
  position: fixed;
  top: 0;
  span {
    font-size: 0;
    vertical-align: baseline;
    padding: 0 10px;
  }
}
alphabet {
  line-height: 1;
  font-size: 24px;
  letter-spacing: 1px;
}
.area {
  --bl: 0;
  font-size: 60px;
  display: inline-block;
  line-height: 1;
  background-color: var(--color-border);
  margin: 0;
  padding: 0;
  position: relative;
  span {
    position: absolute;
    width: 100%;
    background-color: red;
    left: 0;
    bottom: 0;
    height: var(--bl);
    opacity: 0.16;
  }
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
</style>
