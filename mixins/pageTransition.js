export default {
  transition(to, from) {
    return {
      name: `${to.query.dir}-dir`,
      mode: 'out-in'
    }
  }
}
