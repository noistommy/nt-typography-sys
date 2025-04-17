<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const items = ref([
  { id: 1, name: 'Pretendard Variable' },
  { id: 1, name: 'Pretendard JP Variable' },
  { id: 2, name: 'Roboto' },
  { id: 2, name: 'Osaka' },
  { id: 3, name: 'Noto Sans KR' }
])
const router = useRouter()
const setDetail = (target) => {
  router.push({ name: 'home', params: { id: target.id, name: target.name } })
}
</script>

<template>
  <div class="compare-view">
    <h1>Compare View</h1>
    <div class="compare-container">
      <div
        class="compare-item"
        v-for="item in items"
        :key="item.id"
        :style="{ fontFamily: item.name }"
      >
        <h2 @click="setDetail(item)">{{ item.name }}</h2>
        <!-- <p>감자에 싹이났다 잎이났다</p> -->
        <!-- <p>ABCDEFGHIJK abcdefghijk</p> -->
        <!-- <p>会社自体はとても成功し</p> -->
        <!-- <p>abcdefghijk</p> -->
        <p>1234567890</p>
      </div>
      <!-- <div class="add-btn">
        <button class="ga-button icon circle">
          <i class="fa fa-plus"></i>
        </button>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.compare-view {
  border: 1px solid var(--color-border);
  height: 100%;
  .compare-container {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--brd);

    .compare-item {
      flex: 1 1 33%;
      padding: 10px;
      border-bottom: 1px solid var(--brd);
      &:last-child {
        border-bottom: none;
      }
      h2 {
        cursor: pointer;
      }
      p {
        display: block;
        font-size: 24px;
        line-height: 1.5;
        font-weight: 400;
        letter-spacing: normal;
      }
    }
    .add-btn {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
  }
}
</style>
