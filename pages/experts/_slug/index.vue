<template>
  <div>
    <div class="text-blue-400">
      <div class="container max-w-screen-lg px-4 mx-auto mt-32 lg:mt-24 lg:px-2">
        <div
          class="flex flex-col gap-10 mb-20 text-center lg:flex-row lg:gap-20 lg:text-left"
        >
          <div
            v-if="expert.avatar_thumb"
            class="flex justify-center flex-shrink-0"
          >
            <img
              class="rounded-full instructor-image"
              :src="expert.avatar_thumb"
            />
          </div>
          <div class="flex instructor-summary">
            <div>
              <h1 class="mt-0 mb-5 font-extrabold text-black h1 font-manrope">
                {{ expert.full_name }}
              </h1>
              <div v-if="expert.position" class="mb-5 font-semibold text-black position">
                {{ expert.position.name }}
              </div>
              <div
                class="flex flex-wrap gap-2.5 justify-center lg:justify-start"
              >
                <span
                  v-for="(tag, index) in tags"
                  :key="index"
                  class="tag-item"
                  >{{ tag }}</span
                >
              </div>
              <div v-if="expert.details" class="mt-10 text-base leading-6">
                <Tabs>
                  <Tab :title="$t('expert.brief')">
                    <p>
                      {{ expert.details.bio }}
                    </p>
                  </Tab>

                  <Tab :title="$t('expert.background')">
                    <p>
                      {{ expert.details.about }}
                    </p>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        <!-- services -->
        <div class="my-20" v-if="expert.services.length > 0">
          <h2 class="mb-6 font-extrabold text-black h2 font-manrope">
            {{ $t("packages.title_pl") }}
          </h2>
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1">
            <div
              class="flex flex-col items-start gap-8 card lg:flex-row"
              v-for="service in expert.services"
              :key="service.id"
            >
              <img
                v-if="service.image_thumb_url"
                class="flex-shrink-0 card-image"
                :src="service.image_thumb_url"
              />

              <div class="flex flex-col justify-between w-full lg:flex-row">
                <div class="card-info">
                  <h3 class="mb-2 font-extrabold text-black card-title">
                    {{ service.name }}
                  </h3>
                  <div class="text-base leading-6">
                    <p>
                      {{ service.description }}
                    </p>
                  </div>
                  <div
                    class="mt-6 flex flex-col sm:flex-row items-center gap-[30px]"
                  >
                    <nuxt-link
                      :to="`/experts/${expert.slug}/order/${service.id}`"
                      class="w-full px-8 text-base text-center border rounded-full card-button sm:w-auto"
                      :class="[
                        'bg-blue-50 text-white border-blue-50' /* 'text-blue-900 border-gray-50'*/,
                      ]"
                    >
                      {{ $t("buttons.book_now") }}
                    </nuxt-link>
                    <div class="inline-flex items-center gap-2.5">
                      <svg-icon
                        :name="`gender-${service.target}`"
                        class="w-8 h-8"
                      />
                      <div>{{ $t(`services.targets.${service.target}`) }}</div>
                    </div>
                  </div>
                </div>

                <div
                  class="flex flex-row flex-wrap items-end gap-6 mt-8 lg:flex-nowrap lg:flex-col lg:gap-8 lg:mt-0 lg:justify-center"
                >
                  <template v-if="service.free">
                    <ExpertServicePrice 
                      :price="0"
                      :sessions="1"
                    />
                  </template>
                  <template v-else>
                    <ExpertServicePrice 
                      v-for="(price, index) in service.prices" 
                      :key="price.sessions" 
                      :price="price.price"
                      :selected="index + 1 === service.prices.length"
                      :sessions="price.sessions"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from "@/components/controls/Tabs";
import Tab from "@/components/controls/Tab";
import ExpertServicePrice from '@/components/expert/ExpertServicePrice.vue';

export default {
  name: "PublicExpertPage",

  components: { 
    Tab, 
    Tabs, 
    ExpertServicePrice
  },

  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.$get(`/experts/by-slug/${params.slug}`);

      return {
        expert: data,
      };
    } catch (err) {
      error(err);
    }
  },

  head() {
    return {
      title: this.expert.full_name,
    };
  },

  computed: {
    tags() {
      return this.expert?.categories.map((item) => item.name);
    },
  },
};
</script>

<style scoped>
.h1 {
  letter-spacing: -0.01px;
  @apply lg:mr-[100px] text-4xl lg:text-[3.375em] lg:leading-[1.111em];
}

.h2 {
  @apply text-3xl lg:text-[2.5em] leading-[1.3em];
}

.position {
  font-size: 1.375em;
  line-height: 1.091em;
}

.instructor-image {
  @apply max-w-[300px] max-h-[300px] lg:max-w-[400px] lg:max-h-[400px];
}

.instructor-summary {
  @apply lg:max-w-[45%];
}

.tag-item {
  padding: 7px 20px;
  color: #7e8c9a;
  @apply border-[1.5px] border-gray-50 rounded-full inline-block uppercase hover:text-black cursor-pointer;
}

.card {
  padding: 27px;
  border-radius: 35px;
  @apply border border-gray-50 transition-transform duration-300 ease-linear;
}

.card:hover {
  transform: scale(1.03);
}

.card-image {
  height: 200px;
  border-radius: 20px;
  @apply object-cover w-full lg:w-[300px] mb-8 lg:mb-0;
}

.card-title {
  font-size: 1.75em;
  line-height: 1.214em;
}

.card-info {
  @apply lg:max-w-[375px];
}

.card-button {
  line-height: 1.125em;
  @apply py-[15px] transition-all duration-300 ease-linear border-solid hover:bg-black hover:border-black hover:text-white inline-block;
}

.card-button:hover {
  transform: scale(1.04);
}

.card-price {
  @apply text-2xl lg:text-[2.25em] lg:leading-[1.111em];
}
</style>
