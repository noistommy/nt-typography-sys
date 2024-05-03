<script setup>
import HomeView from './views/HomeView.vue'

window.addEventListener('blur', () => {
  document.title = 'Searching Font...'
})

window.addEventListener('focus', () => {
  document.title = 'Search Font!!'
})

// document.addEventListener('visibilitychange', () => {
//   document.title = document.visibilityState // visible || hidden
// })
</script>

<template>
  <HomeView />
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
