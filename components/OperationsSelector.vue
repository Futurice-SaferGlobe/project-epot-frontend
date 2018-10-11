<template>
  <div class="selector" :class="isDropdownVisible ? 'focus' : ''">
    <button @click="toggleDropdown" ref="button" class="op-button">
      Operations <span>({{checkedOperations.length}} selected)</span>
    </button>
    <ul v-show="isDropdownVisible" ref="dropdown" class="dropdown">
      <li v-for="op in operationsMetadata" :key="op.internalId">
        <input 
          type="checkbox" 
          :id="op.internalId" 
          :name="op.name" 
          :value="op.internalId"
          v-model="checkedOperations"
        />
        <label :for="op.internalId">{{op.name}}</label>
      </li>
      <li>
        <button 
          class="enhance-hover"
          @click="applyActiveOperations"
          :disabled="!isSelectionValid"
        >
          Apply
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      isDropdownVisible: false,
      checkedOperations: []
    }
  },

  computed: {
    isSelectionValid: state =>
      state.checkedOperations.length >= 1 && state.checkedOperations.length <= 2
  },

  props: {
    operationsMetadata: Array
  },

  methods: {
    ...mapMutations(['changeSelectedOperations']),

    initSelector() {
      this.checkedOperations = this.operationsMetadata.map(
        ({ internalId }) => internalId
      )
    },

    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible

      if (this.isDropdownVisible) {
        // opening dropdown logic
      } else {
        if (!this.isSelectionValid) {
          this.checkedOperations = lastCheckedOperations
        }
        // closing dropdown logic
      }
    },

    applyActiveOperations() {
      this.changeSelectedOperations(this.checkedOperations)
    }
  },

  mounted() {
    this.initSelector()
  }
}
</script>

<style lang="scss" scoped>
$border-radius: 6px;
.selector {
  user-select: none;
  border-radius: $border-radius;
  background-color: epot-color('background');

  &:hover,
  &.focus {
    background-color: epot-color('foreground', 'dark');
    .op-button {
      color: epot-color('black');
    }
  }

  &.focus {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .op-button {
    position: relative;
    padding: 0.5rem 0.8rem;
    font-size: 1rem;
    text-align: left;
    background-color: transparent;
    outline: none;

    color: epot-color('white');

    span {
      opacity: 0.6;
      font-variant-numeric: tabular-nums;
    }
  }

  .dropdown {
    width: 198px;
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: epot-color('foreground', 'light');
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    font-size: 1rem;
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
    z-index: 1;

    li {
      padding: 0.5rem 0.8rem;
      user-select: none;
      input {
        margin-right: 2ex;
        margin-bottom: 1px;
      }
      > * {
        color: epot-color('black');
      }
      &:last-child {
        padding-top: 0.3rem;
      }

      button {
        background-color: epot-color('secondary');
        color: epot-color('white', 'lighter');
        font-size: 1rem;
        padding: 0.5rem 0.8rem;
        outline: none;
        width: 100%;
        border-radius: 3px;

        &:disabled {
          background-color: epot-color('foreground');
          color: epot-color('black', 'base', 'dark');
        }
      }
    }
  }
}
</style>
