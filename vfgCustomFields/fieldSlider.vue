<template>
  <div class="w-full">
    <vue-slider
    class=""
      :ref="schema.ref || 'slider'"
      v-model="value"
      :data="schema.data"
      :disabled="schema.disabled"
      :tooltip="schema.tooltip || 'none'"
    />
    <div class="">{{ value }}</div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import { abstractField } from "vue-form-generator";

export default {
  // component: { VueSlider },
  mixins: [abstractField],
};
</script>
