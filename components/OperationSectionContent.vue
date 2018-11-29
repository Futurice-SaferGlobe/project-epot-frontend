<template>
  <div v-if="!$apollo.queries.header.loading" class="operation-contents">
    <div class="operation-heading">
      <h1 class="operation-title">{{operationMetadata.name}}</h1>
      <span class="operation-area">{{operationMetadata.area}}</span>
    </div>
    <div class="padder">
      <div class="text">
        <h2>
          {{header.title}}
        </h2>
        <p>
          {{header.content}}
        </p>
      </div>
      <div class="connections-container">
        <ul v-if="headerConnections.length >= 1">
          <h3>Connections</h3>
          <li v-for="connection in headerConnections" :key="connection.uid">
            <button @click="connectionClick(connection.uid)">{{connection.title}}</button>
          </li>
        </ul>
        <span v-else class="no-connections">No Connections...</span>
      </div>
      <color-debug/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { queries } from '@/graphql'
import ColorDebug from './ColorDebug'

export default {
  props: {
    operationMetadata: {
      type: Object,
      required: true
    }
  },

  components: {
    ColorDebug
  },

  computed: {
    ...mapGetters(['activeHeader']),
    headerConnections() {
      return this.header.connections.map(({ from, to }) =>
        this.operationMetadata.operationTitles
          .filter(
            ({ uid }) => (uid === from || uid === to) && uid !== this.header.uid
          )
          .reduce((prev, next) => [...prev, next])
      )
    }
  },

  methods: {
    ...mapMutations(['changeActiveHeader']),
    connectionClick(uid) {
      this.changeActiveHeader({ uid })
    }
  },

  apollo: {
    header: {
      query: queries.getOperationHeader,
      variables() {
        return {
          id: this.operationMetadata.internalId,
          uid: this.activeHeader.uid
        }
      },
      update: ({ operationHeader }) => operationHeader
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-contents {
  height: 95%;
  margin: 1rem 0 1rem;
  border-left: 3px solid epot-color('foreground', 'base');
  padding: 0.5rem 3rem 0 1rem;

  font-family: Arial, sans-serif;

  .operation-heading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.4rem;
    .operation-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: epot-color('foreground', 'base');
      line-height: 1.2;
    }
    .operation-area {
      display: block;
      color: epot-color('foreground', 'dark');
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
  .padder {
    .text {
      color: epot-color('foreground', 'dark');
      h2 {
        color: epot-color('foreground', 'base');
        font-weight: 500;
        font-size: 1.2rem;
        margin-top: 1rem;
        .index {
          font-size: 0.95em;
          color: epot-color('primary');
        }
      }
    }

    .connections-container {
      box-shadow: 0 -1px epot-color('foreground', 'base');
      padding-top: 2rem;
      margin-top: 4rem;
      color: epot-color('foreground', 'base');
      h3 {
        font-weight: bold;
        font-size: 1.05rem;
        margin-bottom: 1.2rem;
        color: epot-color('foreground', 'base');
      }
      ul {
        li {
          &:not(:last-of-type) {
            margin-bottom: 0.7rem;
          }
          button {
            line-height: 1.5;
            background-color: transparent;
            color: epot-color('foreground', 'base');
            font-size: 1rem;
            padding: 0;
            outline: none;
            display: inline;
            text-align: left;
          }
        }
      }
      .no-connections {
        color: epot-color('foreground', 'dark', 'dark');
      }
    }
  }
}
</style>
