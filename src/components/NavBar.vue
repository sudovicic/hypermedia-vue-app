<script setup lang="ts">
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const { t } = useI18n();
</script>

<template>
  <div class="flex justify-between p-4 bg-blue-300">
    <p class="text-lg font-bold uppercase">{{ t("app_name") }}</p>
    <LanguageSwitcher />
  </div>
</template>
