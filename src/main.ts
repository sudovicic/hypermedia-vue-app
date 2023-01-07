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
      lang_de: "Deutsch",
      lang_en: "English",
      create_page_name: "Huxle Admin",
      create_headline: "Create a new Huxle",
      create_cta: "Create Link",
      language: "Language",
      word: "Word",
      select_language: "Select a language",
      five_word_letter: "Five word letter",
    },
    de: {
      app_name: "Huxle",
      lang_de: "Deutsch",
      lang_en: "English",
      create_page_name: "Huxle Admin",
      create_headline: "Erstelle ein neues Huxle",
      create_cta: "Link erstellen",
      language: "Sprache",
      word: "Wort",
      select_language: "Sprache auswählen",
      five_word_letter: "Wort bestehend aus fünf Buchstaben",
    },
  },
});

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount("#app");
