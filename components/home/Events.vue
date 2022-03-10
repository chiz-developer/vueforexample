<template>
  <section class="relative pt-40 lg:mt-24">
    <div class="container z-10 px-8 mx-auto 2xl:px-40">
      <div class="text-5xl text-[#0b252e] font-extrabold font-manrope mb-4">
     {{ $t("landing.events.title") }}
      </div>
      <p class="text-[#000000] opacity-70">
       {{ $t("landing.events.subtext") }}
      </p>
      <div class="grid grid-cols-1 gap-6 mt-12 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="border border-solid border-gray-50 rounded-[40px]">
          <figure class="h-[250px]">
            <img
              src="~assets/images/yoga.jpeg"
              class="object-cover w-full h-full rounded-[20px] lg:rounded-[40px]"
              alt="yoga"
            />
          </figure>
          <div class="px-8 pb-8 mt-8">
            <div class="mb-4 text-xl font-extrabold text-blue-900 font-manrope lg:text-2xl">Hatha Yoga</div>
            <p class="text-[#000000] opacity-70 font-light mb-5">
              Hatha Yoga is a great place to start if you are new to yoga or if
              you want to deepen your practice.
            </p>
            <div class="flex items-center space-s-4 ">
                 <svg-icon name="calendar" class="w-6 h-6" />
                 <div class="text-[#7e8c9a] font-bold text-base">December 24, 2020</div>
            </div>
             <div class="flex items-center mt-5 space-s-4 ">
                 <svg-icon name="clock" class="w-6 h-6" />
                 <div class="text-[#7e8c9a] font-bold text-base">7:00 pm to 10:00 pm</div>
            </div>
            <div class="hidden mt-6 text-base font-semibold uppercase lg:block">{{ $t('buttons.book_now') }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Events",
};
</script>
<style scoped>
</style>
