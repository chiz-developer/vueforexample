<template>
<panel-page-wrapper>
  <div>
    <page-title>{{ $t("expert.config.title") }}</page-title>

    <Panel class="mt-16" :title="$t('expert.config.workinghours.title')">
      <!-- working hours selectort -->
      <expert-working-hours-editor ref="workinghours" class="mt-8" />
    </Panel>

    <expert-details-editor ref="details" />

    <!-- buttons -->
    <div class="flex justify-center w-full mt-16">
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
</panel-page-wrapper>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";
import formGenerator from "@/mixins/formGenerator";
import Panel from "@/components/layout/Panel";
import ExpertWorkingHoursEditor from "@/components/expert/ExpertWorkingHoursEditorComponent";
import ExpertDetailsEditor from "@/components/expert/ExpertDetailsEditorComponent";
import PageTitle from "@/components/layout/pageTitle";

export default {
  name: "ProfileDashboard",
  layout: "panel",
  components: {
    Panel,
    ExpertWorkingHoursEditor,
    PageTitle,
    ExpertDetailsEditor,
    PanelPageWrapper
  },
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

  methods: {
    async save() {
      await this.$refs.workinghours.submit();
      await this.$refs.details.submit();

      this.$toast.success(this.$t("messages.saved"));
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
