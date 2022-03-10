<template>
  <form @submit.prevent="send">
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
          class="px-8 py-3 text-base font-medium transition duration-300 ease-in btn primary hover:scale-110"
        >
          {{ $t("buttons.contact_us") }}
        </button>
      </div>
    </slot>
  </form>
</template>

<script>
import formGenerator from "@/mixins/formGenerator";

export default {
  name: "ContactUsForm",

  mixins: [formGenerator],

  data() {
    return {
      errorMessage: null,
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: this.$t("contact-us.form.label.name"),
            placeholder: "Hamad Al Saad",
            model: "name",
            validator: this.validator,
            required: true,
          },
          {
            type: "input",
            inputType: "email",
            label: this.$t("profile.email"),
            placeholder: "example@youremail.com",
            model: "email",
            validator: this.validator,
            required: true,
          },

          {
            type: "input",
            inputType: "tel",
            label: this.$t("profile.phone"),
            placeholder: "(+973) 1234 5678",
            model: "phone",
            required: true,

            validator: this.validator,
          },
          {
            type: "richselect",
            label: this.$t("contact-us.form.label.subject"),
            model: "subject",
            required: true,
            values: [
              this.$t("contact-us.form.select.options.help"),
              this.$t("contact-us.form.select.options.question"),
              this.$t("contact-us.form.select.options.sales"),
              this.$t("contact-us.form.select.options.yoga"),
            ],
            placeholder: "asdas",
            styleClasses: "reach_select",
            validator: this.validator,
            hideSearchBox: true,
          },
          {
            type: "textArea",
            label: this.$t("contact-us.form.label.message"),
            model: "message",
            max: 5000,
            required: true,
            placeholder: this.$t("contact-us.form.placeholder.message"),
            styleClasses: "fullwidth",
          },
        ],
      },
    };
  },

  methods: {
    async send() {
      try {
        await this.$axios.post("/contact-us", this.model);
        this.$toast.success(this.$t("messages.sent"));
        this.model.email = "";
        this.model.name = "";
        this.model.phone = "";
        this.model.subject = "";
        this.model.message = "";
      } catch (e) {
        this.setApiErrors(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>