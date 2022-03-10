<template>
  <div>
    <div class="container px-4 py-12 mx-auto mt-24 lg:mt-16 2xl:px-40">
      <!-- header -->
      <div class="text-center">
        <div class="flex flex-col items-center">
          <div class="w-[500px] max-w-full">
            <div class="text-primary text-[1.375em]">
              {{ $t("about.title_about") }}
            </div>
            <h1 class="font-extrabold h1 font-manrope">
              {{ $t("about.title") }}
            </h1>
            <div
              class="mx-auto mb-12 text-base leading-6 text-black opacity-70 max-w-prose"
            >
              <p>
                {{ $t("experts.subtext") }}
              </p>
            </div>
          </div>
        </div>

        <figure class="">
          <img
            class="object-cover w-full h-full rounded-[35px]"
            src="~assets/images/team.jpeg"
            alt=""
          />
        </figure>
      </div>

      <!-- legacy -->
      <div class="mt-[120px]">
        <div class="flex flex-col items-center gap-10 lg:flex-row">
          <div>
            <h2 class="mb-4 font-extrabold text-blue-900 h2 font-manrope">
              {{ $t("about.legacy.title") }}
            </h2>
            <p class="text-base text-blue-400 max-w-prose">
              {{ $t("experts.subtext") }}
            </p>
            <p class="mt-6 text-base text-blue-400 max-w-prose">
              {{ $t("experts.subtext") }}
            </p>
            <nuxt-link :to="'#'" class="px-8 py-3 mt-5 text-base btn primary">
              {{ $t("navbar.get_class") }}
            </nuxt-link>
          </div>
          <figure class="lg:w-[560px] lg:h-[334px]">
            <img
              src="~assets/images/friendship.jpg"
              alt="friend"
              class="object-cover w-full h-full rounded-[35px]"
            />
          </figure>
        </div>
      </div>

      <div class="my-[120px]">
        <div class="w-full h-[1px] bg-gray-50"></div>
      </div>

      <!-- values guide -->
      <div class="text-center">
        <div class="font-extrabold text-blue-900 h2 font-manrope">
          {{ $t("about.values.title") }}
        </div>
        <p class="mx-auto mt-4 text-base text-blue-400 max-w-prose">
          {{ $t("experts.subtext") }}
        </p>
        <div class="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3">
          <div>
            <figure class="w-24 h-24 mx-auto">
              <img
                class="object-cover w-full h-full"
                src="~/assets/images/about/heart.png"
                alt=""
              />
            </figure>
            <h3 class="my-4 font-extrabold text-blue-900 h3 font-manrope">
              {{ $t("about.values.inclusive") }}
            </h3>
            <p class="text-base leading-6 text-black/70 max-w-prose">
              {{ $t("experts.subtext") }}
            </p>
          </div>
          <div>
            <figure class="w-24 h-24 mx-auto">
              <img
                class="object-cover w-full h-full"
                src="~/assets/images/about/hands.png"
                alt=""
              />
            </figure>
            <h3 class="my-4 font-extrabold text-blue-900 h3 font-manrope">
              {{ $t("about.values.lasting") }}
            </h3>
            <p class="text-base leading-6 text-black/70 max-w-prose">
              {{ $t("experts.subtext") }}
            </p>
          </div>
          <div>
            <figure class="w-24 h-24 mx-auto">
              <img
                class="object-cover w-full h-full"
                src="~/assets/images/about/tree.png"
                alt=""
              />
            </figure>
            <h3 class="my-4 font-extrabold text-blue-900 h3 font-manrope">
              {{ $t("about.values.ongoing") }}
            </h3>
            <p class="text-base leading-6 text-black/70 max-w-prose">
              {{ $t("experts.subtext") }}
            </p>
          </div>
        </div>
      </div>

      <div class="my-[120px]">
        <div class="w-full h-[1px] bg-gray-50"></div>
      </div>

      <!-- cheif coach -->
      <div class="flex flex-col gap-8 lg:flex-row">
        <figure class="w-[300px] h-[300px]">
          <img
            class="object-cover w-full h-full rounded-full"
            src="~/assets/images/about/coach.jpg"
            alt="seesionMan"
          />
        </figure>
        <div>
          <h2
            v-html="this.$t('about.chief.title')"
            class="mb-4 font-extrabold text-blue-900 h2 font-manrope"
          ></h2>
          <h4 class="my-5 font-extrabold h4 text-primary">
            <strong> {{ $t("about.chief.certified") }} </strong>
          </h4>
          <p
            v-html="this.$t('about.chief.info')"
            class="text-base text-blue-400 max-w-prose"
          ></p>
        </div>
      </div>

      <div class="my-[120px]">
        <div class="w-full h-[1px] bg-gray-50"></div>
      </div>

      <!-- faq section -->
      <div>
        <div class="flex flex-col justify-between gap-2 lg:flex-row">
          <div>
            <h2 class="mb-4 font-extrabold text-blue-900 h2 font-manrope">
              {{ $t("about.faq.title") }}
            </h2>
            <p class="text-base text-blue-400 max-w-prose">
              {{ $t("experts.subtext") }}
            </p>
          </div>
          <div>
            <NuxtLink
              to="/contact-us"
              class="border border-solid rounded-full border-[#bdcfd4] px-[32px] hover:bg-black hover:text-white hover:border-none py-[12px]"
            >
              {{ $t("buttons.get_in_touch") }}
            </NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-2 justify-start">
          <Collapse
            v-for="(item, index) in faqs"
            :key="index"
            :title="item.label"
            >{{ item.text }}</Collapse
          >
        </div>
      </div>
    </div>

    <!-- studio glance -->
    <div class="mt-24 bg-color">
      <div class="container px-4 py-12 mx-auto mt-16 lg:mt-6 2xl:px-40">
        <h2 class="mb-4 font-extrabold text-blue-900 h2 font-manrope">
          {{ $t("about.studio.title") }}
        </h2>
        <p class="text-base text-blue-400 max-w-prose">
          {{ $t("experts.subtext") }}
        </p>
        <div class="grid grid-cols-1 gap-4 mt-12 lg:grid-cols-3">
          <figure class="w-[349px] h-[311px]">
            <img
              class="object-cover w-full h-full rounded-[30px]"
              src="~/assets/images/about/girl.jpg"
              alt=""
            />
          </figure>
          <figure class="w-[349px] h-[311px]">
            <img
              class="object-cover w-full h-full rounded-[30px]"
              src="~/assets/images/about/yoga.jpg"
              alt=""
            />
          </figure>
          <figure class="w-[349px] h-[311px]">
            <img
              class="object-cover w-full h-full rounded-[30px]"
              src="~/assets/images/about/yoga-alone.jpg"
              alt=""
            />
          </figure>
        </div>
      </div>
    </div>

    <!-- booking -->
    <div class="container px-4 py-12 mx-auto mt-16 lg:mt-6 2xl:px-40">
      <div class="flex flex-col items-center justify-center my-24">
        <h2
          v-html="this.$t('about.booking.title')"
          class="font-extrabold text-center text-blue-900 h2 font-manrope"
        ></h2>
        <p class="mt-5 text-center max-w-prose text-[#55656a] mb-6">
          {{ $t("experts.team.subtext") }}
        </p>
        <nuxt-link
          :to="'/registration/expert'"
          class="px-8 py-3 text-base transition duration-300 ease-in-out delay-150 btn primary hover:bg-black hover:-translate-y-1 hover:scale-110"
        >
          {{ $t("buttons.start_journey") }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from "@/components/controls/Collapse";
export default {
  components: { Collapse },

  computed: {
    faqs() {
      return [
        {
          label: this.$t("about.faq.quest1"),
          text: this.$t("experts.subtext"),
        },
        {
          label: this.$t("about.faq.quest2"),
          text: this.$t("experts.subtext"),
        },
        {
          label: this.$t("about.faq.quest3"),
          text: this.$t("experts.subtext"),
        },
        {
          label: this.$t("about.faq.quest4"),
          text: this.$t("experts.subtext"),
        },
        {
          label: this.$t("about.faq.quest5"),
          text: this.$t("experts.subtext"),
        },
        {
          label: this.$t("about.faq.quest6"),
          text: this.$t("experts.subtext"),
        },
      ];
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
  @apply text-3xl lg:text-[2.5em] leading-[1.3em];
}
.h3 {
  @apply text-2xl lg:text-[1.5em] leading-[1.417em];
}
.h4 {
  @apply text-2xl lg:text-[1.25em] leading-[1.3em];
}
</style>
