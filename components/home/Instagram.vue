<template>
  <section class="relative bg-color py-10 lg:py-[120px]">
    <div class="container px-8 mx-auto 2xl:px-40" v-if="posts">
      <div
        class="flex flex-col items-center justify-between w-full space-y-4 md:flex-row md:space-y-0"
      >
        <div
          class="text-2xl font-extrabold text-blue-900 w-ful md:text-4xl lg:text-5xl font-manrope"
        >
          {{ $t("landing.instagram_title") }}
        </div>
        <div class="w-full md:w-auto">
          <a
            href="https://www.instagram.com/thenourishers/"
            target="_blank"
            class="w-full block md:w-auto border border-solid rounded-full border-[#bdcfd4] px-[32px] text-blue-900 hover:bg-black hover:text-white hover:border-transparent md:py-4 py-4"
          >
            {{ $t("buttons.follow_us") }}
          </a>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-8 mt-10 md:grid-cols-4">
        <a
          v-for="(post, index) in posts"
          :key="index"
          :href="post.url"
          target="_blank"
        >
          <figure
            class="transition duration-300 ease-in-out cursor-pointer relative hover:scale-110"
          >
            <svg-icon name="video" v-if="post.video" class="w-6 h-6 absolute right-3 top-3 z-1 text-white" />
            <svg-icon name="photo" v-if="!post.video" class="w-6 h-6 absolute right-3 top-3 z-1 text-white" />
            <img
              @mouseover="postHoverState(index, true)"
              @mouseleave="postHoverState(index, false)"
              class="object-cover w-full h-full rounded-[10px] transition duration-300 ease-in-out"
              :class="getHoverClass(index)"
              :src="post.thumbnail"
            />
          </figure>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Instagram",
  data() {
    return {
      posts: null,
      isHover: false,
    };
  },

  async fetch() {
    const response = await this.$axios.$get("/landing/instagram-posts");
    const posts = [];
    response.forEach((item) => {
      item.hover = false;
      posts.push(item);
    });

    this.posts = posts;
  },

  methods: {
    postHoverState(index, state) {
      this.isHover = state;
      this.posts[index].hover = state;
    },
    getHoverClass(index) {
      if (this.posts[index].hover) {
        return "opacity-100";
      } else {
        return this.isHover ? "opacity-50" : "opacity-100";
      }
    },
  },
};
</script>
<style scoped>
.bg-color {
  background-image: linear-gradient(0deg, rgba(49, 164, 208, 0.1) 50%, #fff 0);
}
</style>
