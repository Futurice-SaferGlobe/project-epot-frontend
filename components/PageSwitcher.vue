<template>
  <span 
    class="page-switcher"
    @click="$emit('page-switch-intent', direction)"
    :class="{'light-button': lightButton}"
  >
    <svg 
      class="arrow-button"
      xmlns="http://www.w3.org/2000/svg" 
      width="32" 
      height="32" 
      viewBox="0 0 32 32"
    >
      <g fill-rule="nonzero">
        <path d="M26.002 12l.571.821-10.352 7.2L6 12.819l.576-.817 9.65 6.798z"/>
        <path d="M1 1v30h30V1H1zM0 0h32v32H0V0z"/>
      </g>
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    lightButton: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      required: true,
      validator(value) {
        return ['next', 'previous'].some(dir => dir === value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  g {
    fill: epot-color('background');
  }

  &:hover {
    g {
      fill: epot-color('primary');
    }
  }
}

.light-button {
  g {
    fill: epot-color('white');
  }
}
</style>
