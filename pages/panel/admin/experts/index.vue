<template>
  <PanelPageWrapper>
    <PageTitle>Experts</PageTitle>
    <div class="mt-16">
      <div>
        <table class="w-full">
          <thead>
            <tr class="text-left">
              <th class="w-16"></th>
              <th class="p-2">Full Name</th>
              <th class="p-2">Status</th>
              <th class="p-2">Email</th>
              <th class="p-2">Position</th>
              <th class="p-2">Services</th>
              <th class="w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expert in experts" :key="expert.id">
              <td class="px-2 py-3 border-t border-blue-10">
                <img
                  v-if="expert.avatar_thumb"
                  :src="expert.avatar_thumb"
                  class="w-11 h-11 object-cover rounded-full"
                />
              </td>
              <td class="px-2 py-3 border-t border-blue-10">{{ expert.full_name }}</td>
              <td class="px-2 py-3 border-t border-blue-10">{{ expert.details.status }}</td>
              <td class="px-2 py-3 border-t border-blue-10">{{ expert.email }}</td>
              <td class="px-2 py-3 border-t border-blue-10">{{ expert.position ? expert.position.name : '' }}</td>
              <td class="px-2 py-3 border-t border-blue-10">
                <nuxt-link :to="`/panel/admin/services?expert_id=${expert.id}`" class="text-blue-50">
                  {{ expert.services_count }}
                </nuxt-link>
              </td>
              <td class="px-2 py-3 border-t border-blue-10">
                <button
                    @click="showExpertDetailsModal(expert)"
                    class="border border-[#C4C4C4] hover:border-blue-50 hover:bg-blue-50 hover:text-white py-2 px-6 rounded-full"
                  >
                    <svg-icon name="view" class="w-4 h-4" />
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </PanelPageWrapper>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";
import PageTitle from "~/components/layout/pageTitle.vue";
import ExpertDetails from '~/components/modals/ExpertDetails.vue';

export default {
  components: {
    PanelPageWrapper,
    PageTitle,
  },

  layout: "panel",
  middleware: ["authorized"],

  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.$get("/experts");

      return {
        experts: data,
      };
    } catch (err) {
      error(err);
    }
  },

  head() {
    return {
      title: 'Experts'
    }
  },

  methods: {
    async fetchExperts() {
      try {
        const { data } = await this.$axios.$get("/experts")
        this.experts = data
      } catch (err) {
        //
      }
    },

    showExpertDetailsModal(expert) {
      this.$modal.show(ExpertDetails, {
        expert,
        afterUpdate: () => this.fetchExperts()
      }, {
        height: 'auto',
        scrollable: true
      })
    }
  }
};
</script>
