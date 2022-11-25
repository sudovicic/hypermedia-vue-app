<script setup lang="ts">
import { ALL_LANGUAGES } from "@/types";
import { Form, Field, ErrorMessage } from "vee-validate";
import { string, object } from "yup";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const schema = object().shape({
  languageSelect1: string().label(t("language")).required(),
  languageSelect2: string().label(t("language")),
  wordInput1: string().length(5).label(t("word")).required(),
  wordInput2: string().length(5).label(t("word")),
});

function onSubmit(values): void {
  alert(JSON.stringify(values, null, 2));
}

function onInvalidSubmit(values): void {
  alert(JSON.stringify(values, null, 2));
}

// TODO: do validation
// TODO: translate everything
</script>

<template>
  <Form
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
    :validation-schema="schema"
    class="flex flex-col gap-y-4"
  >
    <div class="flex flex-col gap-y-2">
      <label for="languageSelect1">{{ t("language") }}</label>
      <label for="wordInput1">{{ t("word") }}</label>
      <Field id="languageSelect1" name="languageSelect1" as="select">
        <option value="" disabled>{{ t("select_language") }}</option>
        <option v-for="lang in ALL_LANGUAGES" :key="lang" :value="lang">
          {{ t(`lang_${lang}`) }}
        </option>
      </Field>
      <Field
        name="wordInput1"
        id="wordInput1"
        as="input"
        type="text"
        placeholder="five letter word"
      />
      <ErrorMessage name="languageSelect1" />
      <ErrorMessage name="wordInput1" />
    </div>
    <div class="flex flex-col gap-y-2">
      <p>Optional: add another word in a different language!</p>
      <label for="languageSelect2">{{ t("language") }}</label>
      <label for="wordInput2">{{ t("word") }}</label>
      <Field id="languageSelect2" name="languageSelect2" as="select">
        <option value="" disabled>{{ t("select_language") }}</option>
        <option v-for="lang in ALL_LANGUAGES" :key="lang" :value="lang">
          {{ t(`lang_${lang}`) }}
        </option>
      </Field>
      <Field
        name="wordInput2"
        id="wordInput2"
        as="input"
        type="text"
        placeholder="five letter word"
      />
      <ErrorMessage name="languageSelect2" />
      <ErrorMessage name="wordInput2" />
    </div>
    <button
      type="submit"
      class="bg-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-400 transition-colors uppercase"
    >
      {{ t("create_cta") }}
    </button>
  </Form>
</template>
