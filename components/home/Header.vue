<template>
  <section class="relative pt-40 lg:pt-24">
    <div class="container z-10 px-8 mx-auto 2xl:px-40">
      <div
        class="flex flex-col items-center space-y-8 lg:space-y-0 lg:space-s-12 lg:flex-row"
      >
        <div>
          <div
            class="mb-5 text-2xl font-extrabold text-black lg:text-5xl font-manrope"
          >
            {{ $t("landing.header.title") }}
          </div>
          <div class="text-lg text-[#000000] opacity-70 max-w-prose">
            <p class="">
              {{ $t("landing.header.subtext") }}
            </p>
          </div>
          <div class="flex justify-center mt-12 lg:justify-start">
            <NuxtLink
              to="/experts"
              class="px-8 py-3 text-base font-medium text-white transition duration-300 ease-in-out delay-150 rounded-full bg-blue-50 hover:bg-black hover:-translate-y-1 hover:scale-110"
            >
              {{ $t("buttons.find_an_expert") }}
            </NuxtLink>
          </div>
        </div>
        <div>
          <figure class="w-full h-full lg:w-[641px] lg:h-[450px]">
            <img
              class="object-cover w-full h-full rounded-[35px]"
              src="~assets/images/team.jpeg"
              alt="team"
            />
          </figure>
        </div>
      </div>
    </div>
    <figure
      class="
        absolute
        top-[70%]
        lg:top-0
        right-0
        left-0
        lg:left-auto
        h-[220px]
        md:h-[320px]
        lg:h-[80vh]
        w-auto
        lg:w-[45%]
        bg-hero
        opacity-30
        lg:bg-auto
      "
    ></figure>
  </section>
</template>

<script>
export default {
  name: "Header",
};
</script>
<style scoped>
.bg-hero {
  background-image: url("~assets/images/bg-hero.png");
  background-position: 0px 0px, 50% 100%;
  color: rgba(49, 164, 208, 0.2);
  background-clip: border-box;
  object-fit: fill;
  z-index: -1;
}

@media (max-width: 640px) {
  .bg-hero {
    background-size: 800px;
  }
}
</style>
