import gql from 'graphql-tag'

export const getOperationsWithConn = gql`
  query getOperationsWithConn($ids: [ID]) {
    operations(ids: $ids) {
      name
      internalId
      area
      headers {
        uid
        title
        labels
        index
        subheaders {
          uid
          index
          title
        }
      }
    }

    operationConnections(ids: $ids) {
      connections {
        from
        to
        type
      }
    }
  }
`
