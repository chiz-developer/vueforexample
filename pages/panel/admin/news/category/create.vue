<template>
  <PanelPageWrapper>
    <UpdateOrCreateNewsCategory />
  </PanelPageWrapper>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";
import UpdateOrCreateNewsCategory from "~/components/news/category/UpdateOrCreateNewsCategory.vue";

export default {
  components: {
    PanelPageWrapper,
    UpdateOrCreateNewsCategory,
  },

  layout: "panel",
  middleware: ["authorized"],
};
</script>
