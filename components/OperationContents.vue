<template>
  <div class="operation-contents">
    <div class="operation-heading">
      <h1 class="operation-title">{{operationData.operation}}</h1>
      <span class="operation-area">{{operationData.area}}</span>
    </div>
    <div class="padder">
      <div class="text">
        <h2><span class="index">3.4</span> Participation of Women</h2>
        <p>
          Political primacy should drive peace operations at all stages of a conflict cycle. The UN and other
          organisations have placed renewed emphasis on conflict prevention, which at the level of a peace
          operation seeks to respond to an imminent crisis. Increasingly, peace operations adopt a wider perspective,
          not only aimed at reducing violence but also addressing its – not least political – root causes. Similarly, the
          UN approach to protection of civilians.
        </p>
        <p>
          Underlines the need to look beyond immediate physical protection
          and instead think preventively about protecting through dialogue and engagement (Tier I) and establishing
          a protective environment (Tier III).
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    operationData: Object,
    required: true
  }
}
</script>

<style lang="scss" scoped>
.operation-contents {
  .operation-heading {
    height: 120px;
    padding: 1rem 1.4rem;
    background-color: epot-color('foreground', 'darker');
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.4rem;
    .operation-title {
      font-size: 2rem;
      font-weight: bold;
      color: epot-color('primary');
      line-height: 1.2;
    }
    .operation-area {
      display: block;
      color: epot-color('white', 'light');
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
  .padder {
    padding: 0 1.4rem;
    .text {
      h2 {
        font-weight: 500;
        font-size: 1.2rem;
        margin-top: 1rem;
        color: epot-color('white', 'light');
        .index {
          font-size: 0.95em;
          color: epot-color('primary');
        }
      }
    }
  }
}
</style>
