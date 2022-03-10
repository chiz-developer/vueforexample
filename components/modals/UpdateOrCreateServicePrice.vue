<template>
  <form @submit.prevent="submit" class="p-10">
    <vue-form-generator
      ref="form"
      :schema="formSchema"
      :model="form"
      :options="formOptions"
    >
    </vue-form-generator>
    <div v-if="isError" class="text-[#f88a8a] my-3">
      {{ $t("messages.invalid_data") }}
    </div>
    <div class="flex gap-3">
      <button
        type="submit"
        class="font-medium text-xl leading-6 bg-blue-50 border border-blue-50 px-10 py-2 rounded-full text-white"
      >
        {{ item ? $t("buttons.save") : "+ " + $t("buttons.add") }}
      </button>
      <button
        @click="$emit('close')"
        class="font-medium text-xl leading-6 bg-white border border-[#A8A8A8] rounded-full px-10 py-2"
      >
        {{ $t("buttons.cancel") }}
      </button>
    </div>
  </form>
</template>

<script>
import formGenerator from "~/mixins/formGenerator";

export default {
  name: "UpdateOrCreateServicePrice",

  mixins: [formGenerator],

  props: {
    item: {
      type: Object,
      default: null,
    },
    callback: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      isError: false,
      form: {
        sessions: "",
        price: "",
      },
    };
  },

  created() {
    if (this.item) {
      this.form = this.item;
    }
  },

  computed: {
    formSchema() {
      return {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Number of sessions",
            model: `sessions`,
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "input",
            inputType: "text",
            label: "Price",
            model: `price`,
            styleClasses: "fullwidth",
            validator: this.validator,
          },
        ],
      };
    },
  },

  methods: {
    submit() {
      let data = { ...this.form };
      data.sessions = parseInt(data.sessions);
      data.price = parseFloat(data.price);

      if (data.sessions && data.price) {
        this.callback(data);
        this.$emit("close");
        return;
      } else {
        this.isError = true
      }
    },
  },
};
</script>
