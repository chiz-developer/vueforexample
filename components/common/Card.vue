<template>
  <div
    class=" rounded-[32px]"
    :class="[ hideOnMobile ? 'xl:bg-white xl:card-shadow xl:p-9' : 'bg-white card-shadow p-5 md:p-12 ']"
  >
    <slot name="title">
      <div v-if="title" class="flex justify-between mb-10">
       <div class="text-3xl font-medium font-manrope">
          {{ title }}
        </div>
        <slot name="actions" />
      </div>
    </slot>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Card",

  props: {
    title: {
      type: String,
      default: null
    },

    bordered: {
      type: Boolean,
      default: false
    },

    hideOnMobile: {
      type: Boolean,
      default: false
    }
  }
};
</script>
