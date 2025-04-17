<script setup>
// import { AiReport } from '@/libs/ai-report.es'
import '@/libs/ai-report.css'

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
  <div class="menu">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/compare">Compare</RouterLink>
  </div>
  <RouterView />
  <!-- <AiReport />s -->
</template>

<style scoped>
.menu {
  a {
    padding: 4px 8px;
    background-color: var(--suf);
  }
  a + a {
    margin-left: 5px;
  }
}
@media (min-width: 1024px) {
}
</style>
