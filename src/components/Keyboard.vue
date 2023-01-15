<script setup lang="ts">
import type { Key, KeyState, Row } from "@/types";
import { onUnmounted } from "vue";
import { ALL_KEYS } from "@/types";
import { useHuxleStore } from "@/stores/huxle-store";
import { computed } from "@vue/reactivity";

defineProps<{
  keyStates: Record<Key, KeyState>;
}>();

window.addEventListener("keyup", handleNativeKeyUp);
onUnmounted(() => {
  window.removeEventListener("keyup", handleNativeKeyUp);
});

const store = useHuxleStore();

function handleNativeKeyUp(e: KeyboardEvent) {
  if (!ALL_KEYS.includes(e.key as Key)) return;
  handleKeyPress(e.key as Key);
}

function handleKeyPress(key: Key) {
  switch (key) {
    case "Backspace":
      store.popTile();
      break;
    case "Enter":
      store.evaluateCurrentRow();
      break;
    default:
      store.pushTile(key);
      store.setCurrentWord(inputWord.value);
      break;
  }
}

const inputWord = computed(() =>
  store.rows[store.getCurrentWordIndex].tiles.map((tile) => tile.key).join("")
);

const rows: Row[] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];
</script>

<template>
  <div class="mt-8 xl:w-1/2 sm:w-3/4 flex mx-auto">
    <div class="w-full">
      <div v-for="(row, i) in rows" :key="i" class="flex w-full mb-2">
        <button
          v-for="key in row"
          :key="key"
          class="w-full p-2 py-4 mx-0.5 bg-gray-300 rounded font-bold uppercase transition-colors"
          @click="handleKeyPress(key)"
        >
          <span v-if="key !== 'Backspace'">{{ key }}</span>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
