<template>
  <form @submit.prevent="onSubmit">
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
      type="submit"
      class="font-medium transition duration-300 ease-in btn primary hover:scale-110"
    >
      {{ $t("auth.sign_up") }}
    </button>
  </form>
</template>

<script>
import formGenerator from "@/mixins/formGenerator";

export default {
  name: "IndividualForm",
  mixins: [formGenerator],
  data() {
    return {
      errorMessage: null,
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: this.$t("profile.full_name"),
            placeholder: this.$t("profile.full_name_placeholder"),
            model: "name",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
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
            inputType: "tel",
            label: this.$t("profile.phone"),
            placeholder: this.$t("profile.phone"),
            model: "phone",
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

          {
            type: "input",
            inputType: "password",
            label: this.$t("profile.repassword"),
            placeholder: this.$t("profile.password_placeholder"),
            model: "password_confirmation",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "checkbox",
            label: this.$t('buttons.subscribe_to_newsletter'),
            model: "newsletter",
            default: true,
            styleClasses: "fullwidth",
          },
        ],
      },
    };
  },

  methods: {
    async onSubmit() {
      try {
        await this.$axios.post("/auth/register", this.model);

        this.$auth.loginWith("local", { data: this.model }).then(async () => {
          await this.$router.push("/panel");
        });
      } catch (e) {
        this.setApiErrors(e);
      }
    },
  },
};
</script>
