<template>
  <div
    class="flex flex-col-reverse justify-between w-full space-y-4 bg-gray-200 xl:flex-row lg:space-y-0 min-h-screen"
  >
    <div class="py-12 2xl:py-16 px-4 2xl:px-12">
      <p
        class="hidden mb-4 text-3xl font-medium font-manrope md:text-7xl xl:block"
      >
        {{ $t("dashboard.title") }}
      </p>
      <div>
        <Events :services-count="services.length" />
      </div>

      <div class="mt-12" v-if="services.length > 0">
        <div class="mb-8 text-2xl font-medium font-manrope lg:text-3xl">
          {{ $t("dashboard.user.paid_services") }}
        </div>
        <div class="flex sm:grid sm:grid-cols-2 2xl:grid-cols-1 gap-5">
          <div
            v-for="service in services"
            :key="service.id"
            class="service-item bg-white border border-blue-10 p-4 md:p-8 flex flex-col 2xl:flex-row gap-6"
          >
            <img
              class="service-image object-cover"
              :src="service.image_thumb_url"
            />
            <div class="flex flex-col justify-between gap-5 flex-1">
              <div
                class="flex flex-col 2xl:flex-row justify-between gap-5 2xl:gap-16"
              >
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
                  class="flex 2xl:block gap-5 2xl:gap-0 items-center 2xl:text-right"
                >
                  <div
                    class="uppercase price font-manrope text-2xl xl:text-4xl"
                  >
                    <span class="text-blue-50 font-extrabold">
                      ${{ service.price }}
                    </span>
                  </div>
                  <div class="text-lg uppercase 2xl:mt-2">
                    {{
                      $tc("services.sessions_left", service.sessions_left, {
                        count: service.sessions_left,
                      })
                    }}
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col-reverse 2xl:flex-row gap-5 justify-between"
              >
                <div
                  class="flex flex-wrap 2xl:flex-row gap-5 items-center justify-center"
                >
                  <div class="flex flex-wrap 2xl:flex-row gap-2.5">
                    <button
                    @click="showScheduleAppointmentModal(service.id)"
                    class="border border-[#C4C4C4] hover:border-blue-50 hover:bg-blue-50 hover:text-white py-3.5 px-6 rounded-full"
                  >
                    {{ $t("buttons.schedule_appointment") }}
                  </button>
                  <button
                    v-if="service.sessions_left < service.sessions && service.testimonials_count < 1"
                    @click="showLeaveReviewModal(service.id)"
                    class="border border-[#C4C4C4] hover:border-blue-50 hover:bg-blue-50 hover:text-white py-3.5 px-6 rounded-full"
                  >
                    {{ $t('buttons.leave_review') }}
                  </button>
                  </div>
                  <div class="inline-flex items-center gap-2.5">
                    <svg-icon
                      :name="`gender-${service.target}`"
                      class="w-6 h-6"
                    />
                    <div>{{ $t(`services.targets.${service.target}`) }}</div>
                  </div>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- profile info block -->
    <ProfileInfo />
    <div class="block py-8 xl:hidden">
      <p class="text-3xl font-medium font-manrope md:text-7xl">
        {{ $t("dashboard.title") }}
      </p>
    </div>
  </div>
</template>

<script>
import Panel from "@/components/layout/Panel";
import Events from "@/components/user/Events.vue";
import ProfileInfo from "@/components/layout/ProfileInfo.vue";
import CreateNewAppointment from "@/components/modals/CreateNewAppointment.vue";
import CreateTestimonial from "@/components/modals/CreateTestimonial.vue";

export default {
  name: "UserDashboard",
  layout: "panel",
  components: { Panel, Events, ProfileInfo },
  //   middleware: ["authorized", "client"],

  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.$get("/user/services");

      return {
        services: data,
      };
    } catch (err) {
      error(err);
    }
  },

  methods: {
    showScheduleAppointmentModal(serviceId) {
      this.$modal.show(
        CreateNewAppointment,
        {
          serviceId,
        },
        {
          width: 1000,
          height: "auto",
          scrollable: true,
          adaptive: true,
        }
      );
    },

    showLeaveReviewModal(serviceId) {
      const service = this.services.find((s) => s.id === serviceId);

      this.$modal.show(
        CreateTestimonial,
        {
          service,
        },
        {
          width: 880,
          height: "auto",
          scrollable: true,
          adaptive: true,
        }
      );
    },
  },

  head() {
    return {
      title: this.$t("dashboard.title"),
    };
  },
};
</script>

<style scoped>
.service-item {
  border-radius: 33px;
}

.service-image {
  width: 160px;
  height: 160px;
  border-radius: 21px;
}
</style>
