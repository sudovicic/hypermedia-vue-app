export function useDecodeBase64(input: Object) {
  return window.atob(JSON.stringify(input));
}
