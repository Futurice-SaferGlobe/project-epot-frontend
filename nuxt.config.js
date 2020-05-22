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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:600,700'
      }
    ]
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
    middleware: ['operations', 'pageJumpTransform']
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
    'nuxt-sass-resources-loader'
  ],
  sassResources: ['@/assets/style/colors.scss'],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: 'http://localhost:8080',
    errorHandler(error) {}
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
