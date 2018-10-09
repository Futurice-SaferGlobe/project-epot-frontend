<template>
  <header>
    <div class="first">
      <h1 class="header-logo">EPOT</h1>
      <slot name="first"/>
    </div>
    <div class="second">
      <slot name="second"/>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  background-color: epot-color('background');
  padding: 1rem 1rem;
  > * {
    .header-logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: epot-color('primary');
    }
  }
}
</style>
