<template>
  <t-datepicker v-model="value" dateFormat="Y-m-d H:i:s" />
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
  mixins: [abstractField],
};
</script>
