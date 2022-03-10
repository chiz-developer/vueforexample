<template>
  <div>
    <div class="flex gap-8 sm:gap-14">
      <label
        class="inline-flex items-center cursor-pointer"
        v-for="item in genders"
        :key="item"
      >
        <input type="radio" v-model="gender" :value="item" />
        <svg-icon :name="'gender-' + item" class="w-6 sm:w-8 h-6 sm:h-8 ml-1 sm:ml-4" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "unisex",
    },
  },

  data() {
    return {
      gender: this.value,
    };
  },

  watch: {
    gender(val) {
      return this.$emit("input", val);
    },
  },

  computed: {
    genders() {
      return ["unisex", "female", "male"];
    },
  },
};
</script>
