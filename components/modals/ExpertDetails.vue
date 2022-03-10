<template>
  <div class="py-8 px-10">
    <div class="text-bold text-3xl">Expert Details</div>
    <div class="flex mt-6 gap-5">
      <img
        v-if="expert.avatar_thumb"
        :src="expert.avatar_thumb"
        class="expert-image object-cover"
      />
      <div>
        <div class="text-2xl">{{ expert.full_name }}</div>
        <div>{{ expert.email }}</div>
        <div class="font-light text-gray-500 mt-4">
          {{ expert.position.name }}
        </div>
      </div>
    </div>
    <div class="mt-6 space-y-6">
      <div>
        <div class="text-lg pb-2 mb-4 border-b border-blue-10 text-bold">
          Bio
        </div>
        <div>{{ expert.details.bio || '-' }}</div>
      </div>
      <div>
        <div class="text-lg pb-2 mb-4 border-b border-blue-10 text-bold">
          About
        </div>
        <div>{{ expert.details.about || "-" }}</div>
      </div>
      <div>
        <button
          v-if="status === 'active'"
          @click="changeExpertStatus('pending')"
          class="border border-[#C4C4C4] hover:border-blue-50 hover:bg-blue-50 hover:text-white py-2 px-6 rounded-full"
        >
          Deactivate expert
        </button>
        <button
          v-else
          @click="changeExpertStatus('active')"
          class="border border-[#C4C4C4] hover:border-blue-50 hover:bg-blue-50 hover:text-white py-2 px-6 rounded-full"
        >
          Activate expert
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    expert: {
      type: Object,
      required: true,
    },

    afterUpdate: {
        type: Function,
        default: () => {}
    }
  },

  data() {
    return {
      status: this.expert.details.status,
    };
  },

  methods: {
    async changeExpertStatus(status) {
      try {
        await this.$axios.$put(`/experts/${this.expert.id}`, {
          status,
        });

        this.status = status;
        this.afterUpdate();
      } catch (err) {
        //
      }
    },
  },
};
</script>

<style scoped>
.expert-image {
  width: 160px;
  height: 160px;
  border-radius: 21px;
}
</style>
