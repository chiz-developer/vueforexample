<template>
  <div
    class="
      flex
      justify-between
      mb-4
      items-center
      w-full
      border border-solid border-[#D3EAF2]
      rounded-[19px]
      p-4
      lg:py-5
      lg:px-7
      bg-white
    "
  >
    <div class="flex space-s-6 ">
      <div class="flex items-center">
        <img v-if="item.user.avatar_thumb" :src="item.user.avatar_thumb" class="expert-avatar h-full w-full object-cover rounded-full">
        <div v-else class="p-2 border border-black border-solid rounded-full">
          <svg-icon name="user" class="w-6 h-6" />
        </div>
      </div>
      <div class="">
        <p class="font-semibold lg:text-[22px]">{{ item.user.full_name }}</p>
        <p class="text-sm">{{ item.service.name }}</p>
      </div>
    </div>
    <div>
      <p class="font-semibold lg:text-[22px]">{{ item.time_start }}</p>
      <p class="text-sm">{{ item.date }}</p>
    </div>
  </div> 
</template>

<script>
export default {
  name: "EventItem",

  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.expert-avatar {
  width: 42px;
  height: 42px;
}
</style>