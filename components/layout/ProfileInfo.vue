<template>
  <div class="w-full xl:w-[441px] px-4 py-20 bg-white lg:px-11">
    <div class="relative flex justify-center">
      <ProfileProgreessBar />
    </div>
    <h1 class="text-3xl lg:text-[40px] text-center mt-14">{{ $auth.user.full_name }}</h1>
    <span
      class="block text-[#7B7B7B] text-center text-lg lg:text-[22px] underline"
    >
      {{ $auth.user.email }}</span
    >

    <!-- recomended experts -->

    <div class="mt-24 text-2xl font-medium font-manrope lg:text-3xl mb-7">
      {{ $t("recomended_experts.title") }}
    </div>
    <div v-for="expert in recommendedExperts" :key="expert.id" class="flex mb-4 w-full rounded-[19px]">
      <div>
        <img v-if="expert.avatar_thumb" :src="expert.avatar_thumb" class="object-cover rounded-full expert-avatar mr-7">
        <div v-else class="p-2 border border-black border-solid rounded-full me-7">
          <svg-icon name="user" class="w-6 h-6" />
        </div>
      </div>
      <div class="">
        <p class="font-semibold text-[22px]">{{ expert.full_name }}</p>
        <p v-if="expert.position" class="text-lg">{{ expert.position.name }}</p>
      </div>
    </div>
    <nuxt-link :to="'#'">
      <div class="bg-green-50 rounded-[29px] text-center py-5 px-6 mt-16">
        <p class="text-2xl font-semibold">
          {{ $t("dashboard.need_help") }}
        </p>
        <p class="text-lg">{{ $t("dashboard.contact_us") }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import ProfileProgreessBar from '@/components/expert/ProfileProgreessBar.vue';

export default {
  components: {
    ProfileProgreessBar
  },

  async fetch() {
    try {
      const { data } = await this.$axios.$get('/experts/recommended')
      this.recommendedExperts = data
    } catch (err) {
      //
    }
  },

  data() {
    return {
      recommendedExperts: []
    }
  },
};
</script>

<style scoped>
.expert-avatar {
  width: 42px;
  height: 42px;
}
</style>