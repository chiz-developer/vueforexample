<template>
  <div>
    <div class="flex flex-col items-center justify-between mb-32 lg:flex-row">
      <PageTitle class="lowercase first-letter:uppercase">
        {{ isEditMode ? $t("buttons.edit") : $t("buttons.add") }}
        {{ $t("navbar.news_category") }}
      </PageTitle>
      <div class="flex gap-12 my-4">
        <button
          v-for="loc in $i18n.locales"
          :key="loc.code"
          class="text-2xl font-medium border-blue-900"
          :class="{ 'border-b-2': locale === loc.code }"
          @click="locale = loc.code"
        >
          {{ loc.name }}
        </button>
      </div>
    </div>
    <form @submit.prevent="submit">
      <div
        class="flex flex-col-reverse items-center justify-between w-full  lg:flex-row"
      >
        <div class="w-full">
          <vue-form-generator
            ref="form1"
            :schema="formDetailsSchema"
            :model="category"
            :options="formOptions"
          >
          </vue-form-generator>
        </div>
      </div>

      <p class="my-4 text-red-500" v-if="errorMessage">
        {{ errorMessage }}
      </p>
      <slot>
        <div class="mt-6">
          <button
            type="submit"
            class="w-full font-medium transition duration-300 ease-in  btn primary hover:scale-110 lg:w-auto"
          >
            {{ $t("buttons.save") }}
          </button>
        </div>
      </slot>
    </form>
  </div>
</template>

<script>
import formGenerator from "@/mixins/formGenerator";
import { serialize } from "object-to-formdata";
import PageTitle from "~/components/layout/pageTitle.vue";

export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  components: {
    PageTitle,
  },
  mixins: [formGenerator],
  name: "UpdateOrCreateNewsCategory",

  data() {
    return {
      locale: "en",
      errorMessage: null,
      vfgRefs: ["form1"],
      category: {
        name: {
          en: "",
          ar: "",
        },
      },
    };
  },
  created() {
    if (this.item) {
      this.category = this.item;
    }
  },

  computed: {
    isEditMode() {
      return this.item !== null;
    },

    formDetailsSchema() {
      return {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: this.$t("news.title"),
            placeholder: this.$t("news.title"),
            model: `name.${this.locale}`,
            validator: this.validator,
            styleClasses: "fullwidth",
            required: true,
          },
        ],
      };
    },
  },
  methods: {
    async submit() {
      let data = this.category;
      data = serialize(this.category, { indices: true });

      try {
        if (this.isEditMode) {
          await this.$axios.$post(`/news/categories/${this.item.id}`, data);
          this.$toast.success(this.$t("messages.updated"));
          await this.$router.push(`/panel/admin/news/category`);
        } else {
          await this.$axios.$post("/news/categories", data);
          this.$toast.success(this.$t("messages.saved"));
          await this.$router.push(`/panel/admin/news/category`);
        }
      } catch (e) {
        this.setApiErrors(e);
      }
    },
  },
};
</script>
