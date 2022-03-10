<template>
  <PanelPageWrapper>
    <div
      class="flex flex-col flex-wrap justify-between w-full"
    >
      <page-title>{{ $t("profile.title") }}</page-title>
      <div class="flex flex-col w-full xl:flex-row">
        <Panel>
          <div class="w-full mt-16">
            <div>
              <vue-form-generator
                v-if="dataLoaded"
                ref="form1"
                :schema="namesSchema"
                :model="model"
                :options="formOptions"
              >
              </vue-form-generator>
            </div>

            <p class="my-4 text-red-500" v-if="errorMessage">
              {{ errorMessage }}
            </p>
          </div>
        </Panel>

        <div class="w-full py-12 lg:px-16">
          <!-- upload Image -->
          <image-picker
            v-model="selectedImage"
            :preview="model.avatar"
          ></image-picker>

          <div class="flex items-center mt-14 space-x-11">
            <t-toggle v-model="showPassword" />
            <p class="text-2xl">{{ $t("profile.chpassword") }}</p>
          </div>
          <div v-show="showPassword" class="mt-5">
            <vue-form-generator
              v-if="dataLoaded"
              ref="form2"
              :schema="passwordSchema"
              :model="model"
              :options="formOptions"
            >
            </vue-form-generator>
          </div>
        </div>
      </div>

      <!-- buttons -->
      <div class="flex justify-center w-full">
        <div
          class="flex flex-col w-full space-y-4 lg:space-x-8 justify-evenly lg:flex-row lg:items-center lg:space-y-0"
        >
          <button
            @click="save"
            class="transition duration-200 ease-in btn primary hover:scale-105"
          >
            {{ $t("buttons.save") }}
          </button>
          <button class="transition duration-200 ease-in btn hover:scale-105">
            {{ $t("buttons.cancel") }}
          </button>
        </div>
      </div>
    </div>
  </PanelPageWrapper>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";
import formGenerator from "@/mixins/formGenerator";
import ImagePicker from "@/components/controls/imagePicker";
import Panel from "@/components/layout/Panel";
import PageTitle from "@/components/layout/pageTitle";

export default {
  name: "ProfileDashboard",
  layout: "panel",
  components: { Panel, ImagePicker, PageTitle, PanelPageWrapper },
  middleware: ["authorized"],
  mixins: [formGenerator],
  data() {
    return {
      errorMessage: null,
      showPassword: false,
      dataLoaded: false,
      selectedImage: null,
      vfgRefs: ["form1", "form2"],
      slider: null,
    };
  },

  async created() {
    const response = await this.$axios.$get("/user/profile");
    this.model = response;
    this.dataLoaded = true;
  },

  computed: {
    namesSchema() {
      return {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: this.$t("profile.fname"),
            placeholder: "John Doe",
            model: "first_name",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "input",
            inputType: "text",
            label: this.$t("profile.lname"),
            placeholder: "John Doe",
            model: "last_name",
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
            placeholder: "+380988765267",
            model: "phone",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
          {
            type: "radios",
            label: this.$t("profile.gender"),
            model: "gender",
            values: [this.$t("profile.male"), this.$t("profile.female")],
          },
        ],
      };
    },

    passwordSchema() {
      return {
        fields: [
          {
            type: "input",
            inputType: "password",
            label: this.$t("profile.password"),
            placeholder: "****************",
            model: "password",
            styleClasses: "fullwidth",
            validator: this.validator,
          },

          {
            type: "input",
            inputType: "password",
            label: this.$t("profile.repassword"),
            placeholder: "****************",
            model: "password_confirmation",
            styleClasses: "fullwidth",
            validator: this.validator,
          },
        ],
      };
    },
  },
  methods: {
    save() {
      let data = new FormData();
      for (var i in this.model) {
        data.append(i, this.model[i]);
      }

      if (this.selectedImage) {
        data.append("upload_image", this.selectedImage);
      }

      this.$axios
        .post("/user/profile", data)
        .then((response) => {
          this.$toast.success(this.$t("messages.saved"));
        })
        .catch((e) => this.setApiErrors(e));
    },
  },
};
</script>
<style lang="postcss" scoped>
label {
  font-weight: 600;
  color: #0b252e;
}
</style>
