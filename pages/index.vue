<!-- TODO: This page has hard coded content for operations. Consider building a more sustainable way of fetching the data. -->

<template>
  <div class="explorer">
    <epot-header
      site-title="Effectiveness of Peace Operations"
      :operationMetadata="operationMetadata"
      :operationsWithConn="operationsWithConn"
    />
    <main>
      <!--
      TODO: THE LABELS ARE IMPLEMENTED IN THE CODE, BUT NOT UTILIZED BY THE DATA.
      THE RIGHT WAY TO HIDE THIS WOULD BE TO TEST IF THE OPERATION HAS LABELS OR NOT.
      <label-legend/>
      -->
      <operation-visual
        class="operation-visual"
        :operation="operationsWithConn[this.selectedOperation]"
      />
      <operation-header
        class="operation-header"
        :operationMetadata="operationMetadata"
      />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { queries } from '@/graphql/'

import { getAvailableOperations, getOperationsWithConnections, getOperationTitles } from '@/jsondb'

import eventBus from '@/plugins/eventBus'

import pageTransition from '@/mixins/pageTransition'

import EpotHeader from '@/components/EpotHeader'
import OperationHeader from '@/components/OperationHeader'
import LoadingComponent from '@/components/LoadingComponent'
import OperationVisual from '@/components/OperationVisual'
import LabelLegend from '@/components/LabelLegend'

import flatten from 'lodash.flatten'

export default {

  computed: {
    ...mapGetters([
      'selectedOperation',
      'availableOperations',
      'isLayoutComparison'
    ]),
    ...mapState(['activeHeader']),
    availableOperations() {
      return getAvailableOperations()
    },
    operationsWithConn() {
      return getOperationsWithConnections()
    },
    operationTitles() {
      return getOperationTitles(this.selectedOperation)
    },
    operationMetadata() {
      return {
        name: this.operationsWithConn[this.selectedOperation].operation,
        internalId: this.operationsWithConn[this.selectedOperation].internalId,
        area: this.operationsWithConn[this.selectedOperation].area,
        operationTitles: this.operationTitles
      }
    }
  },

  mixins: [pageTransition],

  components: {
    EpotHeader,
    OperationHeader,
    LoadingComponent,
    OperationVisual,
    LabelLegend
  },

  methods: {
    ...mapMutations([
      'changeActiveHeader',
      'changeOperationTitles',
      'changeHoverHeader'
    ])
  },

  mounted() {
    eventBus.$on('onNodeMouseIntention', ({ type, ...newHeader }) => {
      if (type === 'click') {
        this.changeActiveHeader(newHeader)
      }
    })
  }
}
</script>

<style lang="scss">
.explorer {
  background-color: epot-color('background');
  height: 100vh;
  header {
    margin: 0 2rem;
    position: absolute;
    left: 0;
    right: 0;
  }

  .label-legend {
    position: fixed;
    top: calc(1rem + 48px);
    left: 4.5rem;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    .loading-component {
    }

    .operation-visual {
      flex: 1;
      min-width: 0;
      height: calc(100% - 48px * 2);
    }
    .operation-header {
      margin-top: 4.5rem;
      flex-basis: 518px;
      height: calc(100% - 48px * 2);
    }
  }
}
</style>
