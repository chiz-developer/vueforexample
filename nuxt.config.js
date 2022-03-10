export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "The Nourishers",
    titleTemplate: '%s — The Nourishers',

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;500;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Almarai&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/normalize.css",
    "~/assets/css/main.scss",
    "@/assets/css/tailwind.css",
    "@/assets/css/vue-modal.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vueFormGenerator.js", ssr: false },
    { src: "~/plugins/vueTailwind.js" },
    { src: "~/plugins/filters.js" },
    { src: "~/plugins/coolLightbox.js" },
    { src: "~/plugins/v-calendar", ssr: false },
    "~/plugins/vue-js-modal.js",
    '~/plugins/direction-control',
    { src: "~/plugins/vueRangeSlider.js" },
    { src: "~/plugins/axios.js" },
    { src: "~/plugins/vue-i18n.js" },
   
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/svg-sprite",
    "vue2-editor/nuxt",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/dayjs",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    // https://www.npmjs.com/package/@nuxtjs/toast
    "@nuxtjs/toast",
    "@nuxtjs/i18n",
    "vue2-editor/nuxt"
  ],

  toast: {
    theme: "outline",
    duration: 3000,
    position: "top-center",
  },

  dayjs: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    plugins: [
      "customParseFormat",
      "isSameOrAfter",
      "isoWeek",
      "relativeTime",
      "duration",
    ],
  },

  i18n: {
    locales: [
      { name: "English", code: "en", iso: "en", dir: 'ltr', file: "en.json" },
      { name: "Arabic", code: "ar", iso: "ar", dir: 'rtl', file: "ar.json" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
    strategy: "no_prefix",
  },

  publicRuntimeConfig: {
    apiURL: process.env.API_URL || "http://localhost:8000/api",
    tapPublicKey: process.env.TAP_PUBLIC_KEY || "",
    axios: {
      baseURL: process.env.API_URL || "http://localhost:8000/api",
    },
  },

  privateRuntimeConfig: {
    apiURL: process.env.API_URL || "http://localhost:8000/api",
    tapPublicKey: process.env.TAP_PUBLIC_KEY || "",
    axios: {
      baseURL: process.env.API_URL || "http://localhost:8000/api",
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          user: { url: "/auth/user", method: "get", propertyName: false },
          logout: { url: "/auth/logout", method: "post" },
        },
      },
    },
    redirect: false,
    resetOnError: true,
    localStorage: false,
    cookie: {
      prefix: "auth.",
      options: {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
