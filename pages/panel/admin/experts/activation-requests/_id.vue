<template>
  <PanelPageWrapper>
    <PageTitle>{{ $t("activation_requests.title") }}</PageTitle>
    <div class="mt-16">
      <div class="uppercase text-2xl font-semibold mb-3">
        {{ $t("dashboard.expert.title") }}
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-10">
        <div>
          <div class="border border-gray-300 p-5 rounded-xl">
            <div class="flex flex-col md:flex-row gap-10">
              <div v-if="item.expert.avatar_thumb">
                <img
                  :src="item.expert.avatar_thumb"
                  class="w-28 h-28 object-cover rounded-full"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <div class="uppercase text-sm font-semibold mb-1">
                    {{ $t("profile.full_name") }}
                  </div>
                  <div>{{ item.expert.full_name }}</div>
                </div>
                <div>
                  <div class="uppercase text-sm font-semibold mb-1">
                    {{ $t("profile.email") }}
                  </div>
                  <div>{{ item.expert.email }}</div>
                </div>
                <div>
                  <div class="uppercase text-sm font-semibold mb-1">
                    {{ $t("profile.country") }}
                  </div>
                  <div>{{ item.expert.country }}</div>
                </div>
                <div v-if="item.expert.position">
                  <div class="uppercase text-sm font-semibold mb-1">
                    {{ $t("activation_requests.position") }}
                  </div>
                  <div>{{ item.expert.position.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border border-gray-300 p-5 rounded-xl">
          <div>
            <div>
              <div class="uppercase text-sm font-semibold mb-1">
                {{ $t("expert.config.details.about") }}
              </div>
              <div>{{ item.expert.details.about || "-" }}</div>
            </div>
          </div>

          <div class="mt-3">
            <div>
              <div class="uppercase text-sm font-semibold mb-1">
                {{ $t("expert.config.details.bio") }}
              </div>
              <div>{{ item.expert.details.bio || "-" }}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="uppercase text-2xl font-semibold mb-3">
            {{ $t("order.payment_details") }}
          </div>
          <div class="border border-gray-300 p-5 rounded-xl">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-2.5 gap-y-5">
              <div>
                <div class="uppercase text-sm font-semibold mb-1">
                  {{ $t("profile.country") }}
                </div>
                <div>{{ item.expert.details.country.name }}</div>
              </div>
              <div>
                <div class="uppercase text-sm font-semibold mb-1">
                  {{ $t("profile.phone") }}
                </div>
                <div>{{ item.expert.details.phone }}</div>
              </div>
              <div>
                <div class="uppercase text-sm font-semibold mb-1">
                  {{ $t("profile.email") }}
                </div>
                <div>{{ item.expert.email }}</div>
              </div>
              <div>
                <div class="uppercase text-sm font-semibold mb-1">
                  {{ $t("profile.iban") }}
                </div>
                <div>{{ item.expert.details.iban || "-" }}</div>
              </div>
              <!--<div>
                <div class="uppercase text-sm font-semibold mb-1">
                  {{ $t('activation_requests.tap_business_id') }}
                </div>
                <div>{{ item.expert.details.tap_business_id || "-" }}</div>
              </div>
              <div>
                <div class="uppercase text-sm font-semibold mb-1">
                  {{ $t('activation_requests.tap_destination_id') }}
                </div>
                <div>{{ item.expert.details.tap_destination_id || "-" }}</div>
              </div>-->
            </div>
            <div
              class="bg-pink-50 px-5 py-4 rounded-md mt-5"
              v-if="errors.hasOwnProperty('tap')"
            >
              {{ errors.tap[0] }}
            </div>
          </div>
        </div>
        <div>
          <div class="uppercase text-2xl font-semibold mb-3">
            {{ $t("expert.config.workinghours.title") }}
          </div>
          <div class="border border-gray-300 p-5 rounded-xl">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-2.5 gap-y-5">
              <div
                v-for="workingHour in item.expert.working_hours"
                :key="workingHour.day_of_week"
              >
                <div class="uppercase text-sm font-semibold mb-1">
                  {{ dayOfWeeks[workingHour.day_of_week - 1] }}
                </div>
                <div v-if="workingHour.day_off">
                  {{ $t("expert.config.workinghours.day_off") }}
                </div>
                <div v-else>{{ workingHour.from }} — {{ workingHour.to }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <div class="uppercase text-2xl font-semibold mb-3">
          {{ $t("services.title_pl") }}
        </div>
        <div class="space-y-5">
          <div
            class="flex flex-col md:flex-row border border-gray-300 p-5 rounded-xl gap-5"
            v-for="service in item.expert.services"
            :key="service.id"
          >
            <img
              v-if="service.image_thumb_url"
              class="w-40 h-40 object-cover rounded-xl flex-shrink-0"
              :src="service.image_thumb_url"
              :alt="service.name"
            />
            <div class="flex-1 flex flex-col justify-between gap-5">
              <div>
                <h3 class="font-extrabold text-black card-title text-2xl">
                  {{ service.name }}
                </h3>
                <div class="text-base leading-6 mt-2">
                  {{ service.description }}
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="inline-flex items-center gap-2.5">
                  <svg-icon
                    :name="`gender-${service.target}`"
                    class="w-5 h-5"
                  />
                  <div>{{ $t(`services.targets.${service.target}`) }}</div>
                </div>
                <div>
                  {{ $t("services.duration", { min: service.duration }) }}
                </div>
              </div>
            </div>
            <div
              class="space-y-3 flex flex-col sm:items-center sm:justify-center"
            >
              <div
                v-for="price in service.prices"
                :key="price.sessions"
                class="flex items-center gap-2"
              >
                <span>{{ price.sessions }}</span>
                <svg-icon name="x" class="w-4 h-4" />
                <span>{{ price.price }}$</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <div class="flex flex-col sm:flex-row mt-8 xl:mt-0 gap-3">
          <button
            @click="approve"
            :disabled="isLoading"
            class="bg-blue-50 border border-blue-50 text-white rounded-full text-lg leading-5 font-medium text-center px-10 py-2.5"
          >
            <svg-icon
              v-if="isLoading"
              class="inline-block mr-2 w-4 h-4 animate-spin"
              name="loading"
            />
            <span>{{ $t("activation_requests.approve") }}</span>
          </button>
          <button
            @click="reject"
            class="border border-[#A8A8A8] rounded-full text-lg leading-5 font-medium text-center px-10 py-2.5"
          >
            {{ $t("activation_requests.reject") }}
          </button>
        </div>
      </div>
    </div>
  </PanelPageWrapper>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";
import PageTitle from "~/components/layout/pageTitle.vue";

export default {
  components: {
    PanelPageWrapper,
    PageTitle,
  },

  layout: "panel",
  middleware: ["authorized"],

  data() {
    return {
      isLoading: false,
      errors: {},
    };
  },

  async asyncData({ $axios, error, params }) {
    try {
      const { data } = await $axios.$get(
        `/experts/activation-requests/${params.id}`
      );

      return {
        item: data,
      };
    } catch (err) {
      error(err);
    }
  },

  computed: {
    dayOfWeeks() {
      const dates = [];
      let currentDate = this.$dayjs().startOf("isoWeek");
      const endDate = this.$dayjs().endOf("isoWeek");

      while (endDate.isSameOrAfter(currentDate, "day")) {
        dates.push(currentDate.format("dddd"));
        currentDate = currentDate.add(1, "day");
      }

      return dates;
    },
  },

  head() {
    return {
      title: this.$t("activation_requests.title"),
    };
  },

  methods: {
    async approve() {
      if (!this.item.expert.details.is_payment_details_filled) {
        this.$toast.error(this.$t("activation_requests.no_payment_info"));
        return;
      }

      this.isLoading = true;
      this.errors = {};

      if (confirm(this.$t("activation_requests.approve_conf"))) {
        try {
          await this.$axios.$put(
            `/experts/activation-requests/${this.item.id}`,
            {
              status: "approved",
            }
          );

          await this.$router.push("/panel/admin/experts/activation-requests");
        } catch (err) {
          if (err.response?.status === 422) {
            this.errors = err.response.data.errors;
          }
        } finally {
          this.isLoading = false;
        }
      }
    },

    async reject() {
      const message = prompt(this.$t("activation_requests.reject_message"));

      if (!message) {
        return;
      }

      try {
        await this.$axios.$put(`/experts/activation-requests/${this.item.id}`, {
          status: "rejected",
          message,
        });

        await this.$router.push("/panel/admin/experts/activation-requests");
      } catch (err) {
        //
      }
    },
  },
};
</script>
