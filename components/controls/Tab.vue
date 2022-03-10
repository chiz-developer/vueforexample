<template>
  <div>
    <div v-show="isActive"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabComponent",
  data() {
    return {
      isActive: false,
    };
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
