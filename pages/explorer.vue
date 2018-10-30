<template>
  <div class="explorer">
    <epot-header ref="header" title="Effectiveness of Peace Operations">
      <template slot="first" v-if="isLayoutComparison">
        <operations-selector v-if="!$apollo.queries.operations.loading" :operationsMetadata="operations"/>
      </template>
      <template slot="second">
        <label-heroes/>
      </template>
    </epot-header>
    <div class="relative-wrapper">
      <loading-component :loadingState="$apollo.queries.operations.loading">
        <operation-visual v-if="!$apollo.queries.operations.loading" :operation="operations[0]"/>
      </loading-component>
      <div ref="floating" class="floating">
        <operation-section-content v-if="!$apollo.queries.operations.loading" :operationMetadata="operationMetadata" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
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
      operations: null
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
        name: this.operations[0].name,
        internalId: this.operations[0].internalId,
        area: this.operations[0].area
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
    alignFloatingElement() {}
  },

  apollo: {
    operations: {
      query: queries.getOperations,
      variables() {
        return {
          ids: this.selectedOperations
        }
      },
      update(data) {
        return data.operations
      }
    }
  },

  mounted() {
    eventBus.$on('keke', () => {
      console.log('hahaha')
    })
    this.alignFloatingElement()
  }
}
</script>

<style lang="scss">
.explorer {
  .relative-wrapper {
    position: relative;
  }

  .floating {
    top: 0;
    bottom: 0;
    right: 0;
    width: 468px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    position: absolute;
  }
}
</style>
