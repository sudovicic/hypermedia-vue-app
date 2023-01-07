export function useEncodeBase64(input: Object) {
  return window.btoa(JSON.stringify(input));
}
