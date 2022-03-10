<template>
  <div class="fixed top-0 z-10 block w-full bg-white lg:hidden">
    <div
      class="
        relative
        top-0
        flex
        items-center
        justify-between
        w-full
        p-4
        select-none
        lg:hidden
        border-b border-solid border-[#e5eaef]
      "
    >
      <figure
        class="
          transition
          ease-in-out
          delay-150
          hover:-translate-y-1 hover:scale-110
          duration-300
          cursor-pointer
          w-[100px]
        "
      >
        <img
          class="object-cover w-full h-full"
          src="~/assets/images/logo.png"
          alt=""
        />
      </figure>
      <div class="flex items-center space-s-8">
        <div class="hover:mr-1">
          <NuxtLink
            v-if="!loggedIn"
            to="/signin"
            class="
              border border-solid
              rounded-full
              border-[#bdcfd4]
              px-4
              hover:bg-black hover:text-white hover:border-none
              py-[9px]
            "
          >
              {{ $t("navbar.signin") }}
          </NuxtLink>
          <NuxtLink
            v-else
            to="/panel"
            class="
              border border-solid
              rounded-full
              border-[#bdcfd4]
              px-4
              hover:bg-black hover:text-white hover:border-none
              py-[9px]
            "
          >
                {{ $t("dashboard.title") }}
          </NuxtLink>
        </div>
        <!-- Burger menu button -->
        <div
          :class="[isMenuopen ? 'bg-blue-50' : 'bg-white']"
          class="
            burger
            hover:bg-blue-50
            px-[10px]
            py-[12px]
            border border-solid
            rounded-full
            border-[#bdcfd4]
          "
        >
          <div
            class="
              relative
              block
              w-[25px]
              cursor-pointer
              focus:outline-none
              mt-[2px]
            "
            @click="toggleMenu()"
          >
            <span class="sr-only">Open main menu</span>
            <div class="">
              <span
                aria-hidden="true"
                class="
                  relative
                  block
                  w-full
                  h-[2px]
                  transition
                  duration-500
                  ease-in-out
                  transform
                  bg-black
                "
                :class="{ 'rotate-45': isMenuopen, ' top-[6px]': isMenuopen }"
              ></span>
              <span
                aria-hidden="true"
                class="
                  relative
                  block
                  w-full
                  h-[2px]
                  mt-[6px]
                  transition
                  duration-500
                  ease-in-out
                  transform
                  bg-black
                "
                :class="{ 'opacity-0': isMenuopen }"
              ></span>
              <span
                aria-hidden="true"
                class="
                  relative
                  block
                  w-full
                  h-[2px]
                  mt-[6px]
                  transition
                  duration-500
                  ease-in-out
                  transform
                  bg-black
                "
                :class="{
                  '-rotate-45': this.isMenuopen,
                  ' bottom-[10px]': this.isMenuopen,
                }"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="[isMenuopen ? 'h-screen' : 'h-auto']"
      class="relative block lg:hidden"
    >
      <!-- Mobile menu -->
      <div
        :class="[isMenuopen ? 'h-full bottom-0' : 'h-0 bottom-full']"
        class="top-0 overlay"
      >
        <nav
          class="
            flex flex-col
            items-start
            divide-y
            w-full
            text-xl text-[#0b252e]
            font-condensed
          "
        >
          <div
            class="
              transition-colors
              duration-[350ms]
              hover:bg-[#F5F5F5]
              w-full
              px-[40px]
              py-[20px]
              font-almarai
              hover:text-blue-50
            "
          >
            <span class="cursor-pointer" @click="changeLocale()">{{
              $t("navbar.change_lang")
            }}</span>
          </div>
          <div
            class="
              hover:text-blue-50
              transition-colors
              duration-[350ms]
              hover:bg-[#F5F5F5]
              px-[40px]
              py-[20px]
              w-full
            "
          >
            <nuxt-link to="/experts">{{ $t("navbar.finx_expert") }}</nuxt-link>
          </div>
          <div class="relative w-full px-[40px] py-[20px]">
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
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
            <!-- Dropdown menu -->
            <div
              :class="[showDropdown ? 'block' : 'hidden']"
              class="
                z-50
                w-full
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
                <li class="py-4">{{ $t("navbar.programs") }}</li>
                <li class="py-4">{{ $t("navbar.programs") }}</li>
                <li class="py-4">{{ $t("navbar.programs") }}</li>
              </ul>
            </div>
          </div>
          <div
            class="
              hover:text-blue-50
              transition-colors
              duration-[350ms]
              hover:bg-[#F5F5F5]
              w-full
              px-[40px]
              py-[20px]
            "
          >
            <nuxt-link :to="'#'">{{ $t("navbar.corporate") }}</nuxt-link>
          </div>
          <div
            class="
              hover:text-blue-50
              transition-colors
              duration-[350ms]
              hover:bg-[#F5F5F5]
              w-full
              px-[40px]
              py-[20px]
            "
          >
            <nuxt-link :to="'#'">{{ $t("navbar.academy") }}</nuxt-link>
          </div>
          <div
            class="
              hover:text-blue-50
              transition-colors
              duration-[350ms]
              hover:bg-[#F5F5F5]
              w-full
              px-[40px]
              py-[20px]
            "
          >
            <nuxt-link :to="'/news'">{{ $t("navbar.news") }}</nuxt-link>
          </div>
          <div
            class="
              hover:text-blue-50
              transition-colors
              duration-[350ms]
              hover:bg-[#F5F5F5]
              w-full
              px-[40px]
              py-[20px]
            "
          >
            <nuxt-link :to="'#'">{{ $t("navbar.about") }}</nuxt-link>
          </div>
          <div
            class="
              hover:text-blue-50
              transition-colors
              duration-[350ms]
              hover:bg-[#F5F5F5]
              w-full
              px-[40px]
              py-[20px]
            "
          >
            <nuxt-link :to="'/contact-us'">{{
              $t("navbar.contact_us")
            }}</nuxt-link>
          </div>
          <div class="px-[40px] py-[20px]">
            <button
              class="
                py-4
                text-white
                rounded-full
                bg-blue-50
                px-[82px]
                text-base
                font-medium
                hover:bg-black
                transition
                ease-in-out
                delay-150
                hover:-translate-y-1 hover:scale-110
                duration-300
              "
            >
              {{ $t("navbar.get_class") }}
            </button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileMenu",
  data() {
    return {
      isMenuopen: false,
      showDropdown: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuopen = !this.isMenuopen;
    },
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
<style scoped>
.overlay {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  overflow: hidden;
  width: 100%;
  transition: 0.5s ease;
}
</style>
