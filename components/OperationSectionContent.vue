<template>
  <div v-if="!$apollo.queries.operationSectionContent.loading" class="operation-contents">
    <div class="operation-heading">
      <h1 class="operation-title">{{operationMetadata.name}}</h1>
      <span class="operation-area">{{operationMetadata.area}}</span>
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
      <color-debug/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['activeHeaderIndices'])
  },

  apollo: {
    operationSectionContent: {
      query: queries.getOperationContent,
      variables() {
        return {
          id: this.operationMetadata.internalId,
          headerIndex: this.activeHeaderIndices[0],
          subheaderIndex: this.activeHeaderIndices[1]
        }
      },
      update: ({ operation: { headers } }) => ({
        header: headers.map(({ subheaders, ...rest }) => ({
          ...rest,
          subheader: subheaders[0]
        }))[0]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-contents {
  border-radius: 3px;
  overflow: hidden;
  .operation-heading {
    height: 120px;

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
