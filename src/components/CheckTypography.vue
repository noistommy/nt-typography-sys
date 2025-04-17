<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppleFonts from '@/data/fonts_maxos_13.json'
import WindowFonts from '@/data/fonts_win_10.json'

const route = useRoute()
console.log(route.name, route.params)
// const fontList = [...AppleFonts, ...WindowFonts]
const block = ref(null)
const base = ref(null)

let titleBaseline = 0
const search = ref('Pretendard Variable')
const fontInfo = reactive({
  name: 'Pretendard Variable',
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

const testScript = {
  ko: '대통령은 국가의 독립·영토의 보전·국가의 계속성과 헌법을 수호할 책무를 진다. 모든 국민은 법률이 정하는 바에 의하여 공무담임권을 가진다. 재산권의 행사는 공공복리에 적합하도록 하여야 한다. 대한민국은 민주공화국이다.',
  en: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquam nihil qui voluptatem, dolorum, corporis sint consequatur exercitationem sapiente voluptatibus delectus. Perferendis omnis accusantium magnam minima mollitia voluptatibus rem eos.',
  ja: '会社自体はとても成功しています 快楽 苦痛 肉体的な快楽を 実践するために賢明な人によって選ばれたのです 告発者の喜びに ほんの少しの同情をもって'
}

const convertedSize = () => {
  return (
    Math.round(resultValue.value / (slider.value.offsetWidth / (MAX_SIZE - MIN_SIZE))) + MIN_SIZE
  )
}

const findPosToSize = (size) => {
  return (size - MIN_SIZE) * (slider.value.offsetWidth / (MAX_SIZE - MIN_SIZE))
}

const searchedApplyList = computed(() => {
  if (search.value === '') return []
  return AppleFonts.filter((item) => item.family.indexOf(search.value) === 0)
})

const searchedWinList = computed(() => {
  if (search.value === '') return []
  return WindowFonts.filter((item) => item.family.indexOf(search.value) === 0)
})

const language = ref('ko')

const setTextEdit = () => {
  if (window.getSelection().toString().length > 0) {
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    console.log(selection.toString(), range, range.getBoundingClientRect())
  }
}

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
  <div class="font-controller" :style="{ fontFamily: fontInfo.name }">
    <div class="insert-font ga-input button right">
      <input type="text" v-model="search" @keydown.enter.prevent="applyFont" />
      <div
        class="ga-button icon"
        @click="applyFont"
        v-nt-tooltip:bottom="`폰트이름을 입력 후 엔터 또는 버튼을 클릭하세요.`"
      >
        <i class="icon fa fa-text"></i>
      </div>
    </div>
    <div
      class="set-size-range"
      ref="slider"
      v-nt-tooltip:bottom="`폰트 사이즈 설정`"
      @mousedown="controlStart"
      @touchstart="controlStart"
    >
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
  <div class="font-list" :style="{ fontFamily: fontInfo.name }">
    <div class="ga-button tiny icon red">
      <i class="fa-brands fa-apple"></i>
    </div>
    <div
      class="font-item ga-tag label red"
      v-for="(font, i) in searchedApplyList"
      :key="i"
      @click="search = font.family"
    >
      {{ font.name }}
    </div>
    <div class="ga-button tiny icon deeppurple">
      <i class="fa-brands fa-windows"></i>
    </div>
    <div
      class="font-item ga-tag label deeppurple"
      v-for="(font, i) in searchedWinList"
      :key="i"
      @click="search = font.family"
    >
      {{ font.name }}
    </div>
  </div>
  <div class="font-info-wrapper">
    <div class="font-info-title" :style="{ fontFamily: fontInfo.name }">
      <span class="ga-tag label deepblue bold">Font Name</span>
      <span class="font-name">{{ fontInfo.name }}</span>
    </div>
    <div class="main-font-sample">
      <!-- <div class="area ghost">AaBb 가나다</div> -->
      <div
        class="area"
        :style="{ fontFamily: fontInfo.name, '--bl': titleBaseline + 'px' }"
        data-text="AaBb 가나다"
        @click="saveFont"
      >
        AaBb 가나다
        <span></span>
      </div>
    </div>
    <div class="baseline-ratio" :style="{ fontFamily: fontInfo.name }">
      <span class="bold">Baseline Ratio:</span> {{ baselineOffset }}px / {{ fontInfo.size }}px ({{
        Math.round((baselineOffset / fontInfo.size) * 100) / 100
      }})
    </div>
    <div class="font-in-button">
      <div class="custom-button">테스트</div>
      <div class="custom-button">Test</div>
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
      현재 글꼴: {{ fontInfo.name }} | weight(굵기): {{ num }}00
    </div>
  </div>
  <div
    class="prev-lorem"
    :style="{ fontFamily: fontInfo.name, fontSize: fontInfo.size + 'px' }"
    @mouseup="setTextEdit"
  >
    <div class="ga-buttons">
      <div
        class="ga-button"
        v-for="lang in ['ko', 'en', 'ja']"
        :key="lang"
        :class="{ selected: language === lang }"
        @click="language = lang"
      >
        {{ lang.toUpperCase() }}
      </div>
    </div>
    <p v-if="language === 'ko'">{{ testScript.ko }}</p>
    <p class="en" v-if="language === 'en'">{{ testScript.en }}</p>
    <p class="ja" v-if="language === 'ja'">{{ testScript.ja }}</p>
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
  position: relative;
  line-height: 1;
  background-color: var(--color-border);
  margin: 0;
  padding: 0;
  position: relative;
  outline: none;
  text-shadow: 0px 0px 1px var(--color-text);
  overflow: hidden;
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
    color: var(--color-text);
    opacity: 0;
    &:hover {
      opacity: 0.3;
    }
  }
  &:before,
  &:after {
    content: attr(data-text);
    position: absolute;
    //z-index: -1;
    top: 0;
    left: 0;
  }
  &:before {
    // text-shadow: -2px 0px 0px red;
    //left: -3px;
    //clip-path: inset(0 0 60% 0);
    // animation: glitch-text 3s infinite alternate;
  }
  &:after {
    //text-shadow: 2px 0px 0px blue;
    //left: 3px;
    //clip-path: inset(40% 0 0 0);
    // animation: glitch-text2 3s infinite alternate;
  }
}
.prev-font-weight {
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
}
.prev-lorem {
  padding: 20px;
  .ga-buttons {
    margin-bottom: 20px;
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
.font-list {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  .font-item {
    cursor: pointer;
  }
}

@keyframes glitch-text {
  0% {
    clip-path: inset(10% 0 0 0);
  }
  29% {
    clip-path: inset(10% 0 0 0);
  }
  30% {
    clip-path: inset(30% 0 0 0);
  }
  60% {
    clip-path: inset(60% 0 0 0);
  }
  80% {
    clip-path: inset(55% 0 0 0);
  }
  100% {
    clip-path: inset(85% 0 0 0);
  }
}
@keyframes glitch-text2 {
  0% {
    clip-path: inset(0 0 90% 0);
  }
  29% {
    clip-path: inset(0 0 90% 0);
  }
  30% {
    clip-path: inset(0 0 70% 0);
  }
  60% {
    clip-path: inset(0 0 40% 0);
  }
  80% {
    clip-path: inset(0 0 45% 0);
  }
  100% {
    clip-path: inset(0 0 15% 0);
  }
}
.custom-button {
  padding: 8px 12px;
  background-color: #3d3d3d;
  display: inline-block;
  line-height: 1;
  border-radius: 4px;
  & + .custom-button {
    margin-left: 5px;
  }
}
</style>
