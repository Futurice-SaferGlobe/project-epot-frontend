<template>
  <div>
    <page-switcher
      class="previous"
      direction="previous"
      @page-switch-intent="switchPage"
      v-if="showPreviousSwitch"
      :light-button="lightButtons"
    />
    <page-switcher
      class="next"
      direction="next"
      @page-switch-intent="switchPage"
      v-if="showNextSwitch"
      :light-button="lightButtons"
    />
    <nuxt/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PageSwitcher from '@/components/PageSwitcher'

export default {
  components: {
    PageSwitcher
  },

  data() {
    return {
      routerPushDirectionState: null
    }
  },

  computed: {
    ...mapState(['pageMap']),
    showNextSwitch() {
      return (
        this.pageMap.map(page => page.name).indexOf(this.$route.name) <=
        this.pageMap.length - 2
      )
    },
    showPreviousSwitch() {
      return this.pageMap.map(page => page.name).indexOf(this.$route.name) >= 1
    },
    lightButtons() {
      return this.pageMap.find(page => page.name === this.$route.name)
        .background === 'light'
        ? false
        : true
    }
  },

  methods: {
    ...mapMutations(['changeActivePage']),
    switchPage(e) {
      const arrDir = e === 'next' ? 1 : -1

      const prevActivePageIndex = this.pageMap
        .map(page => page.name)
        .indexOf(this.$route.name)

      const pushTo =
        this.pageMap[prevActivePageIndex + arrDir] !== undefined
          ? this.pageMap[prevActivePageIndex + arrDir]
          : this.pageMap[0]

      this.$router.push(
        { name: pushTo.name, query: { dir: e } },
        /** on route change complete */ () => {
          this.lightButtons = pushTo.background === 'light' ? false : true
        }
      )
    }
  }
}
</script>


<!-- CSS RESET -->
<style src="nanoreset"></style>

<style lang="scss">
@import '~/assets/style/theme.scss';

.page-switcher {
  position: absolute;
  z-index: 999;

  &.previous {
    top: 1rem;
    left: 1rem;
    transform: rotate(180deg) translateY(2px);
  }
  &.next {
    bottom: 1rem;
    left: 1rem;
  }
}

.next-dir-enter-active,
.next-dir-leave-active,
.previous-dir-enter-active,
.previous-dir-leave-active {
  transition: transform 0.5s !important;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.next-dir-enter {
  transform: translate3D(0, 100vh, 0) !important;
}
.next-dir-enter-to {
  transform: translate3D(0, 0vh, 0) !important;
}
.next-dir-leave {
  transform: translate3D(0, 0vh, 0) !important;
}
.next-dir-leave-to {
  transform: translate3D(0, -100vh, 0) !important;
}

.previous-dir-enter {
  transform: translate3D(0, -100vh, 0) !important;
}
.previous-dir-enter-to {
  transform: translate3D(0, 0vh, 0) !important;
}
.previous-dir-leave {
  transform: translate3D(0, 0vh, 0) !important;
}
.previous-dir-leave-to {
  transform: translate3D(0, 100vh, 0) !important;
}
</style>


