<template>
  <div class="flex flex-col lg:flex-row gap-1 lg:gap-2.5">
    <div class="uppercase price font-manrope">
      <span
        v-if="price > 0"
        :class="[
          selected ? 'text-blue-50 font-extrabold' : 'font-semibold text-black',
        ]"
      >
        ${{ price }}
      </span>
      <span v-else class="font-semibold text-black">
        {{ $t("services.free") }}
      </span>
    </div>
    <div>
      <div
        class="text-blue-450 font-semibold uppercase tracking-[0.08em] text-xs lg:text-sm"
      >
        {{ sessions }}
        {{ $tc("services.session", sessions) }}
      </div>
      <div class="text-xs">
        {{ $t("packages.anytime") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },

    selected: {
      type: Boolean,
      default: false,
    },

    sessions: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped>
.price {
  @apply text-2xl lg:text-[2.25em] lg:leading-[1.111em];
}
</style>