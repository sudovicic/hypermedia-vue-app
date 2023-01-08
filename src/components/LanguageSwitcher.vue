<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useHuxleStore } from "@/stores/huxle-store";

const { t, locale } = useI18n({ useScope: "global" });
const store = useHuxleStore();

function changeLocale(l: "en" | "de") {
  locale.value = l;
  store.setLanguage(l);
}
</script>

<template>
  <div class="">
    <button type="submit" class="inline" @click="changeLocale('de')">
      {{ t("lang_de") }}
    </button>
    &nbsp;|&nbsp;
    <button type="submit" class="inline" @click="changeLocale('en')">
      {{ t("lang_en") }}
    </button>
  </div>
</template>
