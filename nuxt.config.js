const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FFFFFF' },

  /**
   * Router
   */
  router: {
    base:
      process.env.DEPLOY_ENV === 'gh-pages' ? '/project-epot-frontend/' : '/',
    middleware: ['operations']
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/eventBus.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'nuxt-sass-resources-loader',
    '@nuxtjs/apollo'
  ],
  sassResources: ['@/assets/style/colors.scss'],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production' ||
      process.env.DEPLOY_ENV === 'gh-pages'
        ? 'https://cors-anywhere.herokuapp.com/http://46.101.183.17:8080'
        : 'http://localhost:8080',
    errorHandler(error) {}
  },

  /**
   * Apollo config
   */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.NODE_ENV === 'production' ||
          process.env.DEPLOY_ENV === 'gh-pages'
            ? 'https://cors-anywhere.herokuapp.com/http://46.101.183.17:8080'
            : 'http://localhost:8080/graphql'
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
