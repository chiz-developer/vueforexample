<template>
  <div class="px-4 py-6 lg:p-10">
    <div class="text-3xl lg:text-4xl mb-5 lg:mb-10 font-medium font-manrope">{{ $t('order.new_appointment') }}</div>

    <div class="space-y-7">
      <!-- Package -->
      <div class="block border border-blue-10" v-if="selectedService">
        <div class="block-header border border-blue-10">{{ $t('packages.title') }}</div>
        <div class="px-4 py-6 sm:p-7 flex flex-col">
          <div class="service-item bg-white flex flex-col lg:flex-row gap-6">
            <img
              class="service-image object-cover"
              :src="selectedService.image_thumb_url"
            />
            <div class="flex flex-col justify-between gap-3 flex-1">
              <div class="flex flex-col lg:flex-row justify-between gap-5">
                <div class="space-y-3 flex-1">
                  <div class="font-bold text-xl font-manrope">
                    {{ selectedService.name }}
                  </div>
                  <div
                    v-if="selectedService.description"
                    class="leading-6 text-base font-light"
                  >
                    {{ selectedService.description }}
                  </div>
                </div>
                <div class="lg:text-right flex flex-col-reverse lg:flex-col lg:items-end gap-2">
                  <div class="inline-flex items-center gap-2.5">
                    <svg-icon
                      :name="`gender-${selectedService.target}`"
                      class="w-6 h-6"
                    />
                    <div>
                      {{ $t(`services.targets.${selectedService.target}`) }}
                    </div>
                  </div>
                  <div class="text-lg uppercase">
                    {{
                      $tc(
                        "services.sessions_left",
                        selectedService.sessions_left,
                        {
                          count: selectedService.sessions_left,
                        }
                      )
                    }}
                  </div>
                </div>
              </div>

              <div class="flex justify-between items-center gap-3">
                <div class="inline-flex gap-3">
                  <img
                    v-if="selectedService.expert.avatar_thumb"
                    :src="selectedService.expert.avatar_thumb"
                    class="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <div class="font-bold text-lg font-manrope leading-6">
                      {{ selectedService.expert.full_name }}
                    </div>
                    <div class="text-base font-light text-gray-500">
                      {{ selectedService.expert.position.name }}
                    </div>
                  </div>
                </div>
                <div>
                  <button @click="handleRemoveService">
                    <svg-icon name="trash" class="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Select Package -->
      <div v-else class="block border border-blue-10">
        <div class="block-header border border-blue-10">{{ $t('packages.select') }}</div>
        <div class="px-4 py-6 sm:p-7 flex flex-col gap-3 md:grid md:grid-cols-2 xl:grid-cols-1">
          <div
            v-for="service in services"
            :key="service.id"
            @click="selectedServiceId = service.id"
            class="service-item bg-white border border-blue-10 hover:border-blue-50 cursor-pointer p-4 md:p-8 flex flex-col xl:flex-row gap-6"
          >
            <img
              class="service-image object-cover"
              :src="service.image_thumb_url"
            />
            <div class="flex flex-col justify-between gap-3 flex-1">
              <div class="flex flex-col xl:flex-row justify-between gap-5">
                <div class="space-y-3 flex-1">
                  <div class="font-bold text-xl font-manrope">
                    {{ service.name }}
                  </div>
                  <div
                    v-if="service.description"
                    class="leading-6 text-base font-light"
                  >
                    {{ service.description }}
                  </div>
                </div>
                <div class="text-lg uppercase xl:mt-2">
                  {{
                    $tc("services.sessions_left", service.sessions_left, {
                      count: service.sessions_left,
                    })
                  }}
                </div>
              </div>

              <div class="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3">
                <div class="inline-flex gap-3">
                  <img
                    v-if="service.expert.avatar_thumb"
                    :src="service.expert.avatar_thumb"
                    class="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <div class="font-bold text-lg font-manrope leading-6">
                      {{ service.expert.full_name }}
                    </div>
                    <div class="text-base font-light text-gray-500">
                      {{ service.expert.position.name }}
                    </div>
                  </div>
                </div>
                <div class="inline-flex items-center gap-2.5">
                  <svg-icon
                    :name="`gender-${service.target}`"
                    class="w-6 h-6"
                  />
                  <div>{{ $t(`services.targets.${service.target}`) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template v-if="selectedService">
        <!-- Expert -->
        <div class="block border border-blue-10">
          <div class="block-header border border-blue-10">{{ $t('expert.title') }}</div>
          <div class="px-4 py-6 sm:p-7">
            <div class="service-item bg-white flex flex-col lg:flex-row gap-6">
              <img
                class="service-image object-cover"
                :src="selectedService.expert.avatar_thumb"
              />
              <div class="flex flex-col justify-between gap-3 flex-1">
                <div class="space-y-3 flex-1">
                  <div class="font-bold text-xl font-manrope">
                    {{ selectedService.expert.full_name }}
                  </div>
                  <div
                    v-if="selectedService.expert.details.bio"
                    class="leading-6 text-base font-light"
                  >
                    {{ selectedService.expert.details.bio }}
                  </div>
                  <div class="text-base font-light text-gray-500">
                    {{ selectedService.expert.position.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Appointment Date & Time -->
        <div class="block border border-blue-10">
          <div class="block-header border border-blue-10">
            {{ $t('order.datetime') }}
          </div>
          <div class="px-4 py-6 sm:p-7">
            <ServiceAppointmentDateTimePicker
              :expert-id="selectedService.expert.id"
              :service-id="selectedService.id"
              :default-date="date"
              @date-change="handleDateChange"
              @time-change="handleTimeChange"
            />
          </div>
        </div>
      </template>

      <div class="inline-flex gap-3">
        <button
          :disabled="!isValid"
          :class="{ 'opacity-40': !isValid || isLoading }"
          @click="submit"
          class="bg-blue-50 border border-blue-50 text-white py-3.5 px-14 rounded-full"
        >
          {{ $t('buttons.save') }}
        </button>
        <button
          @click="$emit('close')"
          class="bg-white border border-[#C4C4C4] hover:border-blue-50 hover:bg-blue-50 hover:text-white py-3.5 px-14 rounded-full"
        >
          {{ $t('buttons.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ServiceAppointmentDateTimePicker from "@/components/services/ServiceAppointmentDateTimePicker.vue";

export default {
  props: {
    serviceId: {
      type: Number,
      default: null,
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
  },

  components: {
    ServiceAppointmentDateTimePicker,
  },

  data() {
    return {
      isLoading: false,
      services: [],
      selectedServiceId: this.serviceId,
      form: {
        date: this.date,
        time: null,
      },
    };
  },

  mounted() {
    this.getServices();
  },

  computed: {
    selectedService() {
      return this.services.find((s) => s.id === this.selectedServiceId);
    },

    isValid() {
      return this.form.time !== null;
    },
  },

  methods: {
    ...mapActions({
      fetchAppointments: 'user/fetchAppointments'
    }),

    async getServices() {
      try {
        const { data } = await this.$axios.$get("/user/services");
        this.services = data;
      } catch (err) {
        //
      }
    },

    handleDateChange(date) {
      this.form.date = date;
    },

    handleTimeChange(time) {
      this.form.time = time;
    },

    handleRemoveService() {
      this.selectedServiceId = null;
      this.form.time = null;
    },

    async submit() {
      this.isLoading = true

      try {
        await this.$axios.$post('/user/appointments', {
          service_id: this.selectedService.id,
          date: this.$dayjs(this.form.date).format("YYYY-MM-DD"),
          time: this.form.time,
        })

        await this.fetchAppointments()
        this.$emit('close')
      } catch (err) {
        this.$toast.error(err.response?.data?.message);
      } finally {
        this.isLoading = false
      }
    }
  },
};
</script>

<style scoped>
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

.service-item {
  border-radius: 33px;
}

.service-image {
  width: 160px;
  height: 160px;
  border-radius: 21px;
}
</style>
