<template>
  <div class="working-hours-editor">
    <template v-if="ready">
      <div
        v-for="day in items"
        :key="day.dayofweek"
        class="grid day-of-week gap-2 md:gap-10"
      >
        <div class="w-12 capitalize">
          {{ dayOfWeeks[day.dayofweek - 1] }}
        </div>
        <div>
          <vue-slider
            v-model="day.time"
            :data="hours"
            :disabled="day.day_off"
            tooltip="none"
          />
          <div
            class="flex justify-between text-sm"
            :class="{ 'opacity-40': day.day_off }"
          >
            <span
              >{{ $t("expert.config.workinghours.from") }}
              {{ day.time[0] }}</span
            >
            <span
              >{{ $t("expert.config.workinghours.to") }} {{ day.time[1] }}</span
            >
          </div>
        </div>
        <div>
          <label class="flex items-center cursor-pointer">
            <input
              v-model="day.day_off"
              type="checkbox"
              class="form-checkbox"
            />
            <span class="font-semibold text-sm ms-2">
              {{ $t("expert.config.workinghours.day_off") }}
            </span>
          </label>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
export default {
  name: "ExpertWorkingHoursEditor",
  components: { VueSlider },
  data() {
    return {
      ready: false,
      items: [
        { dayofweek: 1, time: ["0:00", "23:45"], day_off: false },
        { dayofweek: 2, time: ["0:00", "23:45"], day_off: false },
        { dayofweek: 3, time: ["0:00", "23:45"], day_off: false },
        { dayofweek: 4, time: ["0:00", "23:45"], day_off: false },
        { dayofweek: 5, time: ["0:00", "23:45"], day_off: false },
        { dayofweek: 6, time: ["0:00", "23:45"], day_off: false },
        { dayofweek: 7, time: ["0:00", "23:45"], day_off: false },
      ],
    };
  },

  created() {
    this.$axios
      .$get(`/experts/${this.userID}/working-hours`)
      .then((response) => {
        if (response.data.length > 0) this.items = response.data;
        this.ready = true;
      });
  },

  computed: {
    hours() {
      const quarterHours = ["00", "15", "30", "45"];
      const times = [];
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 4; j++) {
          times.push(i + ":" + quarterHours[j]);
        }
      }
      return times;
    },

    dayOfWeeks() {
      const dates = [];
      let currentDate = this.$dayjs().startOf("isoWeek");
      const endDate = this.$dayjs().endOf("isoWeek");
      const dayofweek = this.$t('dayofweek');

      while (endDate.isSameOrAfter(currentDate, "day")) {
        dates.push(dayofweek[currentDate.day()]);
        currentDate = currentDate.add(1, "day");
      }

      return dates;
    },

    userID() {
      return this.$auth?.user.id;
    },
  },

  methods: {
    submit() {
      return new Promise((resolve) => {
        this.$axios
          .post(`/experts/${this.userID}/working-hours`, { hours: this.items })
          .then((response) => {
            console.log('working hours');
            resolve();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style>
.working-hours-editor .day-of-week {
  grid-template-columns: 100px 1fr 100px;
}
.working-hours-editor .vue-slider-process {
  background-color: #31a4d0 !important;
}
</style>
