<template>
  <section class="relative mt-10 md:mt-24">
    <div class="container px-8 mx-auto 2xl:px-40">
      <div
        class="text-2xl font-extrabold text-blue-900  md:text-4xl md:text-center font-manrope"
      >
        {{ $t("landing.experts.title") }}
      </div>
      <div
        class="mx-auto mt-4 leading-6 text-black  md:text-center max-w-prose opacity-70"
      >
        <p>
          {{ $t("landing.experts.subtext") }}
        </p>
      </div>
      <div class="grid grid-cols-1 gap-16 md:grid-cols-3" v-if="experts">
        <div v-for="(expert, index) in experts" :key="index" class="mt-10">
          <ExpertItem :expert="expert" />
        </div>
      </div>
      <div class="w-full mx-auto mt-8 text-center">
        <NuxtLink
          to="/experts"
          class="w-full px-8 py-3 text-base font-medium text-blue-900 transition duration-300 ease-in-out delay-150 border border-solid rounded-full  md:w-auto border-gray-50 hover:bg-black hover:-translate-y-1 hover:scale-110 hover:text-white"
        >
          {{ $t("buttons.meet_all_experts") }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>
import ExpertItem from "../expert/ExpertItem.vue";
export default {
  components: { ExpertItem },
  name: "Coaches",

  data() {
    return {
      experts: null,
    };
  },

  created() {
    this.$axios.$get("/landing/experts").then((response) => {
      this.experts = response.data;
    });
  },
};
</script>
<style scoped>
</style>
