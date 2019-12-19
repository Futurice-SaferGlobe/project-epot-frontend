// @ts-check

import axios from 'axios'
import { IncomingMessage, ServerResponse } from 'http'
import Vue from 'vue'
import { Store } from 'vuex'

/**
 * @desc Middleware for operations. Receives the [nuxt context object](https://nuxtjs.org/guide/routing#middleware) as a first argument.
 * This JSDoc doesn't include the deprecated properties. See [Nuxt Middlewares](https://nuxtjs.org/guide/routing#middleware)
 *
 * @param {Object} context
 * @param {Vue} context.app The root Vue instance that includes all your plugins.
 * @param {Boolean} context.isDev Boolean to let you know if you're in dev mode, can be useful for caching some data in production.
 * @param {Boolean} context.isHMR Boolean to let you know if the method/middleware is called from webpack hot module replacement (only on client-side in dev mode).
 * @param {unknown} context.route [Vue Router Instance](https://router.vuejs.org/api/)
 * @param {Store.<any>} context.store Vuex Store instance. Available only if the vuex store is set.
 * @param {Object} context.env Environment variables set in nuxt.config.js, [see env api](https://nuxtjs.org/api/configuration-env).
 * @param {Object} context.params Alias of route.params.
 * @param {Object} context.query Alias of route.query.
 * @param {IncomingMessage} context.req [SERVER ONLY] Request from the Node.js server. If Nuxt is used as a middleware, the req object might be different depending of the framework you're using.
 * @param {ServerResponse} context.res [SERVER ONLY] Response from the Node.js server. If Nuxt is used as a middleware, the res object might be different depending of the framework you're using.
 * @param {Function} context.redirect Use this method to redirect the user to another route, the status code is used on the server-side, default to 302. redirect([status,] path [, query]).
 * @param {Function} context.error Use this method to show the error page: error(params). The params should have the properties statusCode and message.
 * @param {Object} context.nuxtState Nuxt state, useful for plugins which uses beforeNuxtRender to get the nuxt state on client-side before hydration. Available only in universal mode.
 */
const operationsMiddleware = context => {
  /**
   * Bail out if we're on production and the process tries to run on server.
   *
   * NOTICE: Remove the line below if we're NOT generating a static build
   * and want to use server stuff.
   */
  // @ts-ignore
  if (!context.isDev && process.server) return
}

export default operationsMiddleware
