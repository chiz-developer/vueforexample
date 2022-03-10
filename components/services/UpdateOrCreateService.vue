<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div class="text-3xl font-medium font-manrope xl:text-7xl">
        {{ isEditMode ? $t("buttons.edit") : $t("buttons.add") }}
        {{ $t("services.title") }}
      </div>
      <div class="flex gap-12 mt-4 sm:mt-0">
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

    <div
      class="flex flex-col justify-between gap-16 mt-12 lg:flex-row xl:gap-32"
    >
      <form @submit.prevent="submit" class="lg:w-2/4">
        <vue-form-generator
          ref="form"
          :schema="formSchema"
          :model="service"
          :options="formOptions"
        >
        </vue-form-generator>

        <GenderPicker v-model="service.target" />
      </form>

      <div class="lg:w-1/3">
        <div class="mb-16">
          <ImagePicker v-model="serviceImage" :preview="service.image_url" />
          <div v-if="errors.hasOwnProperty('image')" class="mt-8">
            <span
              v-for="(errors, index) in errors.image"
              :key="index"
              class="text-[#f88a8a]"
            >
              {{ errors }}
            </span>
          </div>
        </div>
        <template v-if="!service.free">
          <div class="flex items-center justify-between mb-10">
            <div class="text-4xl font-medium">{{ $t("services.prices") }}</div>
            <button
              @click="updateOrCreatePrice(null)"
              type="submit"
              class="py-2 text-xl font-medium leading-6 text-white border rounded-full bg-blue-50 border-blue-50 px-14"
            >
              + {{ $t("buttons.add") }}
            </button>
          </div>
          <table class="w-full text-3xl font-medium leading-10">
            <tbody>
              <tr v-for="(price, index) in service.prices" :key="index">
                <td class="w-10 py-5 border-t border-gray-50">
                  {{ price.sessions }}
                </td>
                <td class="w-10 py-5 border-t border-gray-50">
                  <svg-icon name="x" class="w-4 h-4" />
                </td>
                <td class="w-10 py-5 border-t border-gray-50">
                  {{ price.price }}$
                </td>
                <td class="py-5 border-t border-gray-50">
                  <div class="flex items-center justify-end gap-10">
                    <button @click="updateOrCreatePrice(price)">
                      <svg-icon name="edit" class="w-9 h-9" />
                    </button>
                    <button @click="removePrice(price)">
                      <svg-icon name="trash" class="w-9 h-9" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="errors.hasOwnProperty('prices')">
            <span
              v-for="(errors, index) in errors.prices"
              :key="index"
              class="text-[#f88a8a]"
            >
              {{ errors }}
            </span>
          </div>
        </template>
      </div>
    </div>

    <div class="flex flex-col gap-4 mt-4 sm:flex-row sm:gap-28">
      <button
        @click="submit"
        class="py-4 text-xl font-medium leading-6 text-center text-white border rounded-full bg-blue-50 border-blue-50 px-14"
      >
        {{ $t("buttons.save") }}
      </button>
      <nuxt-link
        to="/panel/expert/services"
        class="
          text-center
          font-medium
          text-xl
          leading-6
          bg-white
          border border-[#A8A8A8]
          px-14
          py-4
          rounded-full
        "
      >
        {{ $t("buttons.cancel") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";
import formGenerator from "~/mixins/formGenerator";
import GenderPicker from "~/components/controls/GenderPicker.vue";
import UpdateOrCreateServicePrice from "~/components/modals/UpdateOrCreateServicePrice.vue";
import { serialize } from "object-to-formdata";
import ImagePicker from "~/components/controls/imagePicker.vue";

export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
  },

  components: {
    PanelPageWrapper,
    GenderPicker,
    ImagePicker,
  },

  mixins: [formGenerator],

  data() {
    return {
      locale: "en",
      service: {
        name: {
          en: "",
          ar: "",
        },
        description: {
          en: "",
          ar: "",
        },
        target: "unisex",
        free: false,
        duration: null,
        prices: [],
        image_url: null,
      },
      serviceImage: null,
    };
  },

  created() {
    if (this.item) {
      this.service = this.item;
    }
  },

  computed: {
    isEditMode() {
      return this.item !== null;
    },

    formSchema() {
      return {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: this.$t("services.name"),
            placeholder: this.$t("services.name_placeholder"),
            model: `name.${this.locale}`,
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "textArea",
            inputType: "text",
            label: this.$t("services.description"),
            placeholder: this.$t("services.description_placeholder"),
            model: `description.${this.locale}`,
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "input",
            inputType: "text",
            label: "Service Duration (in minutes)",
            placeholder: "One serivce session duration",
            model: "duration",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "checkbox",
            label: "Free Discovery Session",
            model: "free",
            default: false,
            styleClasses: "fullwidth",
            validator: this.validator,
          },
        ],
      };
    },
  },

  methods: {
    updateOrCreatePrice(item = null) {
      this.$modal.show(
        UpdateOrCreateServicePrice,
        {
          item,
          callback: (data) => {
            if (item) {
              const index = this.service.prices.indexOf(item);
              if (index !== -1) {
                this.$set(this.service.prices, index, data);
              }
            } else {
              this.service.prices.push(data);
            }
          },
        },
        {
          width: 380,
          height: "auto",
        }
      );
    },

    removePrice(item) {
      if (confirm(this.$t("confirmations.you_sure"))) {
        const index = this.service.prices.indexOf(item);
        if (index !== -1) {
          this.service.prices.splice(index, 1);
        }
      }
    },

    async submit() {
      let data = this.service;

      if (this.serviceImage) {
        data.image = this.serviceImage;
      }

      data = serialize(this.service, { indices: true });

      try {
        if (this.isEditMode) {
          await this.$axios.$post(`/services/${this.item.id}`, data);
          this.$toast.success(this.$t("messages.updated"));
        } else {
          const { id } = await this.$axios.$post("/services", data);
          await this.$router.push(`/panel/expert/services/${id}`);
        }
      } catch (err) {
        this.setApiErrors(err);
      }
    },
  },
};
</script>
