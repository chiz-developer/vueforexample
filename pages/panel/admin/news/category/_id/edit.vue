<template>
  <PanelPageWrapper>
    <UpdateOrCreateNewsCategory :item="category" />
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

  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.$get(`/news/categories/${params.id}`);
      return {
        category: data,
      };
    } catch (err) {
      error(err);
    }
  },
};
</script>
