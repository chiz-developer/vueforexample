<template>
  <div class="relative">
    <div
      class="
        inset-x-0
        top-0
        absolute
        bg-color
        min-h-[170vh]
        md:min-h-[610px]
        -z-1
      "
    ></div>
    <div class="container px-4 mx-auto 2xl:px-40">
      <!-- header section -->
      <div class="pt-20">
        <h1 class="pt-16 font-extrabold text-center h1 font-manrope lg:pt-0">
          {{ $t("contact-us.title") }}
        </h1>
        <div class="mx-auto mt-8 text-center opacity-70 max-w-prose">
          <p>
            {{ $t("contact-us.subtext") }}
          </p>
        </div>
      </div>
      <!-- contact form layout -->
      <div
        class="
          mt-12
          w-full
          lg:w-[920px]
          mx-auto
          flex
          lg:flex-row
          flex-col
          lg:space-y-0
          space-y-8
          lg:rounded-[30px] lg:border
          border-solid border-gray-50
        "
      >
        <ContactUsForm
          class="
            px-4
            py-10
            bg-white
            rounded-[30px]
            lg:border-0
            border border-solid border-gray-50
            lg:ltr:rounded-r-none lg:rtl:rounded-l-none lg:p-12
          "
        />
        <div
          class="
            py-12
            bg-gray-300
            px-9
            lg:border-0
            border border-solid border-gray-50
            rounded-[30px]
            lg:ltr:rounded-l-none  lg:ltr:rounded-r-[30px] lg:rtl:rounded-l-[30px]
            lg:rtl:rounded-r-none
          "
        >
          <div class="mb-2 font-extrabold text-blue-900 h3 font-manrope">
            {{ $t("contact-us.details.title") }}
          </div>
          <p class="text-[#55656a]">
            {{ $t("contact-us.details.subtext") }}
          </p>
          <div class="flex flex-col">
            <a href="tel:+973 1711 1111" class="relative mt-8 nav-link"
              >+973 1711 1111</a
            >
            <a
              href="mailto:hello@thenourishers.com"
              class="relative uppercase nav-link"
              >hello@thenourishers.com</a
            >
          </div>
          <div class="my-10 h-[1px] bg-gray-50"></div>
          <div class="mb-2 font-extrabold text-blue-900 h3 font-manrope">
            {{ $t("contact-us.details.follow.title") }}
          </div>
          <p class="text-[#55656a]">
            {{ $t("contact-us.details.follow.subtext") }}
          </p>
          <ul class="mt-6 text-lg text-blue-900">
            <li class="flex items-center space-s-2">
              <figure>
                <svg-icon name="facebook" class="w-3 h-5" />
              </figure>
              <a href="https://www.facebook.com/" target="_blank">
                @thenourishers</a
              >
            </li>
            <li class="flex items-center space-s-2">
              <figure>
                <svg-icon name="twitter" class="w-5 h-5" />
              </figure>
              <a href="https://www.facebook.com/" target="_blank">
                @thenourishers</a
              >
            </li>
            <li class="flex items-center space-s-2">
              <figure>
                <svg-icon name="insta3" class="w-5 h-5" />
              </figure>
              <a href="https://www.facebook.com/" target="_blank">
                @thenourishers</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- studio section -->

      <div class="text-center mt-28">
        <div class="font-extrabold text-blue-900 h2 font-manrope">
          {{ $t("contact-us.studio.title") }}
        </div>
        <p class="text-[#55656a] mt-4 max-w-prose mx-auto">
          {{ $t("contact-us.studio.subtext") }}
        </p>
      </div>
    </div>

    <div
      class="
        container
        relative
        z-50
        px-16
        mx-auto
        mt-16
        bg-white
        rounded-[50px]
        pb-24
      "
    >
      <div class="flex flex-col items-center justify-center">
        <figure class="w-24 h-28">
          <img
            src="~assets/images/bahrain.png"
            class="object-contain w-full h-full"
            alt="bahrain"
          />
        </figure>
        <h3 class="my-6 font-extrabold h3 font-manrope">
          {{ $t("contact-us.studio.bahrain") }}
        </h3>
        <p class="text-[#55656a] text-center mt-4 max-w-prose mx-auto">
          {{ $t("contact-us.studio.address") }}
        </p>
        <div class="flex flex-col items-center mt-6 font-semibold">
          <a
            class="nav-link"
            href="tel:+973 1711 1111
"
            >+973 1711 1111
          </a>
          <a
            class="mt-4 nav-link"
            href="mailto:HELLO@THENOURISHERS.COM
"
            >HELLO@THENOURISHERS.COM
          </a>
        </div>
      </div>
    </div>
    
      <!-- map section -->

    <div class="relative mt-[-190px]">
      <div class="overlay"></div>
      <div class="pb-[28rem] absolute map-responsive -z-1">
        <iframe
          width="600"
          height="550"
          allowfullscreen="allowfullscreen"
          loading="lazy"
          class="responsive-iframe"
          style="border: 0px"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.5027728754008!2d8.65980111571046!3d49.87058417939952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd706fd1dd4b43%3A0x1a1565bf1707de1a!2sTeichhausstra%C3%9Fe%2041%2C%2064287%20Darmstadt%2C%20Deutschland!5e0!3m2!1sde!2snl!4v1625664538505!5m2!1sde!2snl"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import ContactUsForm from "../components/common/ContactUsForm.vue";
export default {
  components: { ContactUsForm },
  name: "ContactPage",
  layout: "default",
  methods: {},
};
</script>
<style scoped>
.h1 {
  letter-spacing: -0.01px;
  @apply text-4xl lg:text-[3.375em] lg:leading-[1.111em];
}
.h2 {
  @apply text-3xl lg:text-[2.5em] leading-[1.3em];
}
.h3 {
  @apply text-2xl lg:text-[1.5em] leading-[1.417em];
}
.map-responsive {
  overflow: hidden;
  position: relative;
  height: 0;
}

.map-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
.overlay {
  position: absolute; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
}
</style>