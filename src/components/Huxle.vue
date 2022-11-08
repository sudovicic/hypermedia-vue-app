<script setup lang="ts">
import { useHuxleStore } from "@/stores/huxle-store";

const { rows } = useHuxleStore();

// TODO: imitate what the real Wordle saves to localStorage
</script>

<template>
  <div class="mt-8 flex flex-col justify-center w-screen">
    <div
      v-for="(row, i) in rows"
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
</template>
