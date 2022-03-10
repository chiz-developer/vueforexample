<template>
  <div>
    <div class="container px-4 py-12 mx-auto mt-16 lg:mt-6 lg:px-2">
      <div class="text-center">
        <h1 class="font-extrabold h1 font-manrope">
          {{ $t("experts.title") }}
        </h1>
        <div
          class="mx-auto mb-12 text-base leading-6 text-black opacity-70 max-w-prose"
        >
          <p>
            {{ $t("experts.subtext") }}
          </p>
        </div>

        <!-- search form -->
        <div class="flex justify-center w-full">
          <form
            @submit.prevent="expertSearch"
            class="relative w-full md:w-[463px] max-w-full flex"
          >
            <input
              v-model="keyword"
              type="search"
              class="
                mt-0
                border border-solid border-[#cccccc]
                focus:border-blue-50
                rounded-[60px]
                bg-transparent
                outline-none
                ltr:pl-8
                rtl:pr-32 rtl:pl-4
                py-0
                h-[55px]
              "
              required
              :placeholder="this.$t('experts.search_input.placeholder')"
            />
            <button
              type="submit"
              class="absolute inset-y-0 right-0 flex items-center px-8 py-0 text-base btn primary"
            >
              {{ $t("buttons.search") }}
            </button>
          </form>
        </div>

        <!-- categories -->
        <ul
          class="flex flex-col mt-8 font-semibold uppercase lg:justify-center lg:items-center lg:flex-row lg:space-x-4 xl:space-x-8"
        >
          <li
            class="text-sm nav-link xl:text-base"
            v-for="category in categories"
            :key="category.id"
          >
            <nuxt-link :to="`/experts/category/${category.id}`">{{
              category.name
            }}</nuxt-link>
          </li>
        </ul>
      </div>

      <!-- experts -->
      <div v-for="category in experts" :key="category.id" class="mt-24">
        <h2 class="px-6 mb-8 font-extrabold font-manrope h2">
          {{ category.name }}
        </h2>
        <div class="h-[1px] bg-gray-50"></div>
        <div
          v-if="category.active_experts.length > 0"
          class="grid grid-cols-1 gap-12 mt-8 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-24"
        >
          <div v-for="expert in category.active_experts" :key="expert.id">
            <ExpertItem :expert="expert" />
          </div>
        </div>
        <div class="mt-8 text-3xl text-center" v-else>
          {{ $t("messages.no_data") }}...
        </div>
        <div class="flex justify-center mt-20">
          <nuxt-link
            class="px-8 py-3 text-base border-gray-50 btn"
            :to="`/experts/category/${category.id}`"
          >
            {{ $t("buttons.load_more") }}</nuxt-link
          >
        </div>
      </div>

      <!-- joining team -->
      <div class="flex flex-col items-center justify-center my-24">
        <h3 class="font-extrabold text-center text-blue-900 h3 font-manrope">
          {{ $t("experts.team.title") }}
        </h3>

        <p class="mt-5 text-center max-w-prose text-[#55656a] mb-6">
          {{ $t("experts.team.subtext") }}
        </p>
        <nuxt-link
        :to="'/registration/expert'"
          class="px-8 py-3 text-base transition duration-300 ease-in-out delay-150 btn primary hover:bg-black hover:-translate-y-1 hover:scale-110"
        >
          {{ $t("buttons.join_as_coach") }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import ExpertItem from "@/components/expert/ExpertItem.vue";

export default {
  components: {
    ExpertItem,
  },
  async asyncData({ $axios, params, error }) {
    try {
      let expertsWithCategoryData = await $axios.$get(`/category-experts`);
      let categories = await $axios.$get(`/expert-categories`);

      return {
        categoriesData: expertsWithCategoryData.data,
        categories: categories.data,
      };
    } catch (err) {
      error(err);
    }
  },

  data() {
    return {
      keyword: "",
    };
  },

  computed: {
    experts() {
      return this.categoriesData;
    },
  },
  methods: {
    expertSearch() {
      this.$axios
        .get("/experts/search", { params: { keyword: this.keyword } })
        .then((res) => {
          this.$store.commit("expert/setSearchResultsData", res.data.data);
          this.$router.push("/experts/search");
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped>
.h1 {
  letter-spacing: -0.01px;
  @apply text-4xl lg:text-[3.375em] lg:leading-[1.111em];
}
.h2 {
  @apply text-3xl lg:text-[2.1em] leading-[1.3em];
}
.h3 {
  @apply text-2xl lg:text-[1.5em] leading-[1.417em];
}
</style>
