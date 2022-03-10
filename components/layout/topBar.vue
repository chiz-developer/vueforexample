<template>
  <div class="flex items-center justify-between p-5 mb-4 bg-white rounded md:hidden">
    <mobile-menu-btn />
  </div>
</template>

<script>
import MobileMenuBtn from "@/components/layout/mobileMenuBtn.vue";

export default {
  components: { MobileMenuBtn },
  computed: {
    userName() {
      return this.$auth.loggedIn ? this.$auth.user.first_name : 'Guest'
    }
  }
  
};
</script>

<style></style>
