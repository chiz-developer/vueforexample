<template>
  <PanelPageWrapper>
    <PageTitle>Testimonials</PageTitle>
    <div class="mt-16">
      <table class="w-full">
        <thead>
          <tr class="text-left">
            <th class="p-2">User</th>
            <th class="p-2 w-2/3">Content</th>
            <th class="p-2">Date</th>
            <th class="p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="px-2 py-3 border-t border-blue-10">
              <div class="inline-flex gap-4 items-center">
                <img
                  v-if="item.user.avatar_thumb"
                  :src="item.user.avatar_thumb"
                  class="w-11 h-11 object-cover rounded-full"
                />
                <div class="space-y-1">
                  <div>{{ item.user.full_name }}</div>
                </div>
              </div>
            </td>
            <td class="px-2 py-3 border-t border-blue-10">
              {{ item.content }}
            </td>
            <td class="px-2 py-3 border-t border-blue-10">
              {{ item.date }}
            </td>
            <td class="px-2 py-3 border-t border-blue-10">
              <strong>{{ item.score }}</strong>
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

  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.$get("/testimonials");

      return {
        items: data,
      };
    } catch (err) {
      error(err);
    }
  },

  head() {
    return {
      title: "Testimonials",
    };
  },
};
</script>

<style></style>
