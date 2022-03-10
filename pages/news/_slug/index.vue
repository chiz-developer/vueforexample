<template>
  <div class="">
    <div class="relative">
      <div class="relative min-h-[550px] -z-1">
        <div class="absolute top-0 z-10 w-full h-full overlay"></div>
        <figure class="absolute inset-0 top-0 bottom-auto h-full">
          <img
            v-if="news.image_url"
            :src="news.image_url"
            class="object-cover w-full h-full rounded-[20px] lg:rounded-[40px]"
            alt="yoga"
          />
          <img
            v-else
            src="~assets/images/news-bg.jpg"
            class="object-cover w-full h-full"
            alt="news"
          />
        </figure>
      </div>

      <!-- header section -->
      <div
        class="
          container
          h-[550px]
          absolute
          inset-0
          px-4
          py-12
          mx-auto
          mt-6
          2xl:px-40
        "
      >
        <div class="pt-20 text-white lg:pt-0">
          <div class="flex items-center space-s-[18px] mb-6 lg:mb-0">
            <div class="flex space-s-2">
              <div
                v-for="item in news.categories"
                :key="item.id"
                class="transition duration-300 ease-in cursor-pointer hover:text-blue-50"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="w-[18px] h-[2px] mx-[18px] bg-gray-50"></div>
            <div class="text-base">
              {{
                $dayjs(news.created_at)
                  .format("MMMM D YYYY")
              }}
            </div>
          </div>
          <h1 class="my-0 font-extrabold h1 font-manrope w-[604px] max-w-full">
            {{ news.title }}
          </h1>
          <div class="flex items-center mt-8 space-s-5 lg:mt-4">
            <figure class="w-14 h-14">
              <img
                v-if="news.author.avatar_thumb"
                :src="news.author.avatar_thumb"
                class="object-cover w-full h-full rounded-full"
                alt=""
              />
              <img
                v-else
                src="~assets/images/coach.png"
                class="object-cover w-full h-full rounded-full"
                alt=""
              />
            </figure>
            <div class="text-xl font-semibold lg:text-2xl hover:text-blue-50">
              <nuxt-link :to="`#`"> {{ news.author.full_name }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <!-- content -->
      <div>
        <div class="container px-4 py-12 mx-auto mt-6 2xl:px-40">
          <div
            class="
              lg:grid
              text-blue-400
              flex flex-col-reverse
              lg:grid-cols-[0.5fr,1fr] lg:gap-20
            "
          >
            <div
              class="
                bg-gray-100
                py-[60px]
                px-6
                text-center
                flex flex-col
                items-center
                rounded-[30px]
                mt-12
                lg:mt-0
              "
            >
              <figure class="w-[120px] h-[120px]">
                <img
                  v-if="news.author.avatar_thumb"
                  :src="news.author.avatar_thumb"
                  class="object-cover w-full h-full rounded-full"
                  alt=""
                />
                <img
                  v-else
                  src="~assets/images/coach.png"
                  class="object-cover w-full h-full rounded-full"
                  alt=""
                />
              </figure>
              <div class="mt-6 font-extrabold text-blue-900 h3">
                {{ news.author.full_name }}
              </div>
              <p class="mt-2 text-base max-w-prose">
                {{ $t("news.author_info") }}
              </p>
            </div>
            <div>
              <p v-html="news.content" class="text-base"></p>
            </div>
          </div>

          <div v-if="recommendedNews.length>0" class="container px-12 mx-auto 2xl:px-32 mt-[120px]">
            <div class="w-full h-[1px] bg-gray-50"></div>
          </div>
          <!-- related news -->
          <div v-if="recommendedNews.length>0" class="mt-16">
            <div class="flex items-center justify-between">
              <div class="font-extrabold text-blue-900 h2">
                {{ $t("news.related") }}
              </div>
              <div>
                <nuxt-link
                  :to="'/news'"
                  class="
                    w-full
                    md:w-auto
                    border border-solid
                    rounded-full
                    border-[#bdcfd4]
                    px-[32px]
                    hover:bg-black hover:text-white
                    py-4
                  "
                >
                  {{ $t("buttons.view_all_articles") }}
                </nuxt-link>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2">
              <div v-for="item in recommendedNews" :key="item.id">
                <nuxt-link :to="`/news/${item.slug}`">
                  <NewsItem :item="item" />
                </nuxt-link>
              </div>
            </div>
          </div>

          <div class="container px-12 mx-auto 2xl:px-32 mt-[120px]">
            <div class="w-full h-[1px] bg-gray-50"></div>
          </div>
        </div>

        <Instagram />
      </div>
    </div>
  </div>
</template>

<script>
import NewsItem from "@/components/news/NewsItem.vue";
import Instagram from "@/components/home/Instagram.vue";

export default {
  components: { NewsItem, Instagram },

  async asyncData({ $axios, params, $auth, error }) {
    try {
      const response = await $axios.$get(`/landing/news/${params.slug}`);
      const responseRecommended = await $axios.$get(
        `/landing/recommended/news/${params.slug}`
      );

      return {
        news: response.data,
        recommendedNews: responseRecommended.data,
      };
    } catch (err) {
      error(err);
    }
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
}
.h1 {
  letter-spacing: -0.01px;
  @apply text-3xl lg:text-[3.375em] lg:leading-[1.111em];
}
.h2 {
  @apply text-3xl lg:text-[2.1em] leading-[1.3em];
}
.h3 {
  @apply text-2xl lg:text-[1.5em] leading-[1.417em];
}
</style>