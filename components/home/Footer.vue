<template>
  <footer class="bg-black">
    <div class="container px-8 mx-auto text-white 2xl:px-40">
      <div
        class="
          border-solid
          md:border-b
          border-[#55656a]
          py-12
          flex flex-col-reverse
          md:flex-row md:space-s-8
          items-center
        "
      >
        <div
          class="border-solid border-t border-b border-[#55656a] md:border-none"
        >
          <div
            class="
              pt-4
              md:pt-0
              transition
              ease-in-out
              delay-150
              hover:-translate-y-1 hover:scale-110
              duration-300
              cursor-pointer
              w-[100px]
            "
            @click="$router.push('/')"
          >
            <img src="@/assets/images/footer-logo.png" alt="nourisher" />
          </div>
          <div class="mt-4 md:w-[384px] max-w-full">
            <p>
             {{ $t("footer.subtext") }}
            </p>
          </div>
          <div class="flex items-center py-4 mt-8 space-x-6 md:py-0">
            <svg-icon name="facebook" class="w-6 h-6 text-white" />
            <svg-icon name="twitter" class="w-6 h-6 text-white" />
            <svg-icon name="insta" class="w-6 h-6 text-white" />
          </div>
        </div>
        <div class="flex flex-col w-full md:space-s-12 md:flex-row md:w-auto">
          <ul>
            <li
              class="pb-4 transition duration-300 ease-in-out hover:text-blue-50"
            >
              <nuxt-link :to="'#'">Corporate</nuxt-link>
            </li>
            <li
              class="pb-4 transition duration-300 ease-in-out hover:text-blue-50"
            >
              <nuxt-link :to="'#'">Corporate</nuxt-link>
            </li>
            <li
              class="pb-4 transition duration-300 ease-in-out hover:text-blue-50"
            >
              <nuxt-link :to="'#'">Corporate</nuxt-link>
            </li>
            <li
              class="pb-4 transition duration-300 ease-in-out hover:text-blue-50"
            >
              <nuxt-link :to="'#'">Corporate</nuxt-link>
            </li>
            <li
              class="pb-4 transition duration-300 ease-in-out hover:text-blue-50"
            >
              <nuxt-link :to="'#'">Corporate</nuxt-link>
            </li>
          </ul>
          <ul>
            <li
              class="pb-4 transition duration-300 ease-in-out hover:text-blue-50"
            >
              <nuxt-link :to="'#'">Corporate</nuxt-link>
            </li>
            <li
              class="pb-4 transition duration-300 ease-in-out hover:text-blue-50"
            >
              <nuxt-link :to="'#'">Corporate</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="py-8">
        Copyright {{ new Date().getFullYear() }} © The Nourishers
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>