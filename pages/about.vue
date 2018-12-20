<template>
  <main class="about">
    About page
  </main>
</template>

<script>
import pageTransition from '@/mixins/pageTransition'
export default {
  mixins: [pageTransition]
}
</script>

<style lang="scss" scoped>
.about {
  background-color: epot-color('foreground');
  height: 100vh;
}
</style>
