<template>
  <PanelPageWrapper>
    <PageTitle> {{ $t("navbar.news_category") }} </PageTitle>
    <div class="flex justify-end">
      <nuxt-link
        :to="'/panel/admin/news/category/create'"
        class="px-12 py-4 text-xl btn primary"
      >
        {{ $t("buttons.create") }}
      </nuxt-link>
    </div>
    <div class="mt-16">
      <t-table
        v-if="categories.length > 0"
        :data="categories"
        :headers="tableHeaders"
        :responsive="true"
      >
        <template slot="thead" slot-scope="props">
          <thead :class="props.theadClass">
            <tr :class="props.trClass">
              <th
                class=""
                v-for="(item, index) in props.data"
                :key="index"
                :class="[props.thClass, index === 0 ? '' : 'text-center']"
                v-if="item"
              >
                {{ item.text }}
              </th>
            </tr>
          </thead>
        </template>
        <template #tbody="{ tbodyClass, trClass, tdClass, thClass, data }">
          <tbody :class="[tbodyClass]">
            <tr
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
              :class="[trClass, 'group']"
            >
              <td class="w-8 whitespace-no-wrap md:w-4 lg:p-3">
                <span
                  class="justify-end w-full text-base font-semibold rtl:flex"
                >
                  {{ rowIndex + 1 }}
                </span>
              </td>
              <td
                class="w-32 py-3 text-center whitespace-no-wrap md:p-3 md:w-56"
              >
                {{ row.name["en"] }}
              </td>

              <td class="text-center whitespace-no-wrap lg:w-28 lg:p-5">
                <div class="flex items-center justify-center space-s-2">
                  <nuxt-link
                    class="px-6 py-2 text-base btn primary"
                    :to="`/panel/admin/news/category/${row.id}/edit`"
                  >
                    <svg-icon class="w-4 h-4" name="edit"
                  /></nuxt-link>
                  <button
                    class="px-6 py-2 text-base bg-red-500 btn danger"
                    @click="deleteItem(row.id)"
                  >
                    <svg-icon class="w-4 h-4" name="delete" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </t-table>
      <div class="flex justify-center text-2xl" v-else>
        {{ $t("messages.no_data") }}
      </div>
    </div>
  </PanelPageWrapper>
</template>

<script>
import PanelPageWrapper from "~/components/PanelPageWrapper.vue";
import PageTitle from "~/components/layout/pageTitle.vue";

export default {
  components: {
    PanelPageWrapper,
    PageTitle,
  },

  layout: "panel",
  middleware: ["authorized"],
  async asyncData({ $axios, error, query }) {
    try {
      const { data } = await $axios.$get("/news/categories");

      return {
        categories: data,
      };
    } catch (err) {
      error(err);
    }
  },
  computed: {
    tableHeaders() {
      return ["#", this.$t("news.title"), , this.$t("news.actions")];
    },
  },
  methods: {
    async deleteItem(item) {
      const confirm = await this.$dialog.confirm(
        this.$t("messages.delete_item"),
        "",
        "warning"
      );
      if (confirm.isOk) {
        await this.$axios.$delete(`/news/categories/${item}`);
        this.$nuxt.refresh();
      }
    },
  },
  head() {
    return {
      title: "News",
    };
  },
};
</script>
<style scoped>
</style>