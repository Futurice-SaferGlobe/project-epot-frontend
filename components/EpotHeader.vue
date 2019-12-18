<template>
  <header>
    <div class="site-title-container">
      <h1>{{siteTitle}}</h1>
    </div>
    <ul class="nav">
      <div class="link">
        <nuxt-link to="/">Operations</nuxt-link>
        <nuxt-link :to="{ path: '/effects', query: { dir: 'next' } }">Effects</nuxt-link>
        <nuxt-link :to="{ path: '/about', query: { dir: 'next' } }">About</nuxt-link>
      </div>
      <some-buttons/>
    </ul>
  </header>
</template>

<script>
import SomeButtons from './SomeButtons'

export default {
  components: {
    SomeButtons
  },

  props: {
    siteTitle: {
      type: String,
      default: 'Effectiveness of Peace Operations'
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.35rem 0.7rem 0.55rem 0.7rem;
  border-bottom: 1px solid epot-color('foreground', 'base');

  .site-title-container {
    h1 {
      font-size: 1.35rem;
      font-weight: bold;
    }
  }

  ul {
    a {
      color: epot-color('foreground');
      font-size: 0.9rem;
      text-transform: uppercase;
      padding: 0 0.9rem;
      line-height: 0.5;
      &:not(:last-of-type) {
        border-right: 1px solid epot-color('foreground');
      }
    }
  }

  .nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
