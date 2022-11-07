<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });

function changeLocale(l: "en" | "de") {
  locale.value = l;
}
</script>

<template>
  <div class="">
    <button type="submit" class="inline" @click="changeLocale('de')">
      {{ t("german") }}
    </button>
    &nbsp;|&nbsp;
    <button type="submit" class="inline" @click="changeLocale('en')">
      {{ t("english") }}
    </button>
  </div>
</template>
