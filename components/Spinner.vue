<template functional>
  <span>
    <svg xmlns="http://www.w3.org/2000/svg" :height="`${props.size}px`" viewBox="0 0 16 16">
        <path fill="#0094E0" fill-rule="nonzero" d="M8 16a7.948 7.948 0 0 1-5.657-2.343A7.948 7.948 0 0 1 0 8c0-1.513.425-2.986 1.228-4.261A8.02 8.02 0 0 1 4.421.844l.672 1.341a6.53 6.53 0 0 0-2.596 2.354A6.48 6.48 0 0 0 1.5 8c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5c0-1.23-.345-2.426-.997-3.461a6.515 6.515 0 0 0-2.596-2.354l.672-1.341a8.02 8.02 0 0 1 3.193 2.895A7.981 7.981 0 0 1 16 8a7.948 7.948 0 0 1-2.343 5.657A7.948 7.948 0 0 1 8 16z"/>
    </svg>
  </span>
</template>

<script>
export default {
  functional: true,

  props: {
    size: {
      type: Number,
      default: 40
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  svg {
    display: inline-block;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
