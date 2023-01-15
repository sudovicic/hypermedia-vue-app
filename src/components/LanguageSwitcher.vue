<script setup lang="ts">
import { watch, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useHuxleStore } from "@/stores/huxle-store";
import Modal from "@/components/Modal.vue";

const { t, locale } = useI18n({ useScope: "global" });

const store = useHuxleStore();

const langTemp = reactive({ value: "" });

const changeLang = reactive({ value: false });
const changeLangModal = reactive({ value: false });

const changeLocale = (l: "en" | "de"): void => {
  langTemp.value = l;
  changeLangModal.value = true;
};

const handleLangChange = (): void => {
  locale.value = langTemp.value;
  store.setLanguage(locale.value as string);
  store.resetMetaDataAfterLangChange();
  changeLangModal.value = false;
};
</script>

<template>
  <Modal v-if="changeLangModal.value" v-on:close="() => {}">
    <template #header>
      <h1>{{ t("change_lang_title") }}</h1>
    </template>
    <template #body>
      <p>{{ t("change_lang") }}</p>
      <div class="flex gap-3">
        <button
          class="p-3 px-4 bg-blue-700 text-white hover:bg-blue-400 rounded"
          @click="handleLangChange"
        >
          {{ t("yes") }}
        </button>
        <button
          class="p-3 px-4 bg-zinc-100 hover:bg-zinc-300 rounded"
          @click="
            () => {
              changeLang.value = false;
              changeLangModal.value = false;
            }
          "
        >
          {{ t("no") }}
        </button>
      </div>
    </template>
  </Modal>
  <div class="">
    <button
      type="submit"
      class="inline disabled:text-slate-500"
      @click="changeLocale('de')"
      :disabled="locale === 'de'"
    >
      {{ t("lang_de") }}
    </button>
    &nbsp;|&nbsp;
    <button
      type="submit"
      class="inline disabled:text-slate-500"
      @click="changeLocale('en')"
      :disabled="locale === 'en'"
    >
      {{ t("lang_en") }}
    </button>
  </div>
</template>
