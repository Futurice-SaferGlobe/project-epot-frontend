<template>
  <div>
    <spinner class="spinner" v-if="loadingState === true" :size="spinnerSize"/>
    <slot v-else/>
  </div>
</template>

<script>
import Spinner from './LoadingComponent/Spinner'

export default {
  components: {
    Spinner
  },

  props: {
    loadingState: {
      type: Boolean
    },
    spinnerSize: {
      type: Number,
      default: 140
    }
  },

  mounted() {
    console.log('loading', this.loadingState)
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
