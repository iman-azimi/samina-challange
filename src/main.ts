import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { VueCookieNext } from "vue-cookie-next";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { toPersianDigit } from '@/utilities/toPersianDigit'
import { QuillEditor } from '@vueup/vue-quill'
import VueApexCharts from "vue3-apexcharts";

import '@vueup/vue-quill/dist/vue-quill.snow.css';
import "./assets/main.css";
import "./index.css";

const app = createApp(App);
app.component("DatePicker", Vue3PersianDatetimePicker);
app.component('QuillEditor', QuillEditor)

app.use(VueCookieNext);
const options = {
  rtl: true,
  position: POSITION.TOP_CENTER,
};
app.use(Toast, options);
app.use(createPinia());
app.use(VueApexCharts);

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});
app.use(router);

app.directive('persian-digits', {
  updated(el: any, binding: any) {
    const intactValue = el.value
    let modifiedValue = toPersianDigit(intactValue) 

    // lets Vue knows we have changed the value
    if (modifiedValue !== intactValue) {
      el.value = modifiedValue
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }
})
app.mount("#app");
