<template>
  <div class="operation-explorer">
    <div class="wrapper">
      <button @click="eb" class="arrow-wrapper">
        <svg class="arrow arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 105" width="1rem">
            <path fill-rule="nonzero" d="M35.18 105L.356 52.982 35.825 0H66.11l.693.464-35.159 52.518L66.468 105H35.18z"/>
        </svg>
      </button>
      <div class="info">
        <h1 class="operation-name">{{name}}</h1>
        <span class="area">{{area}}</span>
      </div>
      <button @click="eb" class="arrow-wrapper">
        <svg class="arrow arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 105" width="1rem">
            <path fill-rule="nonzero" d="M35.18 105L.356 52.982 35.825 0H66.11l.693.464-35.159 52.518L66.468 105H35.18z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    area: String
  },

  inject: ['provider'],

  methods: {
    eb() {
      this.provider.canvas.changeActiveOperation()
    }
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
.operation-explorer {
  .wrapper {
    background-color: white;
    box-shadow: inset 0 0 0 1px rgba(black, 0.05),
      0 4px 4px -2px rgba(black, 0.2);
    border-radius: 6px;
    overflow: hidden;

    display: flex;
    vertical-align: center;
    align-content: center;

    .info {
      flex: 1;
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      user-select: none;
      pointer-events: none;

      h1.operation-name {
        font-weight: bold;
        margin-bottom: 0.3rem;
      }

      span.area {
        font-size: 0.8rem;
        color: #148fe5;
        font-weight: bold;
      }
    }

    .arrow-wrapper {
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: whitesmoke;
      padding: 1rem 1.5rem;
      cursor: pointer;

      .arrow {
        transition: all 0.15s ease-out;
        transform-origin: 50%;

        path {
          fill: rgba(black, 0.7);
        }

        &.arrow-right {
          transform: rotate(180deg);
        }
      }

      &:hover {
        background-color: #148fe5;

        .arrow {
          path {
            fill: white;
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
        background-color: darken(#148fe5, 10%);
      }
    }
  }
}
</style>
