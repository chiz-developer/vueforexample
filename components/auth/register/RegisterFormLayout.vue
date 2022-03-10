<template>
  <div
    class="
      p-4
      lg:p-12
      z-20
      rounded-[30px]
      bg-white
      border border-solid border-gray-50
      mt-12
      w-full
      lg:w-[750px]
      mx-auto
    "
  >
    <div class="flex flex-wrap">
      <div class="w-full">
        <ul class="flex pt-3 pb-4 mb-0 space-x-2 list-none lg:space-x-12">
          <li class="mr-2 -mb-px text-center cursor-pointer last:mr-0">
            <NuxtLink
              to="/registration/"
              class="block px-4 py-2 leading-normal uppercase transition duration-300 ease-in  lg:px-12 hover:text-blue-50"
              :class="{
                'border-b border-solid border-black font-bold':
                  role == 'individual',
              }"
            >
              {{ $t("auth.for_individuals.title") }}
            </NuxtLink>
          </li>
          <li class="mr-2 -mb-px text-center cursor-pointer last:mr-0">
            <NuxtLink
              to="/registration/expert"
              class="block px-4 py-2 leading-normal uppercase transition duration-300 ease-in  lg:px-12 hover:text-blue-50"
              :class="{
                'border-b border-solid border-black font-bold':
                  role == 'expert',
              }"
            >
              {{ $t("auth.for_experts.title") }}
            </NuxtLink>
          </li>
        </ul>
        <div
          class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white "
        >
          <div class="flex-auto py-5">
            <div class="tab-content tab-space">
              <IndividualForm v-if="role == 'individual'" />
              <ExpertForm v-if="role == 'expert'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExpertForm from "./forms/ExpertForm.vue";
import IndividualForm from "./forms/IndividualForm.vue";

export default {
  components: { ExpertForm, IndividualForm },
  name: "RegisterFormLayout",

  props: {
    role: {
      required: true,
      type: String,
    },
  },
};
</script>
