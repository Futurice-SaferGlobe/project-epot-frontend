<template>
  <div class="operation-header-connection">
    <button 
      @click="clickIntent"
      :class="{'is-open': isOpen}"
    >
      <slot/>
      <svg class="expando-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="5" viewBox="0 0 11 5">
          <defs>
              <path id="a" d="M9.705 0l.727 1.005L5.184 4.98 0 1.002l.733-1L5.19 3.421z"/>
          </defs>
          <g fill="none" fill-rule="evenodd">
              <path fill="#003057" d="M-866-588H365v2764H-866z"/>
              <g>
                  <mask id="b" fill="#fff">
                      <use xlink:href="#a"/>
                  </mask>
                  <use fill="#979797" fill-rule="nonzero" xlink:href="#a"/>
                  <g fill="#C6DAE7" mask="url(#b)">
                      <path d="M-8.556-13.125h26v26h-26z"/>
                  </g>
              </g>
          </g>
      </svg>
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
  position: relative;

  .expando-arrow {
    margin-left: 3ex;
    height: 0.5rem;
  }

  &:hover {
    color: epot-color('primary');

    .expando-arrow {
      g {
        fill: epot-color('primary');
      }
    }
  }

  &.is-open {
    .expando-arrow {
      transform: rotate(180deg);
    }
  }
}
</style>
