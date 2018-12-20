import gql from 'graphql-tag'

export const getOperationHeader = gql`
  query getOperationHeader($id: ID!, $uid: ID, $withConn: Boolean!) {
    operationHeader(id: $id, uid: $uid) {
      title
      content
      uid
      labels
      connections @include(if: $withConn) {
        from
        to
      }
    }
  }
`
