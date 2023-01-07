<script setup lang="ts">
import { useI18n } from "vue-i18n";
import NavBar from "@/components/NavBar.vue";
import CreateForm from "@/components/CreateForm.vue";

const { t } = useI18n();
</script>

<template>
  <NavBar headline-key="create_page_name" />
  <main>
    <div class="flex mt-8 mx-4 w-screen justify-center">
      <div class="flex flex-col gap-y-4">
        <h1 class="font-bold">{{ t("create_headline") }}</h1>
        <CreateForm />
      </div>
    </div>
  </main>
</template>
