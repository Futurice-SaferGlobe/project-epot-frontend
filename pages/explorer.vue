<template>
  <div class="explorer">
    <epot-header>
      <template slot="first">
        <operations-selector v-if="!$apollo.queries.operations.loading" :operationsMetadata="operations"/>
      </template>
    </epot-header>
    <loading-component :loadingState="$apollo.queries.operations.loading">
      <pre>
        {{operations}}
      </pre>
    </loading-component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EpotHeader from '@/components/EpotHeader'
import OperationsSelector from '@/components/OperationsSelector'
import LoadingComponent from '@/components/LoadingComponent'
import { queries } from '@/graphql/'

export default {
  data() {
    return {
      operations: null
    }
  },

  computed: {
    ...mapGetters(['selectedOperations', 'availableOperations'])
  },

  components: {
    EpotHeader,
    OperationsSelector,
    LoadingComponent
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

  mounted() {}
}
</script>

<style lang="scss">
.explorer {
}
</style>
