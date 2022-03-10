<template>
  <div class="mt-16">
    <div v-if="audience">
      <div class="text-3xl mb-11">{{ $t("dashboard.expert.audience") }}</div>

      <div
        v-if="female"
        class="bg-pink-50 flex justify-between px-12 py-4 rounded-[20px]"
      >
        <div class="flex flex-col items-center space-y-2">
          <div class="text-2xl">{{ $t("profile.female") }}</div>
          <figure class="mr-5">
            <svg-icon name="female" class="w-5 h-10" />
          </figure>
        </div>
        <div class="flex flex-col items-end space-y-4">
          <div class="text-5xl font-medium">{{ female.count }}</div>
          <div class="text-xl font-light">{{ female.percentage }}%</div>
        </div>
      </div>

      <div
        v-if="male"
        class="bg-green-50 flex justify-between px-12 py-4 rounded-[20px] mt-6"
      >
        <div class="flex flex-col items-center space-y-2">
          <div class="text-2xl">{{ $t("profile.male") }}</div>
          <figure>
            <svg-icon name="male" class="w-5 h-10" />
          </figure>
        </div>
        <div class="flex flex-col items-end space-y-4">
          <div class="text-5xl font-medium">{{ male.count }}</div>
          <div class="text-xl font-light">{{ male.percentage }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Audience",

  data() {
    return {
      audience: null,
    };
  },

  async fetch() {
    const expertID = this.$auth.user.id;
    this.audience = await this.$axios.$get(
      `/experts/${expertID}/stats/audience`
    );
  },

  computed: {
    male() {
      return this.audience.Male;
    },
    female() {
      return this.audience.Female;
    },
  },
};
</script>

<style scoped></style>
