<template>
  <div class="text-center py-28 px-8">
    <template v-if="payment.status === 'paid'">
      <div>
        <svg-icon
          name="badge-check"
          class="text-blue-400 fill-current w-28 h-28 mx-auto"
        />
        <h1 class="text-5xl font-extrabold text-blue-400">{{ title }}</h1>
        <div>
          <nuxt-link
            to="/panel"
            class="inline-block mt-7 card-button px-8 border text-center text-base rounded-full bg-blue-50 text-white border-blue-50"
          >
            {{ $t("payment_status.to_dashboard") }}
          </nuxt-link>
        </div>
      </div>
    </template>
    <template v-else-if="payment.status === 'failed'">
      <div>
        <svg-icon
          name="exclamation"
          class="text-blue-400 fill-current w-28 h-28 mx-auto"
        />
        <h1 class="text-5xl font-extrabold text-blue-400">{{ title }}</h1>
        <div class="mt-14">
          <p class="text-xl">{{ $t("payment_status.try_again_later") }}</p>
        </div>
        <nuxt-link
          to="/panel"
          class="inline-block mt-7 card-button px-8 border text-center text-base rounded-full bg-blue-50 text-white border-blue-50"
        >
          {{ $t("payment_status.to_dashboard") }}
        </nuxt-link>
      </div>
    </template>
    <template v-else>
      <div>
        <svg
          version="1.1"
          id="L4"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 50 100"
          enable-background="new 0 0 0 0"
          xml:space="preserve"
          class="text-blue-400 fill-current w-28 h-28 mx-auto"
        >
          <circle stroke="none" cx="6" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle stroke="none" cx="26" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle stroke="none" cx="46" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>

        <h1 class="text-5xl font-extrabold text-blue-400">{{ title }}</h1>
        <div class="mt-14">
          <p class="text-xl">{{ $t("payment_status.take_some_time") }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, query, error }) {
    try {
      return {
        payment: await $axios.$get(`/payments/${query.tap_id}`),
      };
    } catch (err) {
      error(err);
    }
  },

  data() {
    return {
      interval: null,
    };
  },

  computed: {
    title() {
      if (this.payment.status === "paid") {
        return this.$t("payment_status.success");
      } else if (this.payment.status === "failed") {
        return this.$t("payment_status.failed");
      }

      return this.$t("payment_status.processing");
    },
  },

  mounted() {
    if (this.payment.status === "pending") {
      this.interval = setInterval(this.updatePaymentData, 5000);
    }
  },

  head() {
    return {
      title: this.title,
    };
  },

  methods: {
    async updatePaymentData() {
      try {
        const { tap_id } = this.$route.query;
        this.payment = await this.$axios.$get(`/payments/${tap_id}`);

        if (this.payment.status !== "pending") {
          this.clearPaymentUpdateInterval();
        }
      } catch (err) {
        console.error(err);
      }
    },

    clearPaymentUpdateInterval() {
      clearInterval(this.interval);
      this.interval = null;
    },
  },

  beforeDestroy() {
    this.clearPaymentUpdateInterval();
  },
};
</script>

<style scoped>
.card-button {
  line-height: 1.125em;
  @apply py-[15px] transition-all duration-300 ease-linear border-solid inline-block;
}
</style>
