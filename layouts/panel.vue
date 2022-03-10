<template>
  <div :dir="$dir()" class="relative flex h-screen overflow-y-hidden">
    <!-- sidebar -->
    <div
      class="
        w-[300px]
        md:translate-x-0 md:w-3/12
        xl:w-[281px]
        p-12
        fixed
        md:relative
        bg-green-50
        z-30
        h-full
        left-0
        t-0
        transition
        animation-duration-500
      "
      :class="isMenuVisibleClass"
    >
      <Logo />

      <!-- menu -->
      <side-bar-menu />
    </div>

    <!-- mobile under menu overlay -->
    <div
      class="fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-50 md:hidden"
      v-if="isMenuVisible"
      @click="toggleMobileMenu"
    ></div>

    <!-- main content -->
    <div class="w-full overflow-y-auto ">
      <!-- top bar -->
      <top-bar/>

      <Nuxt />
    </div>
  </div>
</template>

<script>
import Logo from "@/components/layout/logo";
import SideBarMenu from "../components/layout/sideBarMenu.vue";
import TopBar from '../components/layout/topBar.vue';
export default {
  name: "PanelLayout",
  components: { Logo, SideBarMenu,TopBar },
  computed: {
    isMenuVisible() {
      return this.$store.getters["isMobileMenuVisible"];
    },
    isMenuVisibleClass() {
      return this.isMenuVisible ? "-translate-x-0" : "-translate-x-full";
    },
  },
 
  methods: {
    toggleMobileMenu() {
      this.$store.commit("toggleMobileMenu");
    },
  },
};
</script>
<style scoped>

</style>