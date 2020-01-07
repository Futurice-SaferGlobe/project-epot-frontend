import operations from './data/operations.json'
import connections from './data/connections.json'

import { find, flattenDeep } from 'lodash'

export const getAvailableOperations = () => {
  return operations.map(({ internalId, operation }) => ({
    internalId,
    operation
  }))
}

export const getOperationsWithConnections = () => {
  return operations.reduce((acc, { operation, area, internalId, data }) => {
    const titles = getOperationTitles(internalId)
    const conns = _getConnectionsForOperation(internalId)
    acc[internalId] = {
      operation,
      area,
      internalId,
      connections: conns,
      headers: data.map(header => {
        return {
          ..._bindConnectionsAsLinksToHeader(header, titles, conns),
          subheaders: header.subheaders.map(subheader => {
            return _bindConnectionsAsLinksToHeader(subheader, titles, conns)
          })
        }
      })
    }
    return acc
  }, {})
}

export const getOperationHeader = (id, uid) => {
  const operation = _getOperation(id)

  const header = (function seekHeader(headers) {
    if (!Array.isArray(headers) || headers.length === 0) return undefined

    if (headers[0].uid === uid) return headers[0]
    if (headers[0].subheaders !== undefined && headers[0].subheaders.length > 0)
      return seekHeader(headers[0].subheaders) || seekHeader(headers.slice(1))

    return seekHeader(headers.slice(1))
  })(operation.data)

  return _bindConnectionsToHeader(
    header,
    getOperationTitles(id),
    _getConnectionsForOperation(id)
  )
}

export const getOperationTitles = id => {
  const operation = _getOperation(id)
  if (operation === undefined) return []

  return flattenDeep([
    operation.data.map(({ title, uid }) => ({ title, uid })),
    operation.data.map(({ subheaders }) => {
      return subheaders.map(({ title, uid }) => ({ title, uid }))
    })
  ])
}

const _getOperation = id => {
  const ops = operations.filter(op => op.internalId === id)
  if (ops.length === 0) {
    console.log("WARNING! Couldn't find operation with id %s", id)
    return undefined
  }
  return ops[0]
}

const _getConnectionsForOperation = id => {
  const conns = connections.filter(conn => conn.operationInternalId === id)
  if (conns.length === 0) {
    console.log("WARNING! Couldn't find connections with id %s", id)
    return undefined
  }
  return conns[0].connections
}

const _bindConnectionsToHeader = (header, titles, connections) => {
  if (header === undefined) return undefined
  if (connections === undefined) return { ...header, connections: [] }

  return {
    ...header,
    connections: connections
      .filter(({ from, to }) => from === header.uid || to === header.uid)
      .map(({ from, to }) => {
        const connectionUid = from !== header.uid ? from : to
        return find(titles, ({ title, uid }) => uid === connectionUid)
      })
  }
}

const _bindConnectionsAsLinksToHeader = (header, titles, connections) => {
  const midstate = _bindConnectionsToHeader(header, titles, connections)
  if (midstate === undefined) return undefined
  return {
    ...midstate,
    links: midstate.connections.map(({ uid }) => uid)
  }
}
