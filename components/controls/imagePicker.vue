<template>
  <div
    class="w-48 h-48 mx-auto overflow-hidden border border-solid border-[#E5E5E5] rounded-full md:w-[269px] md:h-[269px]"
  >
    <input
      ref="filepicker"
      class="hidden"
      type="file"
      @change="imageSelected()"
      accept="image/png,image/jpeg,image/jpg"
    />
    <template v-if="src">
      <img
        :src="src"
        @click="showFileBrowser"
        class="object-cover w-full h-full"
      />
    </template>
    <div v-else class="cursor-pointer" @click="showFileBrowser">
      <figure>
        <svg-icon
          class="w-full h-full lg:mt-8 lg:-mb-8 md:h-[185px]"
          name="uploadPlus"
        />
      </figure>
      <p
        class="text-[12px] -mt-4 lg:-mt-0 lg:text-lg text-[#555555] opacity-50 text-center font-light"
      >
        <slot>{{ $t("imagepicker.uploadimage") }}</slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImagePicker",
  data() {
    return {
      selectedImage: null,
    };
  },

  props: {
    preview: {
      type: String,
    },
  },

  computed: {
    selectedImagePrivew() {
      return this.selectedImage
        ? URL.createObjectURL(this.selectedImage)
        : false;
    },
    src() {
      if (this.selectedImagePrivew) {
        return this.selectedImagePrivew;
      }

      if (this.preview) {
        return this.preview;
      }

      return false;
    },
  },

  methods: {
    imageSelected() {
      const file = this.$refs.filepicker.files[0];
      this.selectedImage = file;
      this.$emit("input", file);
    },

    showFileBrowser() {
      this.$refs.filepicker.click();
    },
  },
};
</script>
