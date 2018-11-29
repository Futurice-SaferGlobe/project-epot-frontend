import gql from 'graphql-tag'

export const getOperationHeader = gql`
  query getOperationHeader($id: ID!, $uid: ID) {
    operationHeader(id: $id, uid: $uid) {
      title
      content
      uid
      labels
      connections {
        from
        to
      }
    }
  }
`
