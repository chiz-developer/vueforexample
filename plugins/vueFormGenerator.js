import Vue from 'vue'
import VueFormGenerator from 'vue-form-generator'

import fieldRichselect from "@/vfgCustomFields/fieldRichselect.vue";
import fieldVue2editor from "@/vfgCustomFields/fieldVue2editor.vue";
import fieldDatepicker from "@/vfgCustomFields/fieldDatepicker.vue";
import fieldSlider from "@/vfgCustomFields/fieldSlider.vue";
import fieldStarRating from "@/vfgCustomFields/fieldStarRating.vue";
Vue.component("fieldRichselect", fieldRichselect);
Vue.component("fieldVue2editor", fieldVue2editor);
Vue.component("fieldDatepicker", fieldDatepicker);
Vue.component("fieldSlider", fieldSlider);
Vue.component("fieldStarRating", fieldStarRating);

Vue.use(VueFormGenerator)