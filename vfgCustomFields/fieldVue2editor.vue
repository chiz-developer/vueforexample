<template>
  <CollapseTransition v-if="!hidden">
    <client-only>
      <VueEditor
        v-if="!hidden"
        :useCustomImageHandler="schema.useCustomImageHandler"
        @image-added="schema.handleImageAdded"
        v-model="value"
      />
    </client-only>
  </CollapseTransition>
</template>

<script>
import { abstractField } from "vue-form-generator";
import CollapseTransition from '@/components/common/CollapseTransition.vue'

export default {
  mixins: [abstractField],
    components: {
    CollapseTransition
  },
  computed: {
    hidden() {
      return this.schema.hidden || false;
    },
  },
};
</script>
