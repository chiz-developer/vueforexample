<template>
  <div>
    <div class="flex">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"
        class="text-center px-8 py-2 cursor-pointer hover:font-semibold mb-4"
        :class="{ 'border-b border-black font-semibold': tab.isActive }"
      >
        {{ tab.title }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabsComponent",

  data() {
    return {
      currentTab: 0,
      tabs: [],
    };
  },

  created() {
    this.tabs = this.$children;
  },

  mounted() {
    this.selectTab(0);
  },

  methods: {
    selectTab(i) {
      this.selectedIndex = i;

      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    },
  },
};
</script>
