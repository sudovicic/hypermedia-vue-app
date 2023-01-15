<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { useDecodeBase64 } from "@/composables/decoder";
import { useHuxleStore } from "@/stores/huxle-store";
import { onMounted, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import type { CustomGameMetaData } from "./CreateForm.vue";

const { t } = useI18n();

const store = useHuxleStore();
const route = useRoute();

const invalidURL = reactive({ value: false });
const changeLangModal = reactive({ value: false });
const changeLang = reactive({ value: false });

let customHuxleMetaDataRaw: string = "";
let customHuxleMetaData: CustomGameMetaData = {} as CustomGameMetaData;

try {
  customHuxleMetaDataRaw = useDecodeBase64(route.params.customhuxle as string);
  customHuxleMetaData = JSON.parse(customHuxleMetaDataRaw);
} catch (error) {
  invalidURL.value = true;
}

const reloadPage = (): void => {
  window.location.reload();
};

onMounted(() => {
  store.setLanguage(customHuxleMetaData.languageSelect1);

  store.initWord(customHuxleMetaData.wordInput1);
});

// watch works directly on a ref
watch(
  () => store.getLang,
  async () => {
    if (customHuxleMetaData.languageSelect1 === store.getLang) {
      store.initWord(customHuxleMetaData.wordInput1);
    } else if (customHuxleMetaData.languageSelect2 === store.getLang) {
      store.initWord(customHuxleMetaData.wordInput2);
    }
  }
);
</script>

<template>
  <!--
  {{ store.getCorrectWord }}
  {{ correctWord.toLowerCase() === inputWord.toLowerCase() }}
  {{ store.getGameWin }}
  {{ store.getGameOver }}
  -->

  <div class="mt-8 flex flex-col justify-center w-auto relative">
    <Modal v-if="changeLangModal.value" v-on:close="reloadPage">
      <template #header>
        <h1>{{ t("change_lang_title") }}</h1>
      </template>
      <template #body>
        <p>{{ t("change_lang") }}</p>
        <div class="flex gap-3">
          <button
            class="p-3 px-4 bg-blue-700 text-white hover:bg-blue-400 rounded"
            @click="
              () => {
                changeLang.value = true;
                changeLangModal.value = false;
              }
            "
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
    <Modal v-if="invalidURL.value" v-on:close="reloadPage">
      <template #header>
        <h1>{{ t("sorry") }}</h1>
      </template>
      <template #body>
        <h1>{{ t("invalid_url") }}</h1>
      </template>
    </Modal>
    <Modal v-if="store.gameWin" v-on:close="reloadPage">
      <template #header>
        <h1>{{ t("game_win") }}</h1>
      </template>
      <template #body>
        <h1 class="flex justify-center">👑</h1>
      </template>
    </Modal>
    <Modal v-if="store.gameOver" v-on:close="reloadPage">
      <template #header>
        <h1>{{ t("game_over") }}</h1>
      </template>
      <template #body>
        <h1 class="flex justify-center">😢</h1>
      </template>
    </Modal>
    <div class="w-auto">
      <div
        v-for="(row, i) in store.rows"
        :key="i"
        class="flex justify-center w-full mb-1"
      >
        <div
          v-for="tile in row.tiles"
          :key="tile"
          :class="[
            'flex justify-center items-center h-16 w-16 mx-0.5 border-2 rounded font-bold uppercase transition-colors',
            tile.key && 'text-white',
            tile.keyState === 'initial' && 'bg-black border-black',
            row.rowState === 'evaluated' &&
              tile.keyState === 'absent' &&
              'bg-gray-500 border-gray-500',
            row.rowState === 'evaluated' &&
              tile.keyState === 'present' &&
              'bg-yellow-500 border-yellow-500',
            row.rowState === 'evaluated' &&
              tile.keyState === 'correct' &&
              'bg-lime-500 border-lime-500',
          ]"
        >
          <span class="font-bold text-3xl">{{ tile.key }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
