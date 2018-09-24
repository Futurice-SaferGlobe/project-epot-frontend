<template>
  <div class="operation-explorer">
    <div class="wrapper">
      <span @click="eb">
        <arrow angle="left"/>
      </span>
      <div class="info">
        <h1 class="operation-name">{{name}}</h1>
        <span class="area">{{area}}</span>
      </div>
      <span @click="eb">
        <arrow angle="right"/>
      </span>
    </div>
  </div>
</template>

<script>
import Arrow from './OperationExplorer/Arrow'

export default {
  components: {
    Arrow
  },

  props: {
    name: String,
    area: String
  },

  inject: ['provider'],

  methods: {
    eb() {
      console.log('hei')
      this.provider.canvas.changeActiveOperation()
    }
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
.operation-explorer {
  .wrapper {
    background-color: epot-color('foreground');
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
        color: epot-color('white', 'light');
      }

      span.area {
        font-size: 0.8rem;
        color: epot-color('primary');
        font-weight: bold;
      }
    }
  }
}
</style>
