<template>
  <PanelPageWrapper>
    <UpdateOrCreateNews :item="news" />
  </PanelPageWrapper>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";
import UpdateOrCreateNews from "~/components/news/UpdateOrCreateNews.vue";

export default {
  components: {
    PanelPageWrapper,
    UpdateOrCreateNews,
  },

  layout: "panel",
  middleware: ["authorized"],

  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.$get(`/news/${params.id}`);
      return {
        news: data,
      };
    } catch (err) {
      error(err);
    }
  },
};
</script>
