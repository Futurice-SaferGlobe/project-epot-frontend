<template>
  <div class="content">
    <aside>
      side
    </aside>
    <main>
      <section v-if="activeOperationData" class="operation">
        <div class="operation-heading">
          <h1 class="operation-title">{{activeOperationData.operation}}</h1>
          <span class="operation-area">{{activeOperationData.area}}</span>
        </div>
      </section>
      {{activeOperationData}}
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['selectedOperationIndex', 'operationsCollection']),
    ...mapGetters(['activeOperationData'])
  },

  methods: {
    ...mapMutations(['changeSelectedOperationIndex']),
    ...mapActions(['fetchOperations'])
  },

  mounted() {
    this.fetchOperations()

    this.changeSelectedOperationIndex(0)
  }
}
</script>

<style lang="scss">
.content {
  display: grid;
  grid-template-columns: 300px 1fr;

  aside {
    position: sticky;
    top: 0;
    height: 100vh;
  }

  main {
    height: 3000px;

    .operation {
      .operation-title {
        font-size: 2rem;
        font-weight: bold;
        color: #0094e0;
      }
      .operation-area {
        display: block;
      }
    }
  }
}
</style>
