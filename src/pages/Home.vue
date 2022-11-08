<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Huxle from "@/components/Huxle.vue";
import Keyboard from "@/components/Keyboard.vue";
import type { Key, KeyState } from "@/types";
import { ref } from "vue";

const keyStates: Record<Key, KeyState> = ref({});

// eslint-disable-next-line
function handleKeyPress(key: Key) {
  // TODO: implement
}
</script>

<template>
  <NavBar />
  <main>
    <Huxle />
  </main>
  <Keyboard @key-press="handleKeyPress" :key-states="keyStates" />
</template>
