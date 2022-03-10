<template>
  <div>
    <Panel class="mt-16" :title="$t('expert.config.details.title')">
      <vue-form-generator
        v-if="model"
        ref="form"
        :schema="schema"
        :model="model"
        :options="formOptions"
      />
    </Panel>
    <Panel class="mt-16" title="Payment details">
      <vue-form-generator
        v-if="model"
        ref="form2"
        :schema="paymentDetailsSchema"
        :model="model"
        :options="formOptions"
      />
      <div class="bg-pink-50 px-5 py-4 rounded-md">
        <strong>{{ $t('warning') }}!</strong> {{ $t('messages.check_before_saving') }}
      </div>
    </Panel>
  </div>
</template>

<script>
import formGenerator from "@/mixins/formGenerator";
import Panel from "@/components/layout/Panel";

export default {
  name: "ExpertDetailsEditor",
  mixins: [formGenerator],

  components: {
    Panel,
  },

  data() {
    return {
      model: null,
      countries: [],
      vfgRefs: ["form", "form2"],
    };
  },

  async fetch() {
    try {
      const {
        data: { details },
      } = await this.$axios.$get(`/experts/${this.userID}/details`);
      this.model = details;
    } catch (err) {
      //
    }
  },

  created() {
    this.fetchCountries();
  },

  computed: {
    userID() {
      return this.$auth?.user.id;
    },

    schema() {
      return {
        fields: [
          {
            type: "slider",
            label: this.$t("expert.config.details.duration"),
            model: "session_duration",
            data: this.getValuesRange(15, 180, 15),
            tooltip: "active",
            ref: "session_duration",
            validator: this.validator,
          },

          {
            type: "slider",
            label: this.$t("expert.config.details.gap"),
            model: "session_gap",
            data: this.getValuesRange(0, 60, 1),
            validator: this.validator,
          },

          {
            type: "textArea",
            label: this.$t("expert.config.details.bio"),
            placeholder: this.$t("expert.config.details.bio_ph"),
            model: "bio",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "textArea",
            label: this.$t("expert.config.details.about"),
            placeholder: this.$t("expert.config.details.about_ph"),
            model: "about",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
        ],
      };
    },

    paymentDetailsSchema() {
      return {
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
            disabled: this.model.status === "active",
          },
          {
            type: "input",
            inputType: "tel",
            label: this.$t("profile.phone"),
            placeholder: this.$t("profile.phone"),
            model: "phone",
            validator: this.validator,
            disabled: this.model.status === "active",
          },
          {
            type: "input",
            inputType: "text",
            label: "IBAN",
            placeholder: "IBAN number for bank transactions",
            model: "iban",
            styleClasses: "fullwidth",
            validator: this.validator,
            disabled: this.model.status === "active",
          },
        ],
      };
    },
  },

  methods: {
    getValuesRange(from, to, step) {
      let range = [];
      for (let a = from; a <= to; a = a + step) {
        range.push(a);
      }
      return range;
    },

    submit() {
      return new Promise((resolve) => {
        this.$axios
          .$post(`/experts/${this.userID}/details`, this.model)
          .then(({ data }) => {
            this.model.is_payment_details_filled =
              data.is_payment_details_filled;
            resolve();
          })
          .catch((error) => {
            this.setApiErrors(error);
          });
      });
    },

    async fetchCountries() {
      try {
        const { data } = await this.$axios.$get("/countries");
        this.countries = data;
      } catch (err) {
        //
      }
    },
  },
};
</script>
