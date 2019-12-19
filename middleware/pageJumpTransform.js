export default function({ isDev, store, route }) {
  /**
   * Bail out if we're on production and the process tries to run on server.
   *
   * NOTICE: Remove the line below if we're NOT generating a static build
   * and want to use server stuff.
   */
  // @ts-ignore
  if (!isDev && process.server) return

  store.commit('changeActivePage', route.name)
}
