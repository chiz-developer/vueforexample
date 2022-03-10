<template>
  <CollapseTransition v-if="!hidden">
    <t-rich-select
      :placeholder="this.$t('contact-us.form.placeholder.select')"
      :searchBoxPlaceholder="this.$t('buttons.search')"
      :options="schema.values"
      v-model="value"
      :multiple="schema.multiple"
      :valueAttribute="schema.valueAttribute"
      :textAttribute="schema.textAttribute"
      :hideSearchBox="schema.hideSearchBox"
      :required="schema.required"
      :disabled="schema.disabled || false"
    ></t-rich-select>
  </CollapseTransition>
</template>

<script>
import { abstractField } from "vue-form-generator";
import CollapseTransition from "@/components/common/CollapseTransition.vue";

export default {
  mixins: [abstractField],
  components: {
    CollapseTransition,
  },
  computed: {
    hidden() {
      return this.schema.hidden || false;
    },
  },
};
</script>
