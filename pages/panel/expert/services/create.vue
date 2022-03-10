<template>
  <PanelPageWrapper>
    <UpdateOrCreateService />
  </PanelPageWrapper>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";
import UpdateOrCreateService from '~/components/services/UpdateOrCreateService.vue';

export default {
  layout: "panel",

  components: {
    PanelPageWrapper,
    UpdateOrCreateService,
  },

  head() {
    return {
      title: `${this.$t('buttons.add')} ${this.$t('services.title')}`,
    };
  },
};
</script>
