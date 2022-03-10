<template>
  <div>
    <div class="container px-4 mx-auto 2xl:px-40">
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

      <div>
        <!-- experts -->
        <div class="my-24">
          <h2 class="mb-8 font-extrabold font-manrope h2">
            {{ category.name }}
          </h2>
          <div class="h-[1px] bg-gray-50"></div>
          <div
            v-if="category.active_experts.length > 0"
            class="grid grid-cols-1 gap-12 mt-8 md:grid-cols-3 xl:grid-cols-4"
          >
            <div v-for="expert in category.active_experts" :key="expert.id">
              <ExpertItem :expert="expert" />
            </div>
          </div>
          <div class="mt-8 text-3xl text-center" v-else>
            {{ $t("messages.no_data") }}...
          </div>
        </div>
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
  async asyncData({ $axios, route }) {
    const categoriesData = await $axios.$get("expert-categories");
    const categoryData = await $axios.$get(
      `expert-categories/${route.params.id}`
    );
    return {
      category: categoryData.data,
      categories: categoriesData.data,
    };
  },
  data() {
    return {
      keyword: "",
    };
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

<style lang="scss" scoped>
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