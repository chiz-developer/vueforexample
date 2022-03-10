<template>
  <div v-if="menuItem">
    <div class="mt-5">
        <NuxtLink :to="menuItem.uri">
          <div class="flex items-center space-s-5">
            <svg-icon :name="menuItem.icon" class="w-5 h-5 text-black lg:h-8 lg:w-8 flex-shrink-0" />
            <span class="text-lg lg:text-[18px]">{{ menuItem.label }}</span>
          </div>
        </NuxtLink>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItem: {
      type: Object,
      required: true,
    }
  }
}
</script>
