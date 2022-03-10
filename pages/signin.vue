<template>
  <div class="mb-20">
    <div class="relative">
      <div class="inset-x-0 top-0 absolute bg-color min-h-[610px] -z-1"></div>

      <div class="container px-4 mx-auto 2xl:px-40">
        <div class="pt-20">
          <div
            class="pt-16 text-3xl font-extrabold text-center md:text-5xl font-manrope lg:pt-0"
          >
            {{ $t("auth.sign_in") }}
          </div>
          <div class="mx-auto mt-8 text-center opacity-70 max-w-prose">
            <p>
              {{ $t("auth.description") }}
            </p>
          </div>
          <div class="w-full mt-5 text-center">
            <nuxt-link
              class="relative font-semibold uppercase nav-link"
              :to="'registration'"
              >  {{ $t("auth.dont_have_account") }} {{ $t("auth.sign_up") }}
            </nuxt-link>
          </div>
        </div>

        <!-- TODO: again useless component just to make component. Place component content right here, as i told, you don't reuse it / it doesn't do anything usefull -->
        <div
          class="
            p-4
            lg:p-12
            rounded-[30px]
            bg-white
            border border-solid border-gray-50
            mt-12
            w-full
            lg:w-[750px]
            mx-auto
          "
        >
          <LoginForm @success="handleSuccessLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/auth/login/LoginForm.vue";

export default {
  components: { LoginForm },
  name: "LoginPage",
  layout: "default",
  middleware: ["guest"],

  methods: {
    async handleSuccessLogin() {
      await this.$router.push("/panel");
    },
  },
};
</script>
