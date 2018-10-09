<template>
  <div class="explorer">
    <loading-component :loadingState="$apollo.queries.operations.loading">
      <pre>
        {{operations}}
      </pre>
    </loading-component>
  </div>
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent'
import { queries } from '@/graphql/'

export default {
  data() {
    return {
      operationIds: ['unamid'],
      operations: null
    }
  },

  components: {
    LoadingComponent
  },

  apollo: {
    operations: {
      query: queries.getOperations,
      variables: () => ({
        ids: this.operationIds
      }),
      update(data) {
        return data.operations
      }
    }
  }
}
</script>

<style lang="scss">
.explorer {
}
</style>
