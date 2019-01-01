<template>
  <button @click="onClick"
    class="overlay-button">
    <svg 
      v-if="type === 'labels'"
      xmlns="http://www.w3.org/2000/svg" 
      width="33"
      height="33"
      viewBox="0 0 33 33"
    >
      <g>
        <path fill="none" stroke-miterlimit="10" d="M.5.5h32v32H.5z"/>
        <path d="M27.5 12.26l-4-4.18a.91.91 0 0 0-.18-.14l-5.51-2.87a.52.52 0 0 0-.56.07L5.78 15.29a.52.52 0 0 0 0 .72l4.38 4.57-.93 1.75a.53.53 0 0 0 0 .39.47.47 0 0 0 .26.29l10.72 5.19a.41.41 0 0 0 .21.05.57.57 0 0 0 .18 0 .48.48 0 0 0 .28-.26l6.72-15.18a.51.51 0 0 0-.1-.55zM6.84 15.7l10.82-9.58 3.07 1.57-3.23-.32a.51.51 0 0 0-.49.27l-6.38 12zm13.34 11.38l-9.85-4.74L17.72 8.4l5.21.52 3.62 3.79z"/>
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'labels'
    }
  },

  methods: {
    onClick() {
      this.$emit('buttonClick')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 32px;
  width: 32px;
  &:focus {
    outline: none;
  }
}
svg {
  g {
    stroke: epot-color('foreground');
  }

  &:hover {
    g {
      stroke: epot-color('primary');
    }
  }
}
</style>
