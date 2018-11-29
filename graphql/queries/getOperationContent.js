import gql from 'graphql-tag'

export const getOperationContentByIndex = gql`
  query getOperationContentById(
    $id: ID!
    $headerIndex: Int
    $subheaderIndex: Int
  ) {
    operation(id: $id) {
      headers(index: $headerIndex) {
        index
        title
        content
        subheaders(index: $subheaderIndex) {
          index
          title
          content
        }
      }
    }
  }
`
