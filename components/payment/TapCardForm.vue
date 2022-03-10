<template>
  <div>
    <form ref="form" @submit.prevent="createCardToken">
      <!-- Tap element will be here -->
      <div id="element-container" :class="{ 'rtl' : this.$i18n.locale === 'ar' }"></div>

      <div class="text-red-500 mt-4" v-if="error">{{ error.message }}</div>
    </form>
  </div>
</template>

<script>
export default {
  head: {
    script: [
      {
        type: "text/javascript",
        src: "https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js",
      },
      {
        type: "text/javascript",
        src: "https://secure.gosell.io/js/sdk/tap.min.js",
        async: true,
      },
    ],
  },

  data() {
    return {
      timer: null,
      tap: null,
      card: null,

      error: null,
    };
  },

  mounted() {
    this.timer = setInterval(() => {
      // wait untill Tapjsli loaded
      if (typeof Tapjsli !== undefined) {
        clearInterval(this.timer);
        this.timer = null;

        this.init();
      }
    }, 500);
  },

  methods: {
    init() {
      this.tap = Tapjsli(this.$config.tapPublicKey);
      const elements = this.tap.elements({});

      const style = {
        base: {
          color: "#535353",
          lineHeight: "18px",
          fontFamily: "sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "rgba(0, 0, 0, 0.26)",
            fontSize: "15px",
          },
        },
        invalid: {
          color: "red",
        },
      };
      // input labels/placeholders
      const labels = {
        cardNumber: this.$t('card_form.card_number'),
        expirationDate: this.$t('card_form.expiration_date'),
        cvv: this.$t('card_form.cvv'),
        cardHolder: this.$t('card_form.card_holder'),
      };
      //payment options
      const paymentOptions = {
        currencyCode: ["KWD", "USD", "SAR", "BHD"],
        labels: labels,
        TextDirection: this.$i18n.locale === 'ar' ? "rtl" : "ltr",
        paymentAllowed: ['VISA', 'MASTERCARD', 'AMEX', 'MADA'],
      };

      //create element, pass style and payment options
      this.card = elements.create("card", { style: style }, paymentOptions);

      //mount element
      this.card.mount("#element-container");

      this.card.addEventListener("change", (event) => {
        if (event.loaded) {
          console.log("UI loaded :" + event.loaded);
          console.log("current currency is :" + this.card.getCurrency());
        }

        if (event.error) {
          this.error = event.error;
        } else {
          this.error = null;
        }
      });
    },

    createCardToken() {
      this.error = null;

      this.tap.createToken(this.card).then((result) => {
        if (result.error) {
          this.error = result.error;
          this.$emit("error", result.error);
        } else {
          this.$emit("success", result.id);
        }
      });
    },
  },
};
</script>

<style >
#element-container:not(.rtl) {
  margin-left: -20px;
}

#element-container.rtl {
  margin-right: -20px;
}

#element-container iframe {
  width: 100%;
}
</style>
