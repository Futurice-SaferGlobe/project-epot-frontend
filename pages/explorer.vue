<template>
  <div class="explorer">
    <!-- <epot-header ref="header" title="Effectiveness of Peace Operations">
      <template slot="first" v-if="isLayoutComparison">
        <operations-selector v-if="!$apollo.queries.operations.loading" :operationsMetadata="operations"/>
      </template>
      <template slot="second">
        <label-heroes/>
      </template>
    </epot-header> -->
    <main>
      <loading-component :loadingState="$apollo.queries.operationsWithConn.loading">
        <operation-visual v-if="!$apollo.queries.operationsWithConn.loading" :operation="operationsWithConn[0]"/>
      </loading-component>
      <operation-section-content v-if="!$apollo.queries.operationsWithConn.loading" :operationMetadata="operationMetadata" />
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

export default {
  data() {
    return {
      operationsWithConn: null
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
        area: this.operationsWithConn[0].area
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
    ...mapMutations(['changeActiveHeaderIndices'])
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
        return operations.map((op, index) => ({
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
      }
    }
  },

  mounted() {
    eventBus.$on('operationClick', newIndices => {
      console.log('moi')
      this.changeActiveHeaderIndices(newIndices)
    })
  }
}
</script>

<style lang="scss">
.explorer {
  main {
    display: flex;
    flex-direction: row;
    > * {
    }
  }
}
</style>
