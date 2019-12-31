// const pkg = require('./package')
require('dotenv').config();

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Template',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Template'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: ''
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/Loading',

  /*
   ** Global CSS
   */
  css: [
    '@/assets/sass/index.sass'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios', {
      credentials: false,
      baseURL: process.env.NUXT_API_URL
    }],
    [
      '@nuxtjs/robots',
      {
        UserAgent: '*',
        Host: process.env.NUXT_BASE_URL,
        Disallow: '*'
      }
    ]
  ],

  env: {
    basicAuthLogin: process.env.NUXT_BASIC_AUTH_LOGIN,
    basicAuthPassword: process.env.NUXT_BASIC_AUTH_PASSWORD,
    apiKeys: process.env.NUXT_X_API_KEYS
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  server: {
    // nuxt.js server options ( can be overrided by environment variables )
    host: process.env.NUXT_BASE_URL,
    port: process.env.NUXT_PORT
  },

  /*
   ** Build configuration
   */
  // buildDir: '../client',
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
