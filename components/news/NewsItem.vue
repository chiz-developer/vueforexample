<template>
  <div class="group rounded-[40px]">
    <figure
      class="
        h-[200px]
        lg:h-[400px]
        article-img
        transition
        ease-in-out
        group-hover:-translate-y-1 group-hover:scale-105
        duration-300
      "
    >
      <img
        v-if="item.image_url"
        :src="item.image_url"
        class="object-cover w-full h-full rounded-[20px] lg:rounded-[40px]"
        alt="yoga"
      />
      <img
        v-else
        src="~assets/images/yoga.jpeg"
        class="object-cover w-full h-full rounded-[20px] lg:rounded-[40px]"
        alt="yoga"
      />
    </figure>
    <div class="pb-8 mt-8">
      <div class="flex items-center space-s-[18px]">
        <div class="flex space-s-2">
        <div
          v-for="item in item.categories"
          :key="item.id"
          class="transition duration-300 ease-in cursor-pointer hover:text-blue-50"
        >
          {{ item.name }}
        </div>
        </div>
        <div class="w-[18px] h-[2px] mx-[18px] bg-gray-50"></div>
        <div class="text-[#7e8c9a] text-base">
          {{ $dayjs(item.created_at).format("MMMM D YYYY") }}
        </div>
      </div>
      <div
        class="mt-3 mb-4 text-xl font-extrabold text-blue-900 transition duration-300 ease-in font-manrope lg:text-2xl hover:text-blue-50"
      >
        {{ item.title }}
      </div>
      <p
        v-html="item.exerpt_content"
        class="text-[#000000] opacity-70 font-light mb-5"
      ></p>
      <div class="relative hidden md:block">
        <div class="mt-6 text-base font-semibold uppercase hover:text-blue-50">
          <nuxt-link class="relative nav-link" :to="`/news/${item.slug}`">
            {{ $t("landing.news.read_link") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsItem",
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>