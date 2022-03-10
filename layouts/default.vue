<template>
  <div :dir="$dir()" class="default">
    <NavBar />
    <MobileMenu />
    <Nuxt />
    <Footer/>
  </div>
</template>
<script>
import Footer from '../components/home/Footer.vue';
import MobileMenu from "../components/menu/MobileMenu.vue";
import NavBar from "../components/menu/NavBar.vue";

export default {
  components: { NavBar, MobileMenu, Footer },
};
</script>
