<template>
  <form @submit.prevent="login">
    <vue-form-generator
      ref="form"
      :schema="schema"
      :model="model"
      :options="formOptions"
    >
    </vue-form-generator>
    <p class="my-4 text-red-500" v-if="errorMessage">
      {{ errorMessage }}
    </p>
    <slot>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="font-medium transition duration-300 ease-in btn primary hover:scale-110"
        >
          {{ $t("auth.sign_in") }}
        </button>
        <nuxt-link class="underline" :to="'restore-password'">
          {{ $t("auth.forgot_password") }}</nuxt-link
        >
      </div>
    </slot>
  </form>
</template>

<script>
import formGenerator from "@/mixins/formGenerator";

export default {
  name: "LoginForm",

  mixins: [formGenerator],

  data() {
    return {
      errorMessage: null,
      schema: {
        fields: [
          {
            type: "input",
            inputType: "email",
            label: this.$t("profile.email"),
            placeholder: "example@youremail.com",
            model: "email",
            styleClasses: "fullwidth",
            validator: this.validator,
          },

          {
            type: "input",
            inputType: "password",
            label: this.$t("profile.password"),
            placeholder: this.$t("profile.password_placeholder"),
            model: "password",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
        ],
      },
    };
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: this.model,
        });

        this.$emit("success");
      } catch (e) {
        this.errorMessage = e.response.data.message;
      }
    },
  },
};
</script>
