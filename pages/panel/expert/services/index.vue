<template>
  <PanelPageWrapper class="bg-gray-200">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-medium font-manrope xl:text-7xl">
        {{ $t("services.title_pl") }}
      </div>
      <nuxt-link
        to="/panel/expert/services/create"
        class="font-medium text-xl leading-6 bg-white border border-[#A8A8A8] px-10 py-2.5 md:px-14 md:py-4 rounded-full"
      >
        + {{ $t("buttons.create") }}
      </nuxt-link>
    </div>

    <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 xl:gap-8">
      <template v-if="services.length > 0">
        <div
          v-for="service in services"
          :key="service.id"
          class="bg-white overflow-hidden border border-[#D3EAF2] service-item flex flex-col xl:flex-row"
        >
          <div class="service-item__image flex-shrink-0" v-if="service.image_url">
            <img
              :src="service.image_url"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="p-8 xl:px-12 xl:py-14 flex flex-col justify-between flex-1">
            <div class="flex flex-col xl:flex-row gap-4 md:gap-10">
              <div>
                <div class="text-xl md:text-3xl leading-8">{{ service.name }}</div>
                <div v-if="service.description" class="text-base md:text-xl leading-6 mt-4 md:mt-8">
                  {{ service.description }}
                </div>
              </div>
              <div class="w-[150px] flex-shrink-0">
                <table class="text-3xl font-medium leading-10 w-full">
                  <tbody>
                    <template v-for="(price, index) in service.prices">
                      <tr :key="index">
                      <td class="w-10 py-1">
                        {{ price.sessions }}
                      </td>
                      <td class="w-10 py-1">
                        <svg-icon name="x" class="w-4 h-4" />
                      </td>
                      <td class="w-10 py-1">{{ price.price }}$</td>
                    </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="mt-8 flex flex-col xl:flex-row justify-between xl:items-center">
              <div class="inline-flex items-center">
                <svg-icon :name="`gender-${service.target}`" class="w-8 h-8" />
                <span class="ml-4 text-2xl">
                  {{ $t(`services.targets.${service.target}`) }}
                </span>
              </div>
              <div class="flex flex-col sm:flex-row mt-8 xl:mt-0 gap-3">
                <nuxt-link
                  :to="`/panel/expert/services/${service.id}`"
                  class="bg-blue-50 border border-blue-50 text-white rounded-full text-lg leading-5 font-medium text-center px-10 py-2.5"
                >
                  {{ $t("buttons.edit") }}
                </nuxt-link>
                <button
                  @click="deleteService(service)"
                  class="border border-[#A8A8A8] rounded-full text-lg leading-5 font-medium text-center px-10 py-2.5"
                >
                  {{ $t("buttons.delete") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="py-28 px-3 text-center">
        {{ $t("messages.no_results") }}
      </div>
    </div>
  </PanelPageWrapper>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";

export default {
  layout: "panel",

  components: {
    PanelPageWrapper,
  },

  async asyncData({ $axios, error, $auth }) {
    try {
      const userID = $auth?.user.id;
      const { data } = await $axios.$get(`/experts/${userID}/services`);
      return {
        services: data,
      };
    } catch (err) {
      error(err);
    }
  },

  head() {
    return {
      title: this.$t("services.title_pl"),
    };
  },

  methods: {
    async deleteService(service) {
      if (confirm(this.$t("confirmations.you_sure"))) {
        try {
          await this.$axios.$delete(`/services/${service.id}`);
          const index = this.services.indexOf(service);
          if (index !== -1) {
            this.services.splice(index, 1);
          }
        } catch (err) {
          //
        }
      }
    },
  },
};
</script>

<style scoped>
.service-item {
  border-radius: 40px;
}

.service-item__image {
  @apply xl:w-[350px] h-[350px] xl:h-full;
}
</style>
