<script setup lang="ts">
import type { Key, KeyState, Row } from "@/types";

defineProps<{
  keyStates: Record<Key, KeyState>;
}>();

defineEmits<{
  (e: "keyPress", key: string): void;
}>();

const rows: Row[] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];
</script>

<template>
  <div class="mt-8">
    <div
      v-for="(row, i) in rows"
      :key="i"
      class="flex justify-center w-full mb-2"
    >
      <button
        v-for="key in row"
        :key="key"
        class="p-4 mx-1 bg-gray-300 rounded font-bold uppercase transition-colors"
        @click="$emit('keyPress', key)"
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
</template>
