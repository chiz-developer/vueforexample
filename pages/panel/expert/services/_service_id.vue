<template>
  <PanelPageWrapper>
    <UpdateOrCreateService :item="service" />
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

  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.$get(`/services/${params.service_id}`)
      return {
        service: data
      }
    } catch (err) {
      error(err)
    }
  },

  head() {
    return {
      title: `${this.$t('buttons.edit')} ${this.$t('services.title')}`,
    };
  },
}
</script>
