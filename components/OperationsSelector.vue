<template>
  <div class="selector" :class="isDropdownVisible ? 'focus' : ''">
    <button @click="toggleDropdown" ref="button" class="op-button">Operations</button>
    <ul v-show="isDropdownVisible" ref="dropdown" class="dropdown">
      <li v-for="op in operationsMetadata" :key="op.internalId">
        <input type="checkbox" :id="op.internalId" :name="op.name" :value="op.name"/>
        <label :for="op.internalId">{{op.name}}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownVisible: false
    }
  },

  props: {
    operationsMetadata: Array
  },
  methods: {
    initSelector() {
      const button = this.$refs.button
      const dropdown = this.$refs.dropdown

      console.log(button)
    },

    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible
    }
  },

  mounted() {
    this.initSelector()
  }
}
</script>

<style lang="scss" scoped>
$border-radius: 3px;
.selector {
  border-radius: $border-radius;
  background-color: epot-color('background');
  box-shadow: inset 0 0 0 1px epot-color('white', 'base', 'dark');

  &:hover,
  &.focus {
    background-color: epot-color('white');
    .op-button {
      color: epot-color('black');
    }
  }

  > * {
    width: 180px;
  }
  .op-button {
    position: relative;
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
    text-align: left;
    background-color: transparent;
    outline: none;
    z-index: 2;
    color: epot-color('white');
  }

  .dropdown {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: epot-color('white', 'light');
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    font-size: 0.8rem;
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
    z-index: 1;

    li {
      padding: 0.7rem 0.8rem;
      user-select: none;
      box-shadow: 0 -8px epot-color('white', 'light');
      input {
        margin-right: 2ex;
        margin-bottom: 1px;
      }
      > * {
        color: epot-color('black');
      }
    }
  }
}
</style>
