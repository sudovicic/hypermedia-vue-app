<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Huxle from "@/components/Huxle.vue";
import Keyboard from "@/components/Keyboard.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import type { Key, KeyState } from "@/types";
import { ref } from "vue";

const keyStates: Record<Key, KeyState> = ref({});
</script>

<template>
  <NavBar headline-key="app_name">
    <LanguageSwitcher />
  </NavBar>
  <main>
    <Huxle :custom-huxle="($route.params.customhuxle as string)" />
  </main>
  <Keyboard :key-states="keyStates" />
</template>
