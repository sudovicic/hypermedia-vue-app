export function useDecodeBase64(input: string) {
  return JSON.parse(window.atob(input));
}
