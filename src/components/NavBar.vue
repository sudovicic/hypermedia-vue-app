<script setup lang="ts">
defineProps<{
  headlineKey: string;
}>();

import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="flex justify-between p-4 bg-blue-300">
    <p class="text-lg font-bold">{{ t(headlineKey) }}</p>
    <slot></slot>
  </div>
</template>
