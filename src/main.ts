import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { setupI18n } from "@/i18n";
import "../index.css";

const i18n = setupI18n({
  legacy: false, // needed to use Composition API
  locale: "en",
  fallbackLocale: "en",
  allowComposition: true,
  messages: {
    en: {
      app_name: "Huxle",
      german: "Deutsch",
      english: "English",
    },
    de: {},
  },
});

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount("#app");
