<template>
  <div>
    <div class="text-3xl mb-11">{{ $t("dashboard.expert.my_events") }}</div>
    <div v-if="events && events.length > 0">
      <div v-for="(event, index) in events" :key="index">
        <EventItem :item="event" />
      </div>
    </div>
    <div v-else>{{ $t("messages.no_results") }}</div>
  </div>
</template>

<script>
import EventItem from "@/components/expert/EventItem.vue";
export default {
  components: { EventItem },
  name: "MyEvents",

  data() {
    return {
      events: null,
    };
  },

  async fetch() {
    const expertID = this.$auth.user.id;
    this.events = await this.$axios
      .$get(`/experts/${expertID}/appointments`)
      .then((response) => response.data);
  },
};
</script>

<style scoped></style>
