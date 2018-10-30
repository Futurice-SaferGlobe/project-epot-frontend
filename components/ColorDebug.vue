<template>
  <ul class="color-debug">
    <li class="primary"/>
    <li class="secondary"/>
    <li class="background"/>
    <li class="foreground"/>
    <li class="black"/>
    <li class="white"/>
  </ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: row;
  li {
    display: block;
    width: 2rem;
    height: 2 rem;
    &.primary {
      background-color: epot-color('primary');
    }
    &.secondary {
      background-color: epot-color('secondary');
    }
    &.background {
      background-color: epot-color('background');
    }
    &.foreground {
      background-color: epot-color('foreground');
    }
    &.black {
      background-color: epot-color('black');
    }
    &.white {
      background-color: epot-color('white');
    }
  }
}
</style>
