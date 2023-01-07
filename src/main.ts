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
      share_link: "Share this link",
      link_to_share: "Link to share:",
      copy_to_clipboard: "Copy to clipboard",
      text_has_been_copied: "Text has been copied to clipboard!",
      change_lang_info: "Optional: add another word in a different language!",
      required_field: "This field is required!",
      word_five_chars: "Word has to be five characters long!",
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
      share_link: "Link teilen",
      link_to_share: "Link:",
      copy_to_clipboard: "In die Zwischenablage kopieren",
      text_has_been_copied: "Text wurde in die Zwischenablage kopiert!",
      change_lang_info: "Optional: Füge ein Wort in einer anderen Sprach hinzu!",
      required_field: "Dieses Feld wird benötig!",
      word_five_chars: "Das Wort muss 5 Buchstaben lang sein!",
    },
  },
});

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);

app.mount("#app");
