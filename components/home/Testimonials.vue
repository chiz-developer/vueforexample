<template>
  <section v-if="testimonials.length" class="my-28">
    <div class="container px-8 mx-auto 2xl:px-40">
      <div
        class="text-2xl font-extrabold text-blue-900 md:text-4xl md:text-center font-manrope"
      >
       {{ $t("landing.testimonials.title") }}
      </div>
      <div class="my-6 text-black md:text-center opacity-70">
              {{ $t("landing.testimonials.subtext") }}
      </div>
      <div class="grid gap-8 lg:grid-cols-3 gap-cols-1">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="bg-gray-100 rounded-[50px] px-9 py-12 text-center"
        >
          <figure class="w-[120px] h-[120px] mx-auto">
            <img
              v-if="testimonial.user.avatar_thumb"
              :src="testimonial.user.avatar_thumb"
              class="object-cover w-full h-full rounded-full"
              :alt="testimonial.user.full_name"
            />
          </figure>
          <div class="mt-6 text-2xl font-extrabold text-blue-900">
            {{ testimonial.user.full_name }}
          </div>
          <div class="text-lg uppercase tracking-[0.1em]">{{ testimonial.user.country }}</div>
          <div class="mx-auto mt-5 text-base font-light text-center max-w-prose opacity-70">
            <p>
              {{ testimonial.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Testimonials",

  async fetch() {
    try {
      const { data } = await this.$axios.$get('/testimonials')
      this.testimonials = data
    } catch (err) {
      //
    }
  },

  fetchOnServer: false,

  data() {
    return {
      testimonials: []
    }
  }
};
</script>
