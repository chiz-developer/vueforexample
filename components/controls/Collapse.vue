<template>
  <div class="rounded-[20px] bg-[#f5f7f9]" @click="state = !state">
    <div class="relative p-4 md:p-8 border-l-2 border-transparent">
      <header class="flex items-center cursor-pointer select-none">
        <svg-icon
          name="arrow-down"
          class="w-10 h-10 text-primary flex-shrink-0 transform transition animation-duration-300"
          :class="[state ? 'rotate-180' : 'rotate-0']"
        />
        <span class="pl-2 text-base font-extrabold text-blue-450">
          {{ title }}
        </span>
      </header>
      <Transition>
        <div v-show="state" class="">
          <div class="pl-[48px] text-grey-darkest">
            <p class="text-base text-blue-400 max-w-prose">
              <slot />
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collapse",
  props: {
    title: String,
  },

  data() {
    return {
      state: false,
    };
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
  transform: translateY(0);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
