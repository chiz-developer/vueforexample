<template>
  <div class="hidden lg:block">
    <div
      class="
        container
        px-4
        2xl:px-40
        mx-auto
        py-[28px]
        border-b border-solid border-[#e5eaef]
      "
    >
      <div class="flex items-center justify-between">
        <div
          class="
            transition
            ease-in-out
            delay-150
            hover:-translate-y-1 hover:scale-110
            duration-300
            cursor-pointer
            w-[100px]
          "
          @click="$router.push('/')"
        >
          <img src="@/assets/images/logo.png" alt="theNourishers" />
        </div>

        <nav
          class="
            flex
            items-center
            space-s-8
            text-base text-[#0b252e]
            font-condensed
          "
        >
          <div
            class="
              transition-colors
              duration-[350ms]
              font-almarai
              hover:text-blue-50
            "
          >
            <span class="cursor-pointer" @click="changeLocale()">{{
              $t("navbar.change_lang")
            }}</span>
          </div>
          <div class="hover:text-blue-50 transition-colors duration-[350ms]">
            <nuxt-link to="/experts">{{ $t("navbar.finx_expert") }}</nuxt-link>
          </div>

          <div class="relative hidden">
            <div
              class="
                hover:text-blue-50
                transition-colors
                duration-[350ms]
                inline-flex
                items-center
                cursor-pointer
              "
              @click="showDropdown = !showDropdown"
              data-dropdown-toggle="dropdown"
            >
              {{ $t("navbar.programs") }}
              <svg-icon name="arrow-down" class="w-6 h-6" />
            </div>
            <!-- Dropdown menu -->
            <div
              :class="[showDropdown ? 'block' : 'hidden']"
              class="
                absolute
                right-[-34px]
                z-50
                w-[142px]
                my-4
                text-base
                list-none
                bg-white
                divide-y divide-gray-100
                rounded-[20px]
                shadow
                p-[20px]
                border border-solid border-[#bdcfd4]
              "
              id="dropdown"
            >
              <ul class="py-1" aria-labelledby="dropdown">
                <li class="py-4">All programs</li>
                <li class="py-4">All programs</li>
                <li class="py-4">All programs</li>
              </ul>
            </div>
          </div>

          <div class="hover:text-blue-50 transition-colors duration-[350ms]">
            <nuxt-link :to="'#'">{{ $t("navbar.corporate") }}</nuxt-link>
          </div>
          <div class="hover:text-blue-50 transition-colors duration-[350ms]">
            <nuxt-link :to="'#'">{{ $t("navbar.academy") }}</nuxt-link>
          </div>
          <div class="hover:text-blue-50 transition-colors duration-[350ms]">
            <nuxt-link :to="'/news'">{{ $t("navbar.news") }}</nuxt-link>
          </div>
          <div class="hover:text-blue-50 transition-colors duration-[350ms]">
            <nuxt-link :to="'/about'">{{ $t("navbar.about") }}</nuxt-link>
          </div>
          <div class="hover:text-blue-50 transition-colors duration-[350ms]">
            <nuxt-link :to="'/contact-us'">{{
              $t("navbar.contact_us")
            }}</nuxt-link>
          </div>

          <div v-if="!loggedIn">
            <button
              @click="$router.push('/signin')"
              class="
                border border-solid
                rounded-full
                border-[#bdcfd4]
                px-[32px]
                hover:bg-black hover:text-white hover:border-none
                py-[12px]
              "
            >
              {{ $t("navbar.signin") }}
            </button>
          </div>
          <div
            v-else
            class="
              flex
              items-center
              space-s-4
              text-base text-[#0b252e]
              font-condensed
            "
          >
            <div class="hover:text-blue-50 transition-colors duration-[350ms]">
              <nuxt-link :to="'/panel'">
                {{ $t("dashboard.title") }}
              </nuxt-link>
            </div>
            <div>
              <button
                @click="logout"
                class="
                  border border-solid
                  rounded-full
                  border-[#bdcfd4]
                  px-[32px]
                  hover:bg-black hover:text-white hover:border-none
                  py-[12px]
                "
              >
                {{ $t("navbar.logout") }}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      showDropdown: false,
    };
  },

  computed: {
    loggedIn() {
      return this.$auth.loggedIn;
    },
  },

  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/signin");
    },
    changeLocale() {
      const locale = this.$i18n.locale == "en" ? "ar" : "en";
      this.$i18n.setLocale(locale);
      location.reload();
    },
  },
};
</script>
