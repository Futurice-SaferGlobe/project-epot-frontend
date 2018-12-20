<template>
  <article v-if="!$apollo.queries.connHeader.loading">
    <p>
      {{ connHeader.content }}
    </p>
  </article>
</template>

<script>
import { queries } from '@/graphql'

export default {
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

  apollo: {
    connHeader: {
      query: queries.getOperationHeader,
      variables() {
        return {
          id: this.id,
          uid: this.uid,
          withConn: false
        }
      },
      update: ({ operationHeader }) => operationHeader
    }
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
