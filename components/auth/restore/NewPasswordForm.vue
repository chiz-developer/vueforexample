<template>
  <form @submit.prevent="submitPassword">
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
  name: "NewPasswordForm",
  mixins: [formGenerator],
  data() {
    return {
      errorMessage: null,
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            inputName: "Code",
            label: this.$t("auth.restore_password.code"),
            placeholder: this.$t("auth.restore_password.code_placeholder"),
            model: "code",
            styleClasses: "fullwidth",
            required: true,
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
            visible: (model) => model.code.length > 5,
          },
          {
            type: "input",
            inputType: "password",
            label: this.$t("profile.repassword"),
            placeholder: this.$t("profile.password_placeholder"),
            model: "password_confirmation",
            styleClasses: "fullwidth",
            validator: this.validator,
            visible: (model) => model.code.length > 5,
          },
        ],
      },
    };
  },

  methods: {
    async submitPassword() {
      try {
        await this.$axios.$post("/auth/set-new-password", {
          ...this.model,
          email: this.$store.getters["getRestorePasswordEmail"],
        });

        this.$store.commit("resetRestorePassword");

        this.$router.push("/signin");
      } catch (e) {
        this.setApiErrors(e);
      }
    },
  },
};
</script>
