<template>
  <PanelPageWrapper>
    <PageTitle>Payments</PageTitle>

    <div class="mt-16">
      <table class="w-full">
        <thead>
          <tr class="text-left">
            <th class="p-2">User</th>
            <th class="p-2">Service</th>
            <th class="p-2">Status</th>
            <th class="p-2">Total</th>
            <th class="p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="payment in payments" :key="payment.id">
            <td class="px-2 py-3 border-t border-blue-10">
              <div class="inline-flex gap-4 items-center">
                <img
                  v-if="payment.user.avatar_thumb"
                  :src="payment.user.avatar_thumb"
                  class="w-11 h-11 object-cover rounded-full"
                />
                <div class="space-y-1">
                  <div>{{ payment.user.full_name }}</div>
                  <div class="font-light text-gray-500">
                    {{ payment.user.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-2 py-3 border-t border-blue-10">
                <div class="inline-flex gap-4 items-center">
                <img
                  v-if="payment.service.image_thumb_url"
                  :src="payment.service.image_thumb_url"
                  class="w-11 h-11 object-cover rounded-full"
                />
                <div class="space-y-1">
                  <div>{{ payment.service.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-2 py-3 border-t border-blue-10">{{ payment.status }}</td>
            <td class="px-2 py-3 border-t border-blue-10">${{ payment.total }}</td>
            <td class="px-2 py-3 border-t border-blue-10">{{ payment.date }}</td>
          </tr>
        </tbody>
      </table>
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

  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.$get("/payments");

      return {
        payments: data,
      };
    } catch (err) {
      error(err);
    }
  },

  head() {
    return {
      title: 'Payments'
    }
  },
};
</script>
