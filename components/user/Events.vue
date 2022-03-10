<template>
  <div
    class="grid flex-wrap w-full grid-cols-1 gap-8 mt-4 xl:w-auto 2xl:grid-cols-2 lg:mt-20"
  >
    <!-- datepicker -->
    <client-only>
      <v-calendar
        class="max-w-full custom-calendar"
        :attributes="calendarAttributes"
        :min-date="new Date()"
        title-position="left"
        trim-weeks
        :locale="{
          id: this.$i18n.locale,
          firstDayOfWeek: 2,
          masks: { weekdays: 'WW', title: 'D MMMM YYYY' },
        }"
        @dayclick="handleDayClick"
      >
        <template #header>
          <div class="flex items-center gap-6 mb-6">
            <div
              class="w-11 h-11 bg-black rounded-lg text-2xl text-white font-medium flex items-center justify-center"
            >
              {{ $dayjs(date).format("DD") }}
            </div>
            <span class="text-3xl font-medium">
              {{ $dayjs(date).format("MMMM YYYY") }}
            </span>
          </div>
        </template>
      </v-calendar>
    </client-only>

    <!-- Scheduled Events -->

    <div>
      <div class="mb-8 text-2xl font-medium font-manrope lg:text-3xl">
        {{ $t("scheduled_events.title") }}
      </div>
      <template v-if="events.length > 0">
        <EventItem v-for="event in events" :key="event.id" :item="event" />
      </template>
      <div v-else>{{ $t("scheduled_events.no_data") }}</div>
      <div class="text-center mt-8" v-if="servicesCount > 0">
        <button
          @click="showScheduleAppointmentModal"
          class="bg-white border border-[#C4C4C4] hover:border-blue-50 hover:bg-blue-50 hover:text-white py-3.5 px-6 rounded-full"
        >
          {{ $t("buttons.schedule_new_appointment") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import EventItem from "@/components/user/EventItem.vue";
import CreateNewAppointment from "@/components/modals/CreateNewAppointment.vue";

export default {
  components: { EventItem },

  name: "Events",

  props: {
    servicesCount: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      date: new Date(),
    };
  },

  mounted() {
    this.fetchAppointments()
  },

  watch: {
    async date(val) {
      await this.setAppointmentsDate(val);
      await this.fetchAppointments();
    },
  },

  methods: {
    ...mapActions({
      fetchAppointments: 'user/fetchAppointments'
    }),

    ...mapMutations({
      setAppointmentsDate: 'user/setAppointmentsDate'
    }),

    handleDayClick(e) {
      if (e.isDisabled === false) {
        this.date = e.date;
      }
    },

    showScheduleAppointmentModal() {
      this.$modal.show(
        CreateNewAppointment,
        {
          date: this.date,
        },
        {
          width: 1000,
          height: "auto",
          scrollable: true,
          adaptive: true
        }
      );
    },
  },

  computed: {
    ...mapGetters({
      events: 'user/appointmentsItems'
    }),

    calendarAttributes() {
      return [
        {
          key: "today",
          highlight: {
            color: "black",
            fillMode: "outline",
          },
          dates: this.date,
        },
      ];
    },
  },
};
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  font-family: "Roboto Condensed", sans-serif;
  --weekday-bg: #fff;
  border-radius: 0;
  border: none;
  width: 100%;

  & .vc-header {
    background-color: #f8f9fa;
    padding: 20px 20px 20px 0;
  }
  & .vc-title {
    color: #000000;
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 500;
    font-size: 35px;
  }
  & .vc-arrows-container[dir="rtl"] {
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
  & .vc-pane {
    background-color: #f8f9fa;
  }
  & .vc-weeks {
    padding: 24px;
    border: 1px solid #d3eaf2;
    background-color: #fff;

    border-radius: 32px;
  }
  & .vc-arrows-container {
    padding: 7px 10px;
  }
  & .vc-arrow {
    color: black;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
    color: #000000;
    font-size: 18px;
    font-family: "Roboto Condensed", sans-serif;

    font-weight: 500;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    color: #000000;
    font-size: 18px;
    font-family: "Roboto Condensed", sans-serif;

    font-weight: 500;

    &.weekday-1,
    &.weekday-7 {
      background-color: #fff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
