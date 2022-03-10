<template>
  <section class="relative py-40 mt-32 bg-img lg:mt-40">
    <div class="container z-10 flex justify-center px-8 mx-auto 2xl:px-64">
      <div
        class="
          rounded-[50px]
          p-6
          md:p-[100px]
          bg-[#f5f7f9]
          w-full
          lg:w-[800px]
          h-full
          md:h-[540px]
        "
      >
        <div
          class="text-2xl font-extrabold md:text-4xl lg:text-5xl font-manrope"
        >
          {{ $t("landing.about.title") }}
        </div>
        <div class="text-[#000000] opacity-70 text-base mt-5">
          <p>
            {{ $t("landing.about.subtext") }}
          </p>
        </div>
        <div class="flex items-center mt-8 space-s-6">
          <div class="flex justify-center w-full lg:w-auto md:justify-start">
            <button
              class="w-full px-8 py-3 text-base font-medium text-white transition duration-300 ease-in-out delay-150 rounded-full md:w-auto bg-blue-50 hover:bg-black hover:-translate-y-1 hover:scale-110"
            >
              {{ $t("buttons.who_we_are") }}
            </button>
          </div>
          <div class="hidden text-base font-semibold uppercase lg:block">
              {{ $t("buttons.view_programs") }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About",
};
</script>
<style scoped>
.bg-img {
  background-image: url("~assets/images/friendship.jpg");
  background-position: 0px 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-clip: border-box;
}
</style>
