<template>
  <button @click="onClick"
    class="overlay-button">
    <svg
      class="arrow-button"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 32 32"
    >
      <g fill-rule="nonzero">
        <path d="M26.002 12l.571.821-10.352 7.2L6 12.819l.576-.817 9.65 6.798z"/>
        <path d="M1 1v30h30V1H1zM0 0h32v32H0V0z"/>
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
  height: 16px;
  width: 16px;
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
