<template>
  <div class="content">
    <aside>
      Side Stuff
    </aside>
    <main>
      {{activeOperationData}}
      {{activeOperationIndex}}
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['activeOperationIndex', 'operationsCollection']),
    ...mapGetters(['activeOperationData'])
  },

  methods: {
    ...mapMutations(['changeSelectedOperationIndex']),
    ...mapActions(['fetchOperations'])
  },

  mounted() {
    this.fetchOperations()
    setTimeout(() => {
      this.changeSelectedOperationIndex('unamid')
    }, 9000)
  }
}
</script>

<style lang="scss">
</style>
