<template>
  <PanelPageWrapper>
    <PageTitle>Users</PageTitle>
    <div class="mt-16">
      <div>
        <table class="w-full">
          <thead>
            <tr class="text-left">
              <th class="w-16"></th>
              <th class="p-2">Full Name</th>
              <th class="p-2">Email</th>
              <th class="p-2">Phone</th>
              <th class="p-2">Country</th>
              <th class="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="px-2 py-3 border-t border-blue-10">
                <img
                  v-if="user.avatar_thumb"
                  :src="user.avatar_thumb"
                  class="w-11 h-11 object-cover rounded-full"
                />
              </td>
              <td class="px-2 py-3 border-t border-blue-10">{{ user.full_name }}</td>
              <td class="px-2 py-3 border-t border-blue-10">{{ user.email }}</td>
              <td class="px-2 py-3 border-t border-blue-10">{{ user.phone }}</td>
              <td class="px-2 py-3 border-t border-blue-10">{{ user.country.name }}</td>
              <td class="px-2 py-3 border-t border-blue-10">{{ user.role || '-' }}</td>
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
      const { data } = await $axios.$get("/users");

      return {
        users: data,
      };
    } catch (err) {
      error(err);
    }
  },

  head() {
    return {
      title: 'Users'
    }
  },
};
</script>
