import operations from './data/operations.json'
import connections from './data/connections.json'

export const getOperationHeader = (id, uid) => {
  const ops = operations.filter(op => op.internalId === id)
  if (ops.length === 0) {
    console.log("WARNING! Couldn't find operation with id %s", id)
    return null
  }

  return (function seekHeader(headers) {
    if (headers.length === 0) return null

    if (headers[0].uid === uid) return headers[0]
    if (headers[0].subheaders !== undefined && headers[0].subheaders.length > 0)
      return seekHeader(headers[0].subheaders) || seekHeader(headers.slice(1))

    return seekHeader(headers.slice(1))
  })(ops[0].data)
}
