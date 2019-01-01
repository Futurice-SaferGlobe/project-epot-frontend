<template>
  <div class="explorer">
    <epot-header 
      site-title="Effectiveness of Peace Operations"
    />
    <main>
      <label-legend/>
      <loading-component class="loading-component" v-if="$apollo.queries.operationsWithConn.loading"/>
      <operation-visual
        class="operation-visual"
        v-else :operation="operationsWithConn[0]"
      />
      <operation-header
        class="operation-header"
        v-if="!$apollo.queries.operationsWithConn.loading"
        :operationMetadata="operationMetadata"
      />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { queries } from '@/graphql/'

import eventBus from '@/plugins/eventBus'

import pageTransition from '@/mixins/pageTransition'

import EpotHeader from '@/components/EpotHeader'
import OperationHeader from '@/components/OperationHeader'
import LoadingComponent from '@/components/LoadingComponent'
import OperationVisual from '@/components/OperationVisual'
import LabelLegend from '@/components/LabelLegend'

import flatten from 'lodash.flatten'

export default {
  data() {
    return {
      operationsWithConn: null,
      operationTitles: null
    }
  },

  computed: {
    ...mapGetters([
      'selectedOperations',
      'availableOperations',
      'isLayoutComparison'
    ]),
    operationMetadata() {
      return {
        name: this.operationsWithConn[0].name,
        internalId: this.operationsWithConn[0].internalId,
        area: this.operationsWithConn[0].area,
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
    ...mapMutations(['changeActiveHeader', 'changeOperationTitles'])
  },

  apollo: {
    operationsWithConn: {
      query: queries.getOperationsWithConn,
      variables() {
        return {
          ids: this.selectedOperations
        }
      },
      update({ operations, operationConnections }) {
        const getLink = (index, uid) =>
          operationConnections[index].connections
            .map(({ from, to }) => ({ from, to }))
            .filter(({ from, to }) => {
              return from === uid || to === uid
            })
            .map(conn => Object.values(conn).filter(val => val !== uid)[0])
        const update = operations.map((op, index) => ({
          ...op,
          headers: op.headers.map(({ subheaders, uid, ...rest }) => ({
            ...rest,
            uid,
            links: getLink(index, uid),
            subheaders: subheaders.map(({ uid, ...rest }) => ({
              ...rest,
              uid,
              links: getLink(index, uid)
            }))
          })),
          connections: operationConnections[index].connections
        }))
        this.operationTitles = flatten([
          ...update[0].headers.map(({ title, uid }) => ({ title, uid })),
          ...update[0].headers.map(({ subheaders }) =>
            subheaders.map(({ title, uid }) => ({ title, uid }))
          )
        ])

        return update
      }
    }
  },

  mounted() {
    eventBus.$on('onNodeMouseIntention', newHeader => {
      this.changeActiveHeader(newHeader)
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
      height: calc(100% - 48px * 2);
    }
    .operation-header {
      margin-top: 4.5rem;
      flex-basis: 720px;
      height: calc(100% - 48px * 2);
    }
  }
}
</style>
