<template>
  <div class="">
    <div class="flex items-center justify-between mb-4">
      <div class="text-3xl font-medium font-manrope">
        {{ $t("dashboard.expert.payments") }}
      </div>
    </div>
    <div class="flex items-center mb-4 divide-x divide-black md:justify-end">
      <span
        @click="changeMode('weekly')"
        class="block text-[13px] mb-0 cursor-pointer underline-offset pr-2"
        :class="{'underline': mode == 'weekly'}"
      >
        {{ $t("chart.weekly") }}</span
      >
      <span
        @click="changeMode('monthly')"
        class="block text-[13px] cursor-pointer pl-2"
        :class="{'underline': mode == 'monthly'}"
      >
        {{ $t("chart.monthly") }}</span
      >
    </div>
    <BarChart
      :labels="chart.labels"
      :data="chart.data"
      v-if="chartVisible"
      class="h-[400px]"
    />
  </div>
</template>
<script>
import BarChart from "~/components/charts/BarChart.js";

export default {
  name: "PaymentsChart",
  components: { BarChart },

  data() {
    return {
      mode: "weekly",
      chartVisible: true,
      chart: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [0, 100, 300, 500, 1000, 5000],
      },
    };
  },

  async fetch() {
    const expertID = this.$auth.user.id;
    const response = await this.$axios.$get(
      `/experts/${expertID}/stats/payments`,
      { params: { mode: this.mode } }
    );
    const payments = Object.values(response);

    this.chart.labels = payments.map(payment => payment.label);
    this.chart.data = payments.map(payment => payment.value);
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
      this.$fetch();
    },
    forceRerender() {
      // Remove my-component from the DOM
      this.chartVisible = false;

      this.$nextTick(() => {
        // Add the component back in
        this.chartVisible = true;
      });
    },
  },
  watch: {
    "$i18n.locale": function () {
      this.forceRerender();
    },
  },
};
</script>
<style scoped>
.underline-offset {
  text-underline-offset: 4px;
}
</style>
