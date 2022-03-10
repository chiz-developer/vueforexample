<template>
  <div>
    <div class="container px-4 py-12 mx-auto mt-6 lg:px-2">
      <div class="pt-16 text-center lg:pt-0">
        <h1 class="font-extrabold h1 font-manrope">
          {{ $t("news.latest_news") }}
        </h1>
        <div
          class="mx-auto mb-12 text-base leading-6 text-black opacity-70 max-w-prose"
        >
          <p>
            {{ $t("news.latest_news_subtext") }}
          </p>
        </div>
      </div>

      <div
        v-if="news.length > 0"
        class="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2"
      >
        <div v-for="item in news" :key="item.data">
          <nuxt-link :to="`/news/${item.slug}`">
            <NewsItem :item="item" />
          </nuxt-link>
        </div>
      </div>
      <div class="flex justify-center w-full mx-auto space-x-4 text-center">
        <button
          v-if="this.page > 1"
          @click="previousPage"
          class="
            w-full
            md:w-auto
            text-blue-900
            border border-solid
            rounded-full
            border-[#bdcfd4]
            px-[32px]
            hover:bg-black hover:text-white
            py-4
          "
        >
          {{ $t("news.previous_page") }}
        </button>
        <button
          v-if="paginationData && paginationData.last_page > 1"
          @click="nextPage"
          class="
            w-full
            md:w-auto
            text-blue-900
            border border-solid
            rounded-full
            border-[#bdcfd4]
            px-[36px]
            hover:bg-black hover:text-white
            py-4
          "
        >
          {{ $t("news.next_page") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NewsItem from "@/components/news/NewsItem.vue";
export default {
  components: { NewsItem },
  data() {
    return {
      news: [],
      paginationData: null,
      page: 1,
    };
  },
  async fetch() {
    const params = { page: this.page };

    await this.$axios.$get("/landing/news/", { params }).then((response) => {
      this.news = response.data;
      this.paginationData = response.meta;
    });
  },
  methods: {
    nextPage() {
      if (this.page < this.paginationData.last_page) {
        let page = this.paginationData.current_page + 1;
        this.page = page;
        this.$fetch();
      }
    },
    previousPage() {
      if (this.page > 1) {
        let page = this.paginationData.current_page - 1;
        this.page = page;
        this.$fetch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.h1 {
  letter-spacing: -0.01px;
  @apply text-4xl lg:text-[3.375em] lg:leading-[1.111em];
}
</style>