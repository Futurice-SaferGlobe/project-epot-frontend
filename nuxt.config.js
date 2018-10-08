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

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

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
      process.env.NODE_ENV === 'production'
        ? 'http://somehost.com'
        : 'http://localhost:8080'
  },

  /**
   * Apollo config
   */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:8080/graphql'
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
