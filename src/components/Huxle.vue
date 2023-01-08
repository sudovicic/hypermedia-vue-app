<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { useDecodeBase64 } from "@/composables/decoder";
import { useHuxleStore } from "@/stores/huxle-store";
import { onMounted, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import type { CustomGameMetaData } from "./CreateForm.vue";

const { t } = useI18n();

const store = useHuxleStore();
const route = useRoute();

const invalidURL = reactive({ value: false });

let customHuxleMetaDataRaw: string = "";
let customHuxleMetaData: CustomGameMetaData = {} as CustomGameMetaData;

try {
  customHuxleMetaDataRaw = useDecodeBase64(route.params.customhuxle as string);
  customHuxleMetaData = JSON.parse(customHuxleMetaDataRaw);
} catch (error) {
  invalidURL.value = true;
}

const correctWord = reactive({ value: customHuxleMetaData.wordInput1 }).value;

const reloadPage = (): void => {
  window.location.reload();
};

onMounted(() => {
  store.initWord(correctWord);
});
// TODO: imitate what the real Wordle saves to localStorage
</script>

<template>
  <!--
  {{ store.getCorrectWord }}
  {{ correctWord.toLowerCase() === inputWord.toLowerCase() }}
  {{ store.getGameWin }}
  {{ store.getGameOver }}
  -->

  <div class="mt-8 flex flex-col justify-center w-auto relative">
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
