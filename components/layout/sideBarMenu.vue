<template>
  <div class="mt-24">
    <!-- admin menu -->
    <template v-if="userRole == 'admin'">
      <menu-item v-for="(m, i) in adminMenuItems" :key="m.uri" :menuItem="m" />
    </template>

    <!-- expert menu -->
    <template v-if="userRole == 'expert'">
      <menu-item v-for="(m, i) in expertMenuItems" :key="m.uri" :menuItem="m" />
    </template>

    <!-- user menu -->
    <template v-if="userRole == 'user'">
      <menu-item v-for="(m, i) in userMenuItems" :key="m.uri" :menuItem="m" />
    </template>

    <!-- guest menu -->
    <template v-if="userRole == 'guest'">
      <menu-item v-for="(m, i) in guestMenuItems" :key="m.uri" :menuItem="m" />
    </template>

    <div class="my-5">
      <div
        @click="logout()"
        class="flex items-center cursor-pointer space-s-5"
      >
        <svg-icon name="logout" class="w-5 h-5 lg:h-8 lg:w-8 text-primary" />
        <span class="text-lg lg:text-[18px]">Logout</span>
      </div>
    </div>
    <div>
      <select
        v-model="currLang"
        @change="changeLocale($event)"
        class="border-none rounded-none shadow-none outline-none cursor-pointer bg-green-50 h-11 focus:outline-none  text-lg lg:text-[22px] focus:shadow-none rtl:pr-12"
      >
        <option
          :value="locale.code"
          v-for="locale in availableLocales"
          :key="locale.code"
        >
          {{ locale.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import MenuItem from "@/components/layout/menuItem";
export default {
  name: "sidebarMenu",
  components: { MenuItem },
  data() {
    return {
      currLang: this.$i18n.locale,
    };
  },
  computed: {
    adminMenuItems() {
      return [
        // { label: "Dashboard", uri: "/panel/admin", icon: "dashboard" },
        { label: "Experts", uri: "/panel/admin/experts", icon: "expert" },
        { label: "Payments", uri: "/panel/admin/payments", icon: "payments" },
        { label: "Services", uri: "/panel/admin/services", icon: "services" },
        { label: "Users", uri: "/panel/admin/users", icon: "user" },
        { label: "News", uri: "/panel/admin/news", icon: "news" },
        { label: "News Categories", uri: "/panel/admin/news/category", icon: "newsCategories" },
        { label: this.$t('activation_requests.title_pl'), uri: "/panel/admin/experts/activation-requests", icon: "user" },
        { label: 'Testimonials', uri: "/panel/admin/testimonials", icon: "services" },
      ];
    },

    userMenuItems() {
      return [
        { label: this.$t("home"), uri: "/panel", icon: "home" },
        { label: this.$t('profile.title'), uri: "/panel/profile", icon: "user" },
      ];
    },

    expertMenuItems() {
      return [
        { label: this.$t("home"), uri: "/panel/expert", icon: "home" },
        { label: "Serivces", uri: "/panel/expert/services", icon: "list" },
        { label: this.$t('profile.title'), uri: "/panel/profile", icon: "user" },
        { label: 'Configurations', uri: "/panel/expert/configurations", icon: "settings" },
      ];
    },

    guestMenuItems() {
      return [{ label: "Sign In", uri: "/signin", icon: "login" }];
    },

    userRole() {
      return this.$auth.loggedIn ? this.$auth.user.role : "guest";
    },
    availableLocales() {
      return this.$i18n.locales;
    },
  },

  methods: {
    async changeLocale(event) {
      await this.$i18n.setLocale(event.target.value);
            location.reload();


    },
    async logout() {
      await this.$auth.logout();
      this.$router.push("/signin");
    },
  },
};
</script>
<style scoped>

</style>