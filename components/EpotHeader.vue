<template>
  <header>
    <div class="page-title-container">
      <h1>{{title}}</h1>
    </div>
    <div class="subheader">
      <div class="first slot-wrapper">
        <slot name="first"/>
      </div>
      <div class="second slot-wrapper centered">
        <slot name="second"/>
      </div>
      <div class="third slot-wrapper">
        <slot name="third"/> 
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Effectiveness of Peace Operations'
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: epot-color('background');
  padding: 1.5rem 1rem;

  > * {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .page-title-container {
    margin-bottom: 1.5rem;
    h1 {
      font-weight: bold;
    }
  }

  .subheader {
    display: grid;
    width: 100%;
    grid-template-columns: 200px 1fr 200px;
    box-shadow: 0 -1px epot-color('white', 'base', 'dark');
    padding-top: 0.2rem;
    grid-gap: 4ex;
    .slot-wrapper {
      overflow-x: auto;
      overflow-y: hidden;
      display: block;
    }
    .centered {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
