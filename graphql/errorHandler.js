export default ({ networkError, graphqlErrors }) => {
  if (networkError) {
    console.log(networkError)
    console.error(err)
  } else if (graphqlErrors) {
    console.log('graphqlErrors')
    console.error(err)
  }
}
