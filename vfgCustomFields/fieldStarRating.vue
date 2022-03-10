<template>
  <star-rating
    class="mt-4"
    v-model="value"
    :show-rating="false"
    :rounded-corners="true"
    :star-points="[
      23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31,
      17,
    ]"
    :star-size="32"
  ></star-rating>
</template>

<script>
import { abstractField } from "vue-form-generator";
import StarRating from "vue-star-rating";

export default {
  mixins: [abstractField],

  components: {
    StarRating,
  },
};
</script>
