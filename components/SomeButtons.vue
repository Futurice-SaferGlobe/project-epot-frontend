<template>
    <ul class="some">
      <li class="some-icon-wrapper fb">
        <a target="_blank" href="#fb-share">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.32 23.32">
            <path d="M17.5 29.24a11.67 11.67 0 1 1 11.66-11.66A11.68 11.68 0 0 1 17.5 29.24zm0-22.33a10.67 10.67 0 1 0 10.66 10.67A10.68 10.68 0 0 0 17.5 6.91z" transform="translate(-5.84 -5.91)"/>
            <path d="M15.7 23h2.45v-5.83h1.68l.17-2.09h-1.85v-1.26a.56.56 0 0 1 .13-.35.49.49 0 0 1 .29-.14H20v-2.05h-2.14a2.28 2.28 0 0 0-1.49.62 2.83 2.83 0 0 0-.67 1.67v1.51h-1.15v2.09h1.12z" transform="translate(-5.84 -5.91)"/>
          </svg>
        </a>
      </li>
      <li class="some-icon-wrapper li">
        <a target="_blank" href="#linkedin-share">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.32 23.32">
            <path d="M18.12 29.29a11.66 11.66 0 1 1 11.66-11.66 11.67 11.67 0 0 1-11.66 11.66zm0-22.29a10.66 10.66 0 1 0 10.66 10.63A10.67 10.67 0 0 0 18.12 7z" class="cls-1" transform="translate(-6.46 -5.97)"/>
            <path d="M12.6 15.31h2.5V23h-2.52s.05-7.66.02-7.69zM16.56 15.31h2.54v1a2.87 2.87 0 0 1 5.23 1.46V23h-2.51v-4.47s-.05-1.37-1.26-1.37a1.38 1.38 0 0 0-1.44 1.24V23h-2.56z" class="cls-1" transform="translate(-6.46 -5.97)"/>
            <ellipse cx="7.42" cy="6.94" class="cls-1" rx="1.45" ry="1.33"/>
          </svg>
        </a>
      </li>
      <li class="some-icon-wrapper tw">
        <a target="_blank" href="#twitter-share">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.32 23.32">
            <path d="M17.5 29.29a11.66 11.66 0 1 1 11.66-11.66A11.67 11.67 0 0 1 17.5 29.29zM17.5 7a10.66 10.66 0 1 0 10.66 10.63A10.67 10.67 0 0 0 17.5 7z" class="cls-1" transform="translate(-5.84 -5.97)"/>
            <path d="M12.17 21.71s4.27 2.38 7.86-.43a6 6 0 0 0 2.19-5.41 4.46 4.46 0 0 0 1.12-1.14 4.62 4.62 0 0 1-1.22.28 2.47 2.47 0 0 0 .93-1.21 4.62 4.62 0 0 1-1.44.5 2.41 2.41 0 0 0-2.85-.38 2.31 2.31 0 0 0-1.1 2.51A6.64 6.64 0 0 1 12.9 14a2.33 2.33 0 0 0 .79 3.09 2.37 2.37 0 0 1-1.08-.3 2.35 2.35 0 0 0 1.83 2.33 3.41 3.41 0 0 1-1 0 2.2 2.2 0 0 0 2.14 1.61 4.87 4.87 0 0 1-3.41.98z" class="cls-1" transform="translate(-5.84 -5.97)"/>
          </svg>
        </a>
      </li>
    </ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.some {
  display: flex;
  flex-direction: row;
  .some-icon-wrapper {
    > * > * {
      width: 17px;
      height: 17px;
      fill: epot-color('foreground');
    }

    &:hover {
      > * > * {
        fill: epot-color('primary');
      }
    }

    &:not(:last-of-type) {
      margin-right: 0.6rem;
    }
  }
}
</style>
