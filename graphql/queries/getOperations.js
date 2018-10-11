import gql from 'graphql-tag'

export const getOperations = gql`
  query getOperations($ids: [ID]) {
    operations(ids: $ids) {
      name
      internalId
      area
      headers {
        title
        labels
        index
        subheaders {
          index
          title
        }
      }
    }
  }
`
