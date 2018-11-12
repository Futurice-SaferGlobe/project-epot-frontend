//@ts-check

export const generateLinks = (nodes, connections) => {
  const nodeMap = new Map(nodes.map(leaf => [leaf.data.uid, leaf]))

  return connections.map(conn => {
    const isInnerConnection =
      nodeMap.get(conn.from).depth === 1 || nodeMap.get(conn.to).depth === 1
        ? true
        : false

    return {
      source: {
        x: nodeMap.get(conn.from).x,
        y: nodeMap.get(conn.from).y,
        uid: nodeMap.get(conn.from).data.uid
      },
      target: {
        x: nodeMap.get(conn.to).x,
        y: nodeMap.get(conn.to).y,
        uid: nodeMap.get(conn.to).data.uid
      },
      isInnerConnection
    }
  })
  // .slice(2, 6)
}
