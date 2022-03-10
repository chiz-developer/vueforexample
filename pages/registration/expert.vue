<template>
  <div class="">
    <div class="relative mb-24">
      <div class="inset-x-0 top-0 absolute bg-color min-h-[610px] -z-1"></div>
      <div class="container px-4 mx-auto 2xl:px-40 ">
        <div class="pt-20">
          <div
            class="pt-16 text-3xl font-extrabold text-center md:text-5xl font-manrope lg:pt-0"
          >
                      {{ $t("auth.sign_up") }}

          </div>
          <div class="mx-auto mt-8 text-center opacity-70 max-w-prose">
            <p>
               {{ $t("auth.description") }}
            </p>
          </div>
          <div class="w-full mt-5 text-center">
            <nuxt-link class="relative font-semibold uppercase nav-link" to="/signin"
              > {{ $t("auth.already_have_account") }}
              {{ $t("auth.sign_in") }}
            </nuxt-link>
          </div>
        </div>
        <RegisterFormLayout role="expert" />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterFormLayout from "@/components/auth/register/RegisterFormLayout.vue";

export default {
  components: { RegisterFormLayout },
  name: "RegisterPage",
  layout: "default",
  middleware: ["guest"],
};
</script>
