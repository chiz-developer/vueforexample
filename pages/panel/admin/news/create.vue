<template>
  <PanelPageWrapper>
    <UpdateOrCreateNews />
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
};
</script>
