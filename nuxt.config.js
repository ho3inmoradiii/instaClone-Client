

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'instaClone-client',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css', type:"text/css" }
      ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.slim.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vform',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
  ],

  auth: {
    strategies: {
      local: {
        // token: {
        //   property: 'token',
        //   global: true,
        //   // required: true,
        //   // type: 'Bearer'
        // },
        // user: {
        //   property: 'user',
        //   // autoFetch: true
        // },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/me', method: 'get' }
        }
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env["API_URL"],
  },

  toast: {
    position: 'top-center',
    duration: 3000,
    keepOnHover: true,
    // register: [ // Register custom toasts
    //   {
    //     name: 'my-error',
    //     message: 'Oops...Something went wrong',
    //     options: {
    //       type: 'error'
    //     }
    //   }
    // ]
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
