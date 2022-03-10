<template>
  <PanelPageWrapper>
    <PageTitle>Services</PageTitle>
    <div class="mt-16">
      <table class="w-full">
        <thead>
          <tr class="text-left">
            <th class="p-2">ID</th>
            <th class="p-2">Name</th>
            <th class="p-2 w-1/3">Description</th>
            <th class="p-2">Expert</th>
            <th class="p-2">Target</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td class="px-2 py-3 border-t border-blue-10">{{ service.id }}</td>
            <td class="px-2 py-3 border-t border-blue-10">
              <div class="inline-flex gap-4 items-center">
                <img
                  v-if="service.image_thumb_url"
                  :src="service.image_thumb_url"
                  class="w-11 h-11 object-cover rounded-full"
                />
                <div class="space-y-1">
                  <div>{{ service.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-2 py-3 border-t border-blue-10">
              {{ service.description }}
            </td>
            <td class="px-2 py-3 border-t border-blue-10">
              <div class="inline-flex gap-4 items-center">
                <img
                  v-if="service.expert.avatar_thumb"
                  :src="service.expert.avatar_thumb"
                  class="w-11 h-11 object-cover rounded-full"
                />
                <div class="space-y-1">
                  <div>{{ service.expert.full_name }}</div>
                  <div class="font-light text-gray-500">
                    {{ service.expert.email }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-2 py-3 border-t border-blue-10">
              {{ service.target }}
            </td>
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

  async asyncData({ $axios, error, query }) {
    try {
      const { data } = await $axios.$get("/services", {
          params: {
              expert_id: query.expert_id || null
          }
      });

      return {
        services: data,
      };
    } catch (err) {
      error(err);
    }
  },

  head() {
    return {
      title: 'Services'
    }
  },
};
</script>

