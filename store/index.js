export const state = () => ({
  mobileMenu: {
    isVisible: false
  },
  
  restorePassword: {
    email: null,
    mode: null,
  }
})


export const mutations = {
  toggleMobileMenu(state) {
    state.mobileMenu.isVisible = !state.mobileMenu.isVisible
  },

  setRestorePasswordEmail(state, email) {
    state.restorePassword.email = email
  },
  setRestorePasswordMode(state, mode) {
    state.restorePassword.mode = mode
  },
  resetRestorePassword(state) {
    state.restorePassword = {
      email: null,
      mode: null,
    }
  }
  
}


export const getters = {
  isMobileMenuVisible: state => state.mobileMenu.isVisible,

  getRestorePasswordEmail: state => state.restorePassword.email,
  getRestorePasswordMode: state => state.restorePassword.mode,
}