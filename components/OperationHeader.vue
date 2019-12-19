<template>
  <div class="operation-contents">
    <div v-if="!$apollo.queries.header.loading" class="loaded">
      <div class="operation-heading">
        <h1 class="operation-title">{{operationMetadata.name}}</h1>
        <span class="operation-area">{{operationMetadata.area}}</span>
        <div class="divider" :style="{marginTop: '1rem'}"/>
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
          <div class="divider" :style="{marginBottom: '1.5rem'}"/>
          <ul v-if="headerConnections.length >= 1">
            <h3>Connections</h3>
            <li v-for="connection in headerConnections" :key="connection.uid">
              <operation-header-connection
                :id="operationMetadata.internalId"
                :uid="connection.uid"
              >
                {{connection.title}}
              </operation-header-connection>
            </li>
          </ul>
          <span v-else class="no-connections">No Connections...</span>
        </div>
      </div>

    </div>
    <div v-else class="loading-wrapper">
      <loading-component spinner-size="100"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { queries } from '@/graphql'
import OperationHeaderConnection from './OperationHeaderConnection'
import LoadingComponent from './LoadingComponent'

export default {
  props: {
    operationMetadata: {
      type: Object,
      required: true
    }
  },

  components: {
    OperationHeaderConnection,
    LoadingComponent
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
          uid: this.activeHeader.uid,
          withConn: true
        }
      },
      update: ({ operationHeader }) => operationHeader,
      result: (_, key) => {
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.divider {
  width: 4ex;
  height: 1px;
  background-color: epot-color('foreground', 'dark');
}
.operation-contents {
  margin: 1rem 1rem 1rem 0;
  border-left: 2px solid epot-color('foreground', 'base');
  padding: 0.5rem 3rem 0 1rem;
  overflow-y: scroll;
  * {
    color: epot-color('foreground');
  }
  &::-webkit-scrollbar {
    background-color: epot-color('background');
    width: 0.8ex;
  }

  &::-webkit-scrollbar-thumb {
    background-color: epot-color('foreground');
    outline: 1px solid slategrey;
    border-radius: 3px;
  }

  .operation-heading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.4rem;
    .operation-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: epot-color('foreground', 'base');
      line-height: 1.2;
    }
    .operation-area {
      display: block;
      color: epot-color('foreground', 'dark');
      font-weight: 600;
      font-size: 0.9rem;
      margin-top: 0.3rem;
    }
  }
  .padder {
    .text {
      color: epot-color('foreground');
      h2 {
        color: epot-color('foreground', 'base');
        font-weight: 700;
        font-size: 1.12rem;
        margin-top: 1rem;

        .index {
          font-size: 0.95em;
          color: epot-color('primary');
        }
      }
      p {
        margin-top: 0.4rem;
      }
    }

    .connections-container {
      padding-top: 2rem;
      margin-top: 4rem;
      color: epot-color('foreground', 'base');
      h3 {
        font-weight: 700;
        font-size: 1.12rem;
        margin-bottom: 1rem;
        color: epot-color('foreground', 'base');
      }
      ul {
        display: flex;
        align-items: stretch;
        justify-items: stretch;
        align-items: stretch;
        justify-content: stretch;
        flex-direction: column;
        li {
          flex: 1;

          &:not(:last-of-type) {
            margin-bottom: 0.7rem;
          }
        }
      }
      .no-connections {
        color: epot-color('foreground', 'dark', 'dark');
      }
    }
  }
}

.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
