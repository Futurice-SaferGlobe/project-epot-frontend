<template>
  <div class="explorer">
    <header>
      <h1>Effectiveness of peace operations</h1>
    </header>
    <main>
      <loading-component :loadingState="$apollo.queries.operationsWithConn.loading">
        <operation-visual
          class="operation-visual"
          v-if="!$apollo.queries.operationsWithConn.loading" :operation="operationsWithConn[0]"
        />
      </loading-component>
      <div class="left-section-container">
        <operation-section-content
          v-if="!$apollo.queries.operationsWithConn.loading"
          :operationMetadata="operationMetadata"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { queries } from '@/graphql/'

import eventBus from '@/plugins/eventBus'

import EpotHeader from '@/components/EpotHeader'
import OperationsSelector from '@/components/OperationsSelector'
import LabelHeroes from '@/components/LabelHeroes'
import OperationSectionContent from '@/components/OperationSectionContent'
import LoadingComponent from '@/components/LoadingComponent'
import OperationVisual from '@/components/OperationVisual'

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

  components: {
    EpotHeader,
    OperationsSelector,
    LabelHeroes,
    OperationSectionContent,
    LoadingComponent,
    OperationVisual
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
    eventBus.$on('operationClick', newHeader => {
      this.changeActiveHeader(newHeader)
    })
  }
}
</script>

<style lang="scss">
.explorer {
  header {
    border-bottom: 1px solid epot-color('foreground', 'base');
    margin: 0 2rem;
    h1 {
      font-family: Arial, sans-serif;
      font-size: 1.2rem;
      font-weight: bold;
      color: epot-color('foreground', 'base');
      text-transform: uppercase;
      padding: 1rem;
    }
  }

  main {
    display: flex;
    flex-direction: row;
    .left-section-container  {
    }
    .operation-visual {
      width: 58vw;
    }
  }
}
</style>
