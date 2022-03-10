<template>
  <div class="flex flex-col lg:grid grid-cols-2 gap-5 lg:gap-10 w-full">
    <client-only>
      <v-date-picker
        ref="calendar"
        v-model="form.date"
        :select-attribute="calendarAttributes"
        class="date-picker max-w-full"
        title-position="left"
        :min-date="new Date()"
        :is-required="true"
        trim-weeks
        :locale="{
          id: this.$i18n.locale,
          firstDayOfWeek: 2,
          masks: { weekdays: 'WW', title: 'D MMMM YYYY' },
        }"
        @input="handleDateChange"
      />
    </client-only>

    <div>
      <div class="flex justify-between items-center">
        <div class="text-xl font-manrope font-bold">
          {{ $dayjs(form.date).format("DD MMMM, YYYY") }}
        </div>
        <div class="inline-flex items-center">
          <div role="button">
            <svg
              @click="handlePrevMonth"
              width="26px"
              height="26px"
              viewBox="0 -1 16 34"
            >
              <path
                d="M11.196 10c0 0.143-0.071 0.304-0.179 0.411l-7.018 7.018 7.018 7.018c0.107 0.107 0.179 0.268 0.179 0.411s-0.071 0.304-0.179 0.411l-0.893 0.893c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-8.321-8.321c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l8.321-8.321c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l0.893 0.893c0.107 0.107 0.179 0.25 0.179 0.411z"
              ></path>
            </svg>
          </div>
          <div role="button">
            <svg
              @click="handleNextMonth"
              width="26px"
              height="26px"
              viewBox="-5 -1 16 34"
            >
              <path
                d="M10.625 17.429c0 0.143-0.071 0.304-0.179 0.411l-8.321 8.321c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-0.893-0.893c-0.107-0.107-0.179-0.25-0.179-0.411 0-0.143 0.071-0.304 0.179-0.411l7.018-7.018-7.018-7.018c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l0.893-0.893c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l8.321 8.321c0.107 0.107 0.179 0.268 0.179 0.411z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="mt-5 flex flex-wrap gap-x-3 lg:gap-x-5 gap-y-2.5">
        <template v-if="timeSlots.length > 0">
          <div
            v-for="timeSlot in timeSlots"
            :key="timeSlot"
            @click="handleTimeChange(timeSlot)"
            class="border border-blue-50 text-base text-center font-medium rounded-2xl px-3 py-1 hover:bg-blue-50 hover:text-white cursor-pointer"
            :class="[
              form.time === timeSlot ? 'bg-blue-50 text-white' : 'text-blue-50',
            ]"
          >
            {{ timeSlot }}
          </div>
        </template>
        <div v-else class="text-blue-50">
          {{ $t("order.no_timeslot") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    expertId: {
      type: Number,
      required: true,
    },
    serviceId: {
      type: Number,
      required: true,
    },
    defaultDate: {
      type: Date,
      default: () => {
          return new Date()
      },
    },
  },

  data() {
    return {
      timeSlots: [],
      form: {
        date: this.defaultDate,
        time: null,
      },
    };
  },

  computed: {
    calendarAttributes() {
      return {
        highlight: {
          color: "black",
          fillMode: "none",
          style: {
            borderWidth: "1px",
          },
        },
      };
    },
  },

  mounted() {
    this.getTimeSlots();
  },

  methods: {
    async handlePrevMonth() {
      try {
        await this.$refs.calendar.move(-1);
      } catch (err) {
        ///
      }
    },

    async handleNextMonth() {
      try {
        await this.$refs.calendar.move(1);
      } catch (err) {
        ///
      }
    },

    handleDateChange(date) {
      this.form.time = null;
      this.getTimeSlots();
      this.$emit("date-change", date);
      this.$emit("time-change", null);
    },

    handleTimeChange(timeSlot) {
      this.form.time = timeSlot;
      this.$emit("time-change", timeSlot);
    },

    async getTimeSlots() {
      try {
        this.timeSlots = await this.$axios.$get(
          `/experts/${this.expertId}/services/${this.serviceId}/time-slots`,
          {
            params: {
              date: this.$dayjs(this.form.date).format("YYYY-MM-DD"),
            },
          }
        );
      } catch (err) {
        //
      }
    },
  },
};
</script>

<style scoped>
.date-picker >>> .vc-header {
  display: none;
}

.date-picker >>> .vc-arrows-container {
  display: none;
}

.date-picker {
  font-family: "Roboto Condensed", sans-serif;
  overflow: hidden;
  background: #f5fbfd;
  border-color: #d3eaf2;
  width: 100%;
}

.date-picker >>> .vc-weeks {
  padding: 20px;
}

.date-picker >>> .vc-weekday {
  color: black;
  font-weight: 500;
}
</style>
