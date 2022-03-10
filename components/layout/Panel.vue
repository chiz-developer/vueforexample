<template>
  <div class="w-full">
    <p class="mb-4 text-2xl font-medium font-manrope md:text-4xl" >{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "PanelComponent",
  props: {
    title: {
      type: String,
    },
  },
};
</script>