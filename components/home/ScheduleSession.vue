<template>
  <section class="relative mt-36 bg-color md:mt-24">
    <div class="container px-8 py-40 mx-auto 2xl:px-64">
      <div class="flex flex-col-reverse lg:flex-row lg:space-x-10">
        <div>
          <div v-html="this.$t('landing.schedule.title')" class="w-[380px] max-w-full px-6 text-2xl lg:text-4xl font-extrabold font-manrope">
          </div>
          <p class="my-8 text-black opacity-70 max-w-prose">
            {{ $t("landing.schedule.subtext") }}
          </p>
          <div>
            <nuxt-link
            :to="'/experts/hamad_al_saad'"
              class="w-full px-8 py-3 text-base font-medium text-white transition duration-300 ease-in-out delay-150 rounded-full md:w-auto bg-blue-50 hover:bg-black hover:-translate-y-1 hover:scale-110"
            >
            {{ $t("buttons.schedule_a_session") }}
            </nuxt-link>
          </div>
        </div>
        <figure class="mt-[-210px] mb-10 lg:mb-0 ">
          <img
            class="object-cover w-full h-full rounded-[50px]"
            src="~assets/images/sessionMan.jpg"
            alt="se"
          />
        </figure>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ScheduleSession",
};
</script>
<style scoped>
.bg-color {
  background-color: rgba(49, 164, 208, 0.2);
}
</style>
