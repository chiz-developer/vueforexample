<template>
  <form @submit.prevent="onSubmit">
    <vue-form-generator
      v-if="loaded"
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
      :disabled="!model.status"
      :class="{
        'pointer-events-none opacity-40 cursor-not-allowed	': !model.status,
      }"
      class="font-medium transition duration-300 ease-in btn primary hover:scale-110"
    >
      {{ $t("auth.sign_up") }}
    </button>
  </form>
</template>

<script>
import formGenerator from "@/mixins/formGenerator";

export default {
  name: "CoachForm",
  mixins: [formGenerator],
  data() {
    return {
      errorMessage: null,
      countries: null,
      expertPositions: null,
      expertCategories: null,
      loaded: false,
    };
  },

  computed: {
    schema() {
      return {
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
            model: "repeat_password",
            styleClasses: "fullwidth",
            validator: (value, f, model) => {
              return model.password == value
                ? true
                : this.$t("validation.passswork_missmatch");
            },
          },
        ],
        groups: [
          {
            fields: [
              {
                type: "richselect",
                label: this.$t("profile.country"),
                model: "country_id",
                values: this.countries,
                styleClasses: "reach_select",
                validator: this.validator,
                valueAttribute: "id",
                textAttribute: "name",
              },
              {
                type: "input",
                inputType: "tel",
                label: this.$t("profile.phone"),
                placeholder: this.$t("profile.phone"),
                model: "phone",

                validator: this.validator,
              },
            ],
          },
          {
            legend: this.$t("auth.for_experts.practice"),
            fields: [
              {
                type: "richselect",
                label: this.$t("profile.position"),
                model: "position",
                values: this.expertPositions,
                styleClasses: "reach_select",
                validator: this.validator,
                valueAttribute: "id",
                textAttribute: "name",
              },
              {
                type: "checklist",
                label: this.$t("profile.specialisation"),
                model: "categories",
                listBox: true,
                values: this.expertCategories,
                checklistOptions: {
                  value: "id",
                },
                styleClasses: "fullwidth",
              },
              {
                type: "textArea",
                label: this.$t("profile.biography"),
                model: "bio",
                max: 5000,
                placeholder: this.$t("profile.biography_placeholder"),
                styleClasses: "fullwidth",
              },
              {
                type: "textArea",
                label: this.$t("profile.background"),
                model: "about",
                max: 5000,
                placeholder: this.$t("profile.background_placeholder"),
                styleClasses: "fullwidth",
              },
              {
                type: "checkbox",
                label: this.$t("auth.for_experts.terms_conditions"),
                model: "status",
                default: true,
                styleClasses: "fullwidth",
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
        ],
      };
    },
  },

  async created() {
    const countries = await this.$axios.$get("/countries");
    this.countries = countries.data;

    const expertPositions = await this.$axios.$get("/expert-positions");
    this.expertPositions = expertPositions.data;

    const expertCategories = await this.$axios.$get("/expert-categories");
    this.expertCategories = expertCategories.data;

    this.loaded = true;
  },

  methods: {
    async onSubmit() {
      try {
        await this.$axios.post("/auth/register/expert", this.model);

        this.$auth.loginWith("local", { data: this.model }).then(async () => {
          await this.$router.push("/panel/expert");
        });
      } catch (e) {
        this.setApiErrors(e);
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
label {
  font-weight: 800;
  color: #0b252e;
}
</style>
