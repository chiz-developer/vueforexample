<template>
  <div class="relative bg-color min-h-[610px]">
    <div class="container px-4 mx-auto 2xl:px-40">
      <div class="pt-16">
        <div
          class="pt-16 text-3xl font-extrabold text-center  md:text-5xl font-manrope lg:pt-0"
        >
          {{ $t("auth.restore_password.title") }}
        </div>
        <div class="mx-auto mt-8 text-center opacity-70 max-w-prose">
          <p>
            {{ $t("auth.description") }}
          </p>
        </div>
        <div class="w-full mt-5 text-center">
          <nuxt-link
            class="relative font-semibold uppercase nav-link"
            :to="'signin'"
          >
            {{ $t("auth.restore_password.remember_password") }}
          </nuxt-link>
        </div>
      </div>

      <div
        class="
          p-4
          lg:p-12 lg:absolute
          inset-x-0
          rounded-[30px]
          bg-white
          border border-solid border-gray-50
          mt-12
          w-full
          lg:w-[750px]
          mx-auto
        "
      >
        <div v-if="mode == 'login'">
          <RestoreLoginForm />
        </div>
        <div v-if="mode == 'code'">
          <NewPasswordForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RestoreLoginForm from "@/components/auth/restore/RestoreLoginForm.vue";
import NewPasswordForm from "@/components/auth/restore/NewPasswordForm.vue";
export default {
  components: { RestoreLoginForm, NewPasswordForm },
  name: "RestorePassword",
  layout: "default",
  data() {
    return {
      errorMessage: null,
      code: "",
    };
  },

  created() {
    this.$store.commit("setRestorePasswordMode", "login");
    this.$store.commit("setRestorePasswordEmail", null);
  },

  computed: {
    mode() {
      return this.$store.getters["getRestorePasswordMode"];
    },
  },
};
</script>
