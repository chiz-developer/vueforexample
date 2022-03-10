<template>
  <div>
    <div class="px-4 lg:px-2">
      <div>
        <h1
          class="pt-20 font-extrabold text-center text-black h1 font-manrope pb-14"
        >
          {{ $t("order.confirmation") }}
        </h1>
      </div>
      <div class="container max-w-screen-xl mx-auto mb-24">
        <div class="flex flex-col gap-5 lg:flex-row sm:gap-10">
          <div class="space-y-5 lg:w-3/4 sm:space-y-10">
            <div class="block border border-blue-10">
              <div class="block-header border border-blue-10">
                {{ $t("packages.title") }}
              </div>
              <div class="px-4 py-6 sm:p-7">
                <div class="flex flex-col lg:flex-row lg:gap-8">
                  <img
                    v-if="service.image_thumb_url"
                    class="flex-shrink-0 card-image"
                    :src="service.image_thumb_url"
                  />
                  <div class="flex flex-col justify-between flex-1 sm:flex-row">
                    <div class="card-info sm:pr-5 lg:pr-0">
                      <h3 class="mb-2 font-extrabold text-black card-title">
                        {{ service.name }}
                      </h3>
                      <div class="text-base leading-6">
                        <p>
                          {{ service.description }}
                        </p>
                      </div>
                      <div class="mt-6 flex flex-row items-center gap-[30px]">
                        <div class="inline-flex items-center gap-2.5">
                          <svg-icon
                            :name="`gender-${service.target}`"
                            class="w-8 h-8"
                          />
                          <div>
                            {{ $t(`services.targets.${service.target}`) }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex items-center justify-between sm:flex-col sm:items-end mt-7 sm:mt-0"
                    >
                      <div>
                        <VDropdown v-if="!service.free">
                          <div class="flex cursor-pointer">
                            <div>
                              <div
                                class="text-blue-450 font-semibold uppercase tracking-[0.08em] text-lg"
                              >
                                {{ price.sessions }}
                                {{ $tc("services.session", price.sessions) }}
                              </div>
                              <div class="text-xs">
                                {{ $t("packages.anytime") }}
                              </div>
                            </div>
                            <svg-icon name="arrow-down" class="w-6 h-6" />
                          </div>

                          <!-- This will be the content of the popover -->
                          <template #popper>
                            <div class="py-2">
                              <div
                                v-close-popper
                                class="flex flex-col lg:flex-row gap-1 lg:gap-2.5 px-5 py-2 hover:bg-gray-100 cursor-pointer justify-end"
                                v-for="(price, index) in service.prices"
                                :key="price.sessions"
                                @click="pickedSessions = price.sessions"
                              >
                                <div
                                  class="uppercase card-price font-manrope"
                                  :class="[
                                    index + 1 === service.prices.length
                                      ? 'text-blue-50 font-extrabold'
                                      : 'font-semibold text-black',
                                  ]"
                                >
                                  <span v-if="price.price > 0"
                                    >${{ price.price }}</span
                                  >
                                  <span v-else>{{ $t("services.free") }}</span>
                                </div>
                                <div>
                                  <div
                                    class="text-blue-450 font-semibold uppercase tracking-[0.08em] text-xs lg:text-sm"
                                  >
                                    {{ price.sessions }}
                                    {{
                                      $tc("services.session", price.sessions)
                                    }}
                                  </div>
                                  <div class="text-xs">
                                    {{ $t("packages.anytime") }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                        </VDropdown>
                      </div>
                      <div>
                        <div
                          class="font-extrabold uppercase card-price font-manrope text-blue-50"
                        >
                          <span v-if="service.free">{{
                            $t("services.free")
                          }}</span>
                          <span v-else>${{ price.price }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="block border border-blue-10">
              <div class="block-header border border-blue-10">
                {{ $t("expert.title") }}
              </div>
              <div class="px-4 py-6 sm:p-7 flex flex-col lg:flex-row lg:gap-8">
                <img
                  class="flex-shrink-0 card-image"
                  :src="expert.avatar_thumb"
                />
                <div>
                  <h3 class="mb-2 font-extrabold text-black card-title">
                    {{ expert.full_name }}
                  </h3>
                  <div v-if="expert.bio" class="text-base leading-6">
                    <p>
                      {{ expert.bio }}
                    </p>
                  </div>
                  <div class="mt-6 flex items-center gap-[30px]">
                    {{ expert.position.name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="block border border-blue-10">
              <div class="block-header border border-blue-10">
                {{ $t("order.datetime") }}
              </div>
              <div class="px-4 py-6 sm:p-7">
                <ServiceAppointmentDateTimePicker
                  :expert-id="expert.id"
                  :service-id="service.id"
                  @date-change="handleDateChange"
                  @time-change="handleTimeChange"
                />
              </div>
            </div>
          </div>

          <div class="space-y-5 lg:w-1/4 sm:space-y-10">
            <div class="block border border-blue-10" v-if="!$auth.loggedIn">
              <div class="border block-header border-blue-10">
                {{
                  isHaveAccount
                    ? $t("auth.sign_in")
                    : $t("auth.create_an_acoount")
                }}
              </div>
              <div class="px-4 py-6 sm:p-7">
                <template v-if="isHaveAccount">
                  <LoginForm @success="handleSuccessLogin">
                    <button
                      type="submit"
                      class="w-full px-8 text-base text-center text-white border rounded-full card-button bg-blue-50 border-blue-50"
                    >
                      {{ $t("auth.sign_in") }}
                    </button>
                    <div class="mt-5 text-center">
                      <a
                        href="#"
                        @click.prevent="isHaveAccount = false"
                        class="text-blue-50"
                      >
                        {{ $t("auth.create_an_acoount") }}
                      </a>
                    </div>
                  </LoginForm>
                </template>
                <template v-else>
                  <client-only>
                    <vue-form-generator
                      ref="form"
                      :schema="schema"
                      :model="form.user"
                      :options="formOptions"
                    >
                    </vue-form-generator>
                  </client-only>
                  <div class="text-right">
                    <a
                      href="#"
                      @click.prevent="isHaveAccount = true"
                      class="text-blue-50"
                    >
                      {{ $t("auth.already_have_account") }}
                    </a>
                  </div>
                </template>
              </div>
            </div>

            <div v-if="!service.free" class="block border border-blue-10">
              <div class="block-header border border-blue-10">
                {{ $t("order.payment_details") }}
              </div>
              <div class="px-4 py-6 sm:p-7">
                <div>
                  <TapCardForm
                    ref="tapForm"
                    @success="handlePayment"
                    @error="isLoading = false"
                  />
                </div>
              </div>
            </div>

            <div class="block border border-blue-10">
              <div class="block-header border border-blue-10">
                {{ $t("order.summary") }}
              </div>
              <div class="px-4 py-6 sm:p-7">
                <div class="flex items-center justify-between">
                  <div class="text-xl font-bold">{{ $t("order.total") }}:</div>
                  <div
                    class="font-extrabold uppercase card-price font-manrope text-blue-50"
                  >
                    <span v-if="service.free">{{ $t("services.free") }}</span>
                    <span v-else>${{ price.price }}</span>
                  </div>
                </div>
                <button
                  @click="submit"
                  class="mt-7 card-button px-8 border text-center text-base rounded-full w-full bg-blue-50 text-white border-blue-50"
                  :disabled="!isValidated || isLoading"
                  :class="{ 'opacity-40': !isValidated || isLoading }"
                >
                  <svg-icon
                    v-if="isLoading"
                    class="inline-block mr-2 w-4 h-4 animate-spin"
                    name="loading"
                  />
                  <span>{{ $t("buttons.book_now") }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formGenerator from "@/mixins/formGenerator";
import LoginForm from "~/components/auth/login/LoginForm.vue";
import { Dropdown, VClosePopper } from "floating-vue";
import "floating-vue/dist/style.css";
import TapCardForm from "~/components/payment/TapCardForm.vue";
import ServiceAppointmentDateTimePicker from "@/components/services/ServiceAppointmentDateTimePicker.vue";

export default {
  mixins: [formGenerator],

  components: {
    LoginForm,
    VDropdown: Dropdown,
    TapCardForm,
    ServiceAppointmentDateTimePicker,
  },

  directives: {
    "close-popper": VClosePopper,
  },

  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.$get(`/experts/by-slug/${params.slug}`);

      const service = data.services.find(
        (s) => s.id === parseInt(params.service_id)
      );

      if (!service) {
        return error({ statusCode: 404, message: "Service not found" });
      }

      return {
        expert: data,
        service,
        pickedSessions: service.free
          ? null
          : service.prices[service.prices.length - 1].sessions,
      };
    } catch (err) {
      error(err);
    }
  },

  data() {
    return {
      isLoading: false,
      tap: null,
      isHaveAccount: false,
      timeSlots: [],
      form: {
        date: new Date(),
        time: null,
        user: {
          name: "",
          email: "",
          phone: "",
          password: "",
        },
      },
    };
  },

  computed: {
    price() {
      return this.service.prices.find(
        (p) => p.sessions === this.pickedSessions
      );
    },

    schema() {
      return {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: this.$t("profile.full_name"),
            placeholder: this.$t("profile.full_name_placeholder"),
            model: "name",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "input",
            inputType: "email",
            label: this.$t("profile.email"),
            placeholder: "example@youremail.com",
            model: "email",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "input",
            inputType: "tel",
            label: this.$t("profile.phone"),
            placeholder: this.$t("profile.phone"),
            model: "phone",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "input",
            inputType: "password",
            label: this.$t("profile.password"),
            placeholder: this.$t("profile.password_placeholder"),
            model: "password",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
        ],
      };
    },

    calendarAttributes() {
      return {
        highlight: {
          color: "black",
          fillMode: "none",
          style: {
            borderWidth: "1px",
          },
        },
      };
    },

    isValidated() {
      return this.form.time !== null;
    },
  },

  methods: {
    handleSuccessLogin() {
      this.$toast.success(this.$t("messages.logged_in"));
    },

    handleDateChange(date) {
      this.form.date = date;
    },

    handleTimeChange(time) {
      this.form.time = time;
    },

    /*handlePayment(appointment) {
      this.initGoSell(appointment);
      goSell.openLightBox();
    },*/

    async registerUser() {
      const { token } = await this.$axios.$post(
        "/auth/register",
        this.form.user
      );
      await this.$auth.setUserToken(token);
    },

    async submit() {
      this.isLoading = true;

      try {
        if (!this.$auth.loggedIn) {
          await this.registerUser();
        }

        // free services can be processed without token
        if (this.service.free) {
          this.handlePayment();
        } else {
          this.$refs.tapForm.createCardToken();
        }
      } catch (err) {
        this.isLoading = false;
        this.setApiErrors(err);
      }
    },

    async handlePayment(token = null) {
      try {
        const { redirect_url } = await this.$axios.$post("/appointments", {
          expert_id: this.expert.id,
          service_id: this.service.id,
          sessions: this.pickedSessions,
          date: this.$dayjs(this.form.date).format("YYYY-MM-DD"),
          time: this.form.time,
          token,
        });

        if (this.service.free) {
          this.$router.push("/panel");
        } else {
          window.location.href = redirect_url;
        }
      } catch (err) {
        this.isLoading = false;
        ///
      }
    },
  },

  head() {
    return {
      title: this.$t("order.confirmation"),
    };
  },
};
</script>

<style scoped>
.h1 {
  @apply text-3xl lg:text-[2.5em] leading-[1.3em];
}

.block-header {
  border-radius: 30px;
  font-size: 1.25em;
  line-height: 1.3em;
  font-weight: 800;
  margin: -1px;
  @apply text-blue-50 text-center sm:text-left px-4 py-6 sm:px-[32px] sm:py-[24px];
}

.block {
  border-radius: 30px;
}

.card-image {
  border-radius: 20px;
  @apply object-cover w-full lg:h-[200px] lg:w-[200px] mb-8 lg:mb-0;
}

.card-info {
  @apply lg:max-w-[375px];
}

.card-title {
  font-size: 1.75em;
  line-height: 1.214em;
}

.card-price {
  @apply text-2xl lg:text-[2.25em] lg:leading-[1.111em];
}

.card-button {
  line-height: 1.125em;
  @apply py-[15px] transition-all duration-300 ease-linear border-solid inline-block;
}

.card-button:not([disabled]) {
  @apply hover:bg-black hover:border-black hover:text-white;
}

.date-picker >>> .vc-header {
  display: none;
}

.date-picker >>> .vc-arrows-container {
  display: none;
}

.date-picker {
  font-family: "Roboto Condensed", sans-serif;
  overflow: hidden;
  background: #f5fbfd;
  border-color: #d3eaf2;
  width: 100%;
}

.date-picker >>> .vc-weeks {
  padding: 20px;
}

.date-picker >>> .vc-weekday {
  color: black;
  font-weight: 500;
}
</style>
