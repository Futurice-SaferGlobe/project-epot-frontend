<template>
  <div class="content">
    <aside>
      <div class="horizontal">
        side
      </div>
    </aside>
    <main>
      <section v-if="activeOperationData" class="scroller">
        <contents-wrapper v-for="i in 2" :key="i">
          <operation-contents :operation-data="activeOperationData"/>
        </contents-wrapper>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
import ContentsWrapper from '@/components/ContentsWrapper'
import OperationContents from '@/components/OperationContents'

export default {
  components: {
    ContentsWrapper,
    OperationContents
  },
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
$side-width: 300px;
.content {
  display: grid;
  grid-template-columns: $side-width 1fr;

  aside {
    position: sticky;
    top: 0;
    height: 100vh;

    .horizontal {
      // position: fixed;
      // background-color: epot-color('background');
      // width: $side-width;
      // height: 100%;
    }
  }

  main {
    overflow: hidden;
    .scroller {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      width: 100%;
      height: 100vh;
      padding: 2rem 0;

      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: epot-color('foreground', 'light');
      }

      :not(:last-of-type) {
        margin-right: 1rem;
      }

      > * {
        width: 680px;
        min-width: 680px;
        height: 3000px;
      }
    }
  }
}
</style>
