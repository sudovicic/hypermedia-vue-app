<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps<{
  headlineKey: string;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="flex justify-between p-4 bg-blue-300">
    <p class="text-lg font-bold">{{ t(headlineKey) }}</p>
    <div class="text-center">
      <router-link to="/create" class="text-lg font-bold"
        >{{ t("create_huxle") }}
      </router-link>
    </div>
    <slot></slot>
  </div>
</template>
