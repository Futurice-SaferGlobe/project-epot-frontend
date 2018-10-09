import gql from 'graphql-tag'

export const getOperationsContent = gql`
  query getOperationsContent($ids: [ID]) {
    operations(ids: $ids) {
      headers {
        content
        subheaders {
          content
        }
      }
    }
  }
`
