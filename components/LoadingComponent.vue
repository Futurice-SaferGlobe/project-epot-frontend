<template>
  <div>
    <spinner class="spinner" :size="spinnerSize"/>
  </div>
</template>

<script>
import Spinner from './LoadingComponent/Spinner'

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
