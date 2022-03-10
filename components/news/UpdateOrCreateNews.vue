<template>
  <div>
    <div class="flex flex-col items-center justify-between mb-32 lg:flex-row">
      <PageTitle>
        {{ isEditMode ? $t("buttons.edit") : $t("buttons.add") }}
        {{ $t("navbar.news") }}
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
            v-if="categories.length"
            @model-updated="onModelUpdated"
            :schema="formDetailsSchema"
            :model="news"
            :options="formOptions"
          >
          </vue-form-generator>
        </div>
        <div v-if="this.postId" class="w-full mb-8">
          <ImagePicker v-model="newsImage" :preview="news.image_url" />
          <div
            v-if="errors.hasOwnProperty('cover_image')"
            class="mt-8 text-center"
          >
            <span
              v-for="(errors, index) in errors.cover_image"
              :key="index"
              class="text-[#f88a8a]"
            >
              {{ errors }}
            </span>
          </div>
        </div>
      </div>
      <vue-form-generator
        ref="form2"
        :schema="formEditorSchema"
        :model="news"
        :options="formOptions"
      >
      </vue-form-generator>

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
import ImagePicker from "~/components/controls/imagePicker.vue";
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
    ImagePicker,
    PageTitle,
  },
  mixins: [formGenerator],
  name: "UpdateOrCreateNews",

  data() {
    return {
      locale: "en",
      errorMessage: null,
      categories: [],
      postId: null,
      onChangeInput: false,
      vfgRefs: ["form1", "form2"],
      news: {
        title: {
          en: "",
          ar: "",
        },
        content: {
          en: "",
          ar: "",
        },
        image_url: null,
        categories: null,
      },
      newsImage: null,
    };
  },
  created() {
    if (this.item) {
      let titleJson = {
        en: "",
        ar: "",
      };
      let contentJson = {
        en: "",
        ar: "",
      };
      this.news.title =
        Object.entries(this.item.title).length > 0
          ? this.item.title
          : titleJson;
      this.news.content =
        Object.entries(this.item.content).length > 0
          ? this.item.content
          : contentJson;
      this.news.image_url = this.item.image_url;
      this.news.categories = this.item.categories.map((item) => item.id);
      this.postId = this.item.id;
    }
  },
  async fetch() {
    let response = await this.$axios.$get("news/categories");
    this.categories = response.data;
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
            model: `title.${this.locale}`,
            validator: this.validator,
            styleClasses: "fullwidth",
          },
          {
            type: "richselect",
            label: this.postId ? this.$t("news.category") : "",
            model: "categories",
            multiple: true,
            values: this.categories,
            styleClasses: "reach_select",
            validator: this.validator,
            valueAttribute: "id",
            hidden: this.postId ? false : true,
            textAttribute: `name.${this.locale}`,
            styleClasses: "fullwidth",
          },
        ],
      };
    },
    formEditorSchema() {
      return {
        fields: [
          {
            type: "vue2editor",
            label: this.postId ? this.$t("news.content") : "",
            model: `content.${this.locale}`,
            validator: this.validator,
            valueAttribute: "id",
            hidden: this.postId ? false : true,
            styleClasses: "fullwidth",
            useCustomImageHandler: true,
            required: true,

            handleImageAdded: async (
              file,
              Editor,
              cursorLocation,
              resetUploader
            ) => {
              const data = {
                source_type: "News",
                file: file,
                source_id: this.postId,
              };
              var formData = new FormData();
              for (const key in data) {
                formData.append(key, data[key]);
              }

              await this.$axios
                .post("/media", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((result) => {
                  const data = result.data.original;
                  Editor.insertEmbed(cursorLocation, "image", data.url);
                  resetUploader();
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          },
        ],
      };
    },
  },
  methods: {
    async onModelUpdated(model, schema) {
      if (
        schema == "title.en" &&
        !this.postId &&
        !this.item &&
        !this.onChangeInput
      ) {
        this.onChangeInput = true;
        let response = await this.$axios.$post("/news");
        this.postId = response.id;
      }
    },
    async submit() {
      let data = this.news;
      if (this.newsImage) {
        data.cover_image = this.newsImage;
      }
      data = serialize(this.news, { indices: true });
      try {
        if (this.isEditMode) {
          await this.$axios.$post(`/news/${this.item.id}`, data);
          this.$toast.success(this.$t("messages.updated"));
          await this.$router.push(`/panel/admin/news`);
        } else {
          await this.$axios.$post(`/news/${this.postId}`, data);
          this.$toast.success(this.$t("messages.saved"));
          await this.$router.push(`/panel/admin/news`);
        }
      } catch (e) {
        this.setApiErrors(e);
      }
    },
  },
};
</script>
