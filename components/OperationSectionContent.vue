<template>
  <div v-if="!$apollo.queries.operationSectionContent.loading" class="operation-contents">
    <div class="operation-heading">
      <h1 class="operation-title">{{operationSectionContent.header.title}}</h1>
      <span class="operation-area">werwerwerwerwerwer</span>
    </div>
    <div class="padder">
      <div class="text">
        <h2>
          <span class="index">{{activeHeaderIndices[0]}}.{{activeHeaderIndices[1]}}</span> 
          {{operationSectionContent.header.subheader.title}}
        </h2>
        <pre>{{operationSectionContent}}</pre>
        <p>
          subheader content
          {{operationSectionContent.header.subheader.content}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queries } from '@/graphql'

export default {
  props: {
    operationId: {
      operationId: {
        type: String,
        required: true
      }
    }
  },

  computed: {
    ...mapGetters(['activeHeaderIndices'])
  },

  apollo: {
    operationSectionContent: {
      query: queries.getOperationContent,
      variables() {
        return {
          id: this.operationId,
          headerIndex: this.activeHeaderIndices[0],
          subheaderIndex: this.activeHeaderIndices[1]
        }
      },
      update: ({ operation: { headers } }) => ({
        header: headers.map(h => ({
          title: h.title,
          content: h.content,
          subheader: h.subheaders[0]
        }))[0]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-contents {
  background-color: epot-color('background', 'dark');
  border-radius: 3px;
  overflow: hidden;
  .operation-heading {
    height: 120px;
    padding: 1rem 1.4rem;
    background-color: epot-color('foreground', 'darker');
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.4rem;
    .operation-title {
      font-size: 2rem;
      font-weight: bold;
      color: epot-color('primary');
      line-height: 1.2;
    }
    .operation-area {
      display: block;
      color: epot-color('white', 'light');
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
  .padder {
    padding: 0 1.4rem;
    .text {
      h2 {
        font-weight: 500;
        font-size: 1.2rem;
        margin-top: 1rem;
        color: epot-color('white', 'light');
        .index {
          font-size: 0.95em;
          color: epot-color('primary');
        }
      }
    }
  }
}
</style>
