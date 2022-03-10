<template>
  <div class="visible w-10 space-y-2 cursor-pointer md:invisible" @click="toggleMenu">
    <div class="w-full h-1 bg-black"></div>
    <div class="w-full h-1 bg-black"></div>
    <div class="w-full h-1 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: "mobileMenuBtnComponent",
  methods: {
    toggleMenu() {
      this.$store.commit('toggleMobileMenu');
    }
  }
};
</script>

