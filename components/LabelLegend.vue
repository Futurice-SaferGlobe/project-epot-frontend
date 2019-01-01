<template>
  <div class="label-legend">
    <overlay-button @buttonClick="ye"/>
    <div
      v-if="isModalOpen" 
      class="label-modal"
    >
      <h2>Types of Findings</h2>
      <ul class="label-choices">
        <li v-for="label in labels" :key="label.id">
          <button 
            class="choice"
            :class="{'style-active-label': styleActiveLabel(label)}"
            @click="() => changeActiveLabel(label.id)"
          >
            {{label.title}}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import OverlayButton from './OverlayButton'
export default {
  components: {
    OverlayButton
  },

  data() {
    return {
      isModalOpen: false
    }
  },

  computed: {
    ...mapState(['labels', 'activeLabel']),
    styleActiveLabel() {
      return label => label.id === this.activeLabel.id
    }
  },

  methods: {
    ...mapMutations(['changeActiveLabel']),
    ye() {
      this.isModalOpen = !this.isModalOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.label-legend {
  display: flex;
  flex-direction: row;
  .overlay-button {
    margin-right: 1rem;
  }
  .label-modal {
    background-color: epot-color('foreground', 'base', 'light');
    padding: 2rem 1rem;
    min-width: 215px;
    color: epot-color('background');
    h2 {
      font-size: 1.2rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 0.8rem;
    }
    ul {
      li {
        button {
          outline: none !important;
          color: epot-color('background');
          background-color: transparent;
          padding: 0;
          margin: 0;
          font-size: 1rem;
          line-height: 1.8;
          &.style-active-label {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
