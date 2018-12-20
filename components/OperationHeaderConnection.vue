<template>
  <div class="operation-header-connection">
    <button 
      @click="clickIntent"
      :class="{'is-open': isOpen}"
    >
      <slot/>
    </button>
    <operation-header-content
      v-if="isOpen"
      :uid="uid"
      :id="id"
    />
  </div>
</template>

<script>
import OperationHeaderContent from './OperationHeaderContent'

export default {
  components: {
    OperationHeaderContent
  },

  props: {
    id: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isOpen: false
    }
  },

  methods: {
    clickIntent() {
      this.isOpen = !this.isOpen

      if (this.isOpen) {
      } else {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  line-height: 1.5;
  background-color: transparent;
  color: epot-color('foreground', 'base');
  font-size: 1rem;
  padding: 0;
  outline: none;
  display: inline;
  text-align: left;

  &:hover {
    color: epot-color('primary');
  }
}
</style>
