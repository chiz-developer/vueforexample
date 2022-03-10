<template>
  <div class="text-center">
    <!-- avatar -->
    <figure
      v-if="expert.avatar_thumb"
      class="w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] mx-auto"
    >
      <img
        :src="expert.avatar_thumb"
        class="object-cover w-full h-full rounded-full"
        alt="coach"
      />
    </figure>
    <div
      v-else
      class="
        p-2
        border border-black border-solid
        rounded-full
        w-[150px]
        h-[150px]
        lg:w-[250px] lg:h-[250px]
        mx-auto
        flex
        justify-center
        items-center
      "
    >
      <svg-icon name="user" class="w-20 h-20" />
    </div>
    <!-- # -->

    <div class="mt-7">
      <div class="text-xl font-extrabold text-blue-900 md:text-2xl">
        {{ expert.full_name }}
      </div>
      <div
        v-if="expert.position"
        class="mt-2 mb-5 text-base tracking-wider uppercase text-blue-50"
      >
        {{ expert.position.name }}
      </div>
      <div
        v-if="expert.details"
        class="text-xs font-light leading-5 text-black  md:text-base md:leading-6 opacity-70"
      >
        <p>
          {{ expert.details.bio }}
        </p>
      </div>
      <nuxt-link
        :to="`/experts/${expert.slug}`"
        class="block mt-8 font-semibold text-black uppercase transition duration-300 cursor-pointer  hover:text-blue-50"
      >
        {{ $t("experts.learn_more") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpertItem",
  props: ["expert"],
};
</script>
<style scoped></style>
