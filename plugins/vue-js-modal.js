// plugins/vue-js-modal.js
import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true
})
