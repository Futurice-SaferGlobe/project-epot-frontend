<template>
  <article>
    <p>
      {{ connHeader.content }}
    </p>
  </article>
</template>

<script>
import { queries } from '@/graphql'
import { getOperationHeader } from '@/jsondb'

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

  data () {
    return {
      connHeader: { content: getOperationHeader(this.id, this.uid) }
    }
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
