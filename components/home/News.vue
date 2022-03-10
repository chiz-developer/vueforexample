<template>
  <section v-if="news.length>0" class="relative pt-40 lg:mt-24">
    <div class="container px-8 mx-auto 2xl:px-40">
      <div
        class="
          text-5xl text-[#0b252e]
          font-extrabold
          text-center
          font-manrope
          mb-4
        "
      >
        {{ $t("landing.news.title") }}
      </div>

      <div
        class="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2"
      >
        <div v-for="item in news" :key="item.id">
          <nuxt-link :to="`/news/${item.slug}`">
          <NewsItem :item="item" />
          </nuxt-link>
        </div>
      </div>
      <div class="w-full mx-auto text-center">
        <nuxt-link
          :to="'/news'"
          class="
            w-full
            md:w-auto
            border border-solid
            rounded-full
            border-[#bdcfd4]
            px-[32px]
            hover:bg-black hover:text-white hover:border-none
            py-4
          "
        >
          {{ $t("buttons.view_all_articles") }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import NewsItem from "@/components/news/NewsItem.vue";
export default {
  components: { NewsItem },
  name: "News",

  data() {
    return {
      news: [],
    };
  },

  created() {
    this.$axios.$get("/landing/random/news").then((response) => {
      this.news = response.data;
    });
  },
};
</script>
