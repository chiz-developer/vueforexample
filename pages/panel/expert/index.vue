<template>
  <div class="grid grid-cols-1 bg-gray-200 xl:grid-cols-2 2xl:grid-cols-3">
    <div class="flex flex-col w-auto px-4 pt-8 pb-8 2xl:col-span-2 2xl:px-12">
      <div
        class="flex flex-col flex-wrap items-center 2xl:flex-row 2xl:space-s-8 2xl:flex-nowrap"
      >
        <div>
          <ProfileProgreessBar />
        </div>
        <div class="pt-14">
          <div
            class="flex flex-col flex-wrap items-center justify-between mb-6 space-y-4 2xl:space-y-0 2xl:flex-row"
          >
            <div class="text-3xl font-medium lg:text-6xl font-manrope">
              {{ expert.full_name }}
            </div>
            <div class="text-2xl text-gray-500 underline">
              {{ expert.email }}
            </div>
          </div>
          <div class="mb-8 text-xl">{{ expert.position.name }}</div>
          <p class="text-base">
            {{ expert.details.bio }}
          </p>
        </div>
      </div>

      <div class="mt-12" v-if="!expert.activation_request || expert.activation_request.status !== 'approved'">
        <div
          class="px-5 py-4 rounded-md flex justify-between items-center gap-10 leading-6"
          :class="[
            expert.activation_request && expert.activation_request.status === 'rejected'
              ? 'bg-pink-50'
              : 'bg-white',
          ]"
        >
          <div>
            <div v-if="expert.activation_request && expert.activation_request.status === 'rejected'">
              <div class="font-semibold">
                {{ $t('activation_requests.verification_failed') }}:
              </div>
              <div>{{ expert.activation_request.message }}</div>
            </div>

            <div v-else>
              {{ $t('activation_requests.verification_desc') }}
            </div>
          </div>
          <button
            v-if="expert.activation_request && expert.activation_request.status === 'pending'"
            class="bg-blue-50 border border-blue-50 text-white rounded-full text-lg leading-5 font-medium text-center px-10 py-2.5 flex-shrink-0 opacity-50"
          >
            {{ $t('activation_requests.review_in_proccess') }}
          </button>
          <button
            v-else
            @click="sendActivationRequest"
            class="bg-blue-50 border border-blue-50 text-white rounded-full text-lg leading-5 font-medium text-center px-10 py-2.5 flex-shrink-0"
          >
            {{
              expert.activation_request && expert.activation_request.status === "rejected"
                ? this.$t('activation_requests.send_again')
                : this.$t('activation_requests.send_to_review')
            }}
          </button>
        </div>
      </div>

      <!-- bar chart -->
      <Card class="mt-12">
        <PaymentsChart />
      </Card>
    </div>

    <!-- side bar -->
    <div class="flex justify-end px-4 xl:px-0 2xl:col-span-1">
      <div
        class="w-full xl:w-[500px] 2xl:w-[542px] px-4 pt-12 h-full bg-white lg:px-11"
      >
        <MyEvents />
        <Audience />
      </div>
    </div>
  </div>
</template>

<script>
import Audience from "@/components/expert/Audience.vue";
import MyEvents from "@/components/expert/MyEvents.vue";
import ProfileProgreessBar from "@/components/expert/ProfileProgreessBar.vue";
import PaymentsChart from "@/components/expert/PaymentsChart.vue";
import Card from "~/components/common/Card.vue";

export default {
  components: { ProfileProgreessBar, PaymentsChart, Card, Audience, MyEvents },
  name: "ExpertDashboard",
  layout: "panel",
  middleware: ["authorized"],

  async asyncData({ $axios, $auth, error }) {
    try {
      const details = await $axios.$get(`/experts/${$auth.user.id}/details`);

      return {
        expert: details.data,
      };
    } catch (err) {
      error(err);
    }
  },

  methods: {
    async sendActivationRequest() {
      try {
        const { data } = await this.$axios.$post(
          "/experts/activation-requests"
        );
        this.expert.activation_request = data;
      } catch (err) {
        //
      }
    },
  },
};
</script>
