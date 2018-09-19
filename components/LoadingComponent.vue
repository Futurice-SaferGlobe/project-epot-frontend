<template>
  <span>
    <spinner :size="spinnerSize"/>
  </span>
</template>

<script>
import Spinner from './Spinner'

export default {
  components: {
    Spinner
  },

  props: {
    spinnerSize: {
      type: Number,
      default: 140
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
