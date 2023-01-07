<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { useEncodeBase64 } from "@/composables/encoder";
import { ALL_LANGUAGES } from "@/types";
import { ErrorMessage, Field, Form } from "vee-validate";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

type CustomGameMetaData = {
  languageSelect1: string;
  languageSelect2: string;
  wordInput1: string;
  wordInput2: string;
};

const { t } = useI18n();

const expand = reactive({ expand: false });

/* Validation */
const onSubmit = (customHuxleMetaData: CustomGameMetaData): void => {
  const values: string = JSON.stringify(customHuxleMetaData);

  inputText.text = generateLink(values);

  modelOpen.open = true;
};

/* Link generation */
const baseUrl: string = window.location.origin;

const generateLink = (customHuxleMetaData: Object): string => {
  const encodedMetaData: string = useEncodeBase64(customHuxleMetaData);
  return baseUrl + "/" + encodedMetaData;
};

/* Form validation */
const validateWordInput = (value: string) => {
  const regex = /^[A-Za-z]+$/i;

  if (!regex.test(value)) {
    return t("only_chars");
  }

  if (!value) {
    return t("required_field");
  }

  if (value.length != 5) {
    return t("word_five_chars");
  }

  return true;
};

/* Modal */
const modelOpen = reactive({ open: false });
const inputText = reactive({ text: "" });
const hasCopiedText = reactive({ value: false });

const copyTextToClipboard = (): void => {
  // Copy the text inside the text field
  navigator.clipboard.writeText(inputText.text);
  hasCopiedText.value = true;
};

// TODO: do validation
// TODO: translate everything
</script>

<template>
  <div class="relative">
    <Modal v-if="modelOpen.open" v-on:close="modelOpen.open = false">
      <template #header>
        <h1>{{ t("share_link") }}</h1>
      </template>

      <template #body>
        <p>{{ t("link_to_share") }}</p>
        <input
          readonly
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="inputText.text"
        />
        <div v-if="hasCopiedText.value" class="p-3 bg-zinc-100 rounded">
          <p>{{ t("text_has_been_copied") }}</p>
        </div>
        <button
          @click="copyTextToClipboard"
          class="bg-gray-400 hover:bg-gray-300 text-white font-semibold py-2 px-4 rounded"
        >
          {{ t("copy_to_clipboard") }}
        </button>
      </template>
    </Modal>
    <Form @submit="onSubmit" class="flex flex-col gap-y-4">
      <div class="flex flex-col gap-y-2">
        <label for="languageSelect1">{{ t("language") }}</label>
        <div class="text-base text-red-600">
          <ErrorMessage name="languageSelect1" />
        </div>
        <select
          id="languageSelect1"
          name="languageSelect1"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="lang in ALL_LANGUAGES" :key="lang" :value="lang">
            {{ t(`lang_${lang}`) }}
          </option>
        </select>
        <label for="wordInput1">{{ t("word") }}</label>
        <div class="text-base text-red-600">
          <ErrorMessage name="wordInput1" />
        </div>
        <Field
          name="wordInput1"
          id="wordInput1"
          as="input"
          type="text"
          :placeholder="t('five_word_letter')"
          :rules="validateWordInput"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="p-3 bg-zinc-100 rounded">
        <p>{{ t("change_lang_info") }}</p>
      </div>
      <button
        type="button"
        class="p-3 bg-zinc-100 hover:bg-zinc-300 rounded"
        @click="() => (expand.expand = !expand.expand)"
      >
        {{ expand.expand ? "-" : "+" }}
      </button>
      <div class="flex flex-col gap-y-2" v-if="expand.expand">
        <label for="languageSelect2">{{ t("language") }}</label>
        <div class="text-base text-red-600">
          <ErrorMessage name="languageSelect2" />
        </div>
        <select
          id="languageSelect2"
          name="languageSelect2"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="lang in ALL_LANGUAGES" :key="lang" :value="lang">
            {{ t(`lang_${lang}`) }}
          </option>
        </select>
        <label for="wordInput2">{{ t("word") }}</label>
        <div class="text-base text-red-600">
          <ErrorMessage name="wordInput2" />
        </div>
        <Field
          name="wordInput2"
          id="wordInput2"
          as="input"
          type="text"
          :placeholder="t('five_word_letter')"
          :rules="validateWordInput"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        class="bg-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-400 transition-colors uppercase"
      >
        {{ t("create_cta") }}
      </button>
    </Form>
  </div>
</template>
