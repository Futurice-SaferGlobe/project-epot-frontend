<template functional>
    <button class="arrow-wrapper">
      <svg :class="`arrow arrow-${props.angle}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 105" width="20px">
        <path fill-rule="nonzero" d="M35.18 105L.356 52.982 35.825 0H66.11l.693.464-35.159 52.518L66.468 105H35.18z"/>
      </svg>
    </button>
</template>

<script>
export default {
  functional: true,

  props: {
    angle: String
  }
}
</script>

<style lang="scss" scoped>
.arrow-wrapper {
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: epot-color('foreground', 'darker');
  padding: 1rem 1.5rem;
  cursor: pointer;

  .arrow {
    transition: all 0.15s ease-out;
    transform-origin: 50%;

    path {
      fill: epot-color('white');
    }

    &.arrow-right {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background-color: epot-color('primary');

    .arrow {
      path {
        fill: epot-color('black');
      }

      &.arrow-right {
        transform: rotate(180deg) translateX(-5px);
      }

      &.arrow-left {
        transform: translateX(-5px);
      }
    }
  }

  &:active {
    background-color: epot-color('primary');
  }
}
</style>
