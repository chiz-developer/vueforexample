<template>
  <PanelPageWrapper>
    <PageTitle>{{ $t('activation_requests.title_pl') }}</PageTitle>
    <div class="mt-16">
      <div>
        <table v-if="items.length" class="w-full">
          <thead>
            <tr class="text-left">
              <th class="p-2">{{ $t('dashboard.expert.title') }}</th>
              <th class="p-2">{{ $t('fields.status') }}</th>
              <th class="p-2">{{ $t('fields.date') }}</th>
              <th class="w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td class="px-2 py-3 border-t border-blue-10">
                <div class="inline-flex gap-4 items-center">
                  <img
                    v-if="item.expert.avatar_thumb"
                    :src="item.expert.avatar_thumb"
                    class="w-11 h-11 object-cover rounded-full"
                  />
                  <div class="space-y-1">
                    <div>{{ item.expert.full_name }}</div>
                    <div class="font-light text-gray-500">
                      {{ item.expert.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-2 py-3 border-t border-blue-10">
                {{ item.status }}
              </td>
              <td class="px-2 py-3 border-t border-blue-10">{{ item.date }}</td>
              <td class="px-2 py-3 border-t border-blue-10">
                <nuxt-link
                  :to="`/panel/admin/experts/activation-requests/${item.id}`"
                  class="border border-[#C4C4C4] hover:border-blue-50 hover:bg-blue-50 hover:text-white py-2 px-6 rounded-full inline-block"
                >
                  <svg-icon name="view" class="w-4 h-4" />
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center">
          {{ $t('messages.no_data') }}
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

  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.$get("/experts/activation-requests");

      return {
        items: data,
      };
    } catch (err) {
      error(err);
    }
  },

  head() {
    return {
      title: this.$t('activation_requests.title_pl'),
    };
  },
};
</script>
