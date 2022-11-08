<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Huxle from "@/components/Huxle.vue";
import Keyboard from "@/components/Keyboard.vue";
import type { Key, KeyState } from "@/types";
import { ref } from "vue";

const keyStates: Record<Key, KeyState> = ref({});
</script>

<template>
  <NavBar />
  <main>
    <Huxle />
  </main>
  <Keyboard :key-states="keyStates" />
</template>
