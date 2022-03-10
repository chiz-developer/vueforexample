<template>
  <form @submit.prevent="submitLogin">
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
    <button
      class="font-medium transition duration-300 ease-in btn primary hover:scale-110"
    >
       {{ $t("buttons.send") }}
    </button>
  </form>
</template>

<script>
import formGenerator from "@/mixins/formGenerator";

export default {
  name: "RestoreLoginForm",
  mixins: [formGenerator],
  data() {
    return {
      errorMessage: null,
      schema: {
        fields: [
          {
            type: "input",
            inputType: "email",
             label: this.$t("profile.login"),
            placeholder: "example@youremail.com",
            model: "login",
            styleClasses: "fullwidth",
            validator: this.validator,
            required: true,
          },
        ],
      },
    };
  },

  methods: {
    async submitLogin() {
      try {
        await this.$axios.$post("/auth/send-code", this.model);
        this.$store.commit("setRestorePasswordMode", "code");
        this.$store.commit("setRestorePasswordEmail", this.model.login);
      } catch (e) {
        this.errorMessage = e.response.data.message;
      }
    },
  },
};
</script>
