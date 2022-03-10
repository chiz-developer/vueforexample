<template>
  <form @submit.prevent="submit" class="px-4 py-6 lg:p-10">
    <div class="text-3xl lg:text-4xl mb-5 lg:mb-10 font-medium font-manrope">
      {{ $t('buttons.leave_review') }}
    </div>
    <div class="flex flex-col">
      <div class="service-item bg-white flex flex-col lg:flex-row gap-6">
        <img
          class="service-image object-cover"
          :src="service.image_thumb_url"
        />
        <div class="flex flex-col justify-between gap-3 flex-1">
          <div class="flex flex-col lg:flex-row justify-between gap-5">
            <div class="space-y-3 flex-1">
              <div class="font-bold text-xl font-manrope">
                {{ service.name }}
              </div>
              <div
                v-if="service.description"
                class="leading-6 text-base font-light"
              >
                {{ service.description }}
              </div>
            </div>
            <div
              class="lg:text-right flex flex-col-reverse lg:flex-col lg:items-end gap-2"
            >
              <div class="inline-flex items-center gap-2.5">
                <svg-icon :name="`gender-${service.target}`" class="w-6 h-6" />
                <div>
                  {{ $t(`services.targets.${service.target}`) }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center gap-3">
            <div class="inline-flex gap-3">
              <img
                v-if="service.expert.avatar_thumb"
                :src="service.expert.avatar_thumb"
                class="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <div class="font-bold text-lg font-manrope leading-6">
                  {{ service.expert.full_name }}
                </div>
                <div class="text-base font-light text-gray-500">
                  {{ service.expert.position.name }}
                </div>
              </div>
            </div>
            <div>
              <div class="text-lg uppercase">
                {{
                  $tc("services.sessions_left", service.sessions_left, {
                    count: service.sessions_left,
                  })
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <vue-form-generator
        ref="form"
        :schema="schema"
        :model="form"
        :options="formOptions"
      />
    </div>

    <div>
      <button
        type="submit"
        class="border border-[#C4C4C4] hover:border-blue-50 hover:bg-blue-50 hover:text-white py-3.5 px-6 rounded-full"
      >
        {{ $t('buttons.leave_review') }}
      </button>
    </div>
  </form>
</template>

<script>
import formGenerator from "@/mixins/formGenerator";

export default {
  mixins: [formGenerator],

  props: {
    service: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        content: "",
        score: 0,
      },
    };
  },

  computed: {
    schema() {
      return {
        fields: [
          {
            type: "textArea",
            label: this.$t("fields.review"),
            placeholder: this.$t("expert.config.details.bio_ph"),
            model: "content",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "starRating",
            label: this.$t("fields.score"),
            model: "score",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
        ],
      };
    },
  },

  methods: {
    async submit() {
      try {
        await this.$axios.$post('/testimonials', {
          service_id: this.service.id,
          ...this.form
        })

        this.$toast.success(this.$t('messages.thanks_for_review'))
        this.$emit('close')
      } catch (err) {
        this.setApiErrors(err);
      }
    }
  }
};
</script>

<style scoped>
.service-image {
  width: 160px;
  height: 160px;
  border-radius: 21px;
}
</style>
