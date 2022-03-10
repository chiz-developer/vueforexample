export default function ({ $axios, app }) {
  $axios.setHeader('Locale', app.i18n.locale)
}