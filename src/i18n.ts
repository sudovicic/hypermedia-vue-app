// @see https://vue-i18n.intlify.dev/guide/advanced/lazy.html#lazy-loading
import { createI18n } from "vue-i18n";

export function setupI18n(options: any) {
  const i18n = createI18n(options);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}

export function setI18nLanguage(i18n: any, locale: string) {
  i18n.global.locale.value = locale;
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  (document.querySelector("html") as HTMLElement).setAttribute("lang", locale);
}
