<template>
  <div>
    <epot-header/>
    <nuxt/>
  </div>
</template>

<script>
import EpotHeader from '@/components/EpotHeader'

export default {
  components: {
    EpotHeader
  }
}
</script>


<!-- CSS RESET -->
<style src="nanoreset"></style>

<style lang="scss">
@import '~/assets/style/theme.scss';
</style>


