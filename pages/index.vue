<template>
  <div class="index">
    <h1>Go to...</h1>
    <nuxt-link to="/explorer">/explorer</nuxt-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.index {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  h1 {
    font-size: 1.2rem;
    line-height: 2;
    font-weight: bold;
  }

  > * {
    color: white;
  }
}
</style>
