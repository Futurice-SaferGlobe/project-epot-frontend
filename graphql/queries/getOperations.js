import gql from 'graphql-tag'

export const getOperations = gql`
  query getOperations($ids: [ID]) {
    operations(ids: $ids) {
      name
      internalId
      area
      headers {
        title
        uid
        labels
        index
        subheaders {
          index
          uid
          title
        }
      }
    }
  }
`
