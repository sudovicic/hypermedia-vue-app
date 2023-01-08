import { defineStore } from "pinia";
import type { Key } from "@/types";
import type { HuxleRow } from "@/types";

export const useHuxleStore = defineStore("huxle", {
  state: () => ({
    language: "en",
    gameWin: false,
    gameOver: false,
    currentWord: "",
    correctWord: "",
    currentRowIndex: 0,
    nextTileIndex: 0,
    currentWordIndex: 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rows: Array(...Array(6)).map((_) => ({
      tiles: [{}, {}, {}, {}, {}],
      rowState: "initial",
    })) as HuxleRow[],
  }),
  getters: {
    currentRow: (state) => state.rows[state.currentRowIndex],
    getCurrentWordIndex: (state) => state.currentWordIndex,
    getCorrectWord: (state) => state.correctWord,
    getGameWin: (state) => state.gameWin,
    getGameOver: (state) => state.gameOver,
    getLang: (state) => state.language,
  },
  actions: {
    setLanguage(lang: string) {
      this.language = lang;
    },
    initWord(word: string) {
      this.correctWord = word;
    },
    setCurrentWord(word: string) {
      this.currentWord = word;
    },
    pushTile(key: Key) {
      if (this.nextTileIndex < 5) {
        this.rows[this.currentRowIndex].tiles[this.nextTileIndex] = {
          key: key,
          keyState: "initial",
        };
        this.nextTileIndex++;
      }
    },
    popTile() {
      if (this.nextTileIndex > 0) {
        this.rows[this.currentRowIndex].tiles[this.nextTileIndex - 1] = {};
        this.nextTileIndex--;
      }
    },
    // TODO: properly evaluate row based on the actual word to be guessed
    evaluateCurrentRow() {
      if (
        this.currentRowIndex < 6 &&
        this.nextTileIndex === 5 &&
        this.currentRow.rowState === "initial"
      ) {
        console.log(this.correctWord.toLowerCase());
        console.log(this.currentWord.toLowerCase());

        if (this.currentWord.toLowerCase() === this.correctWord.toLowerCase()) {
          this.rows[this.currentRowIndex].rowState = "evaluated";
          this.currentRow.tiles.map((tile) => (tile.keyState = "correct"));
          this.gameWin = true;
        } else {
          this.nextTileIndex = 0;

          this.currentRowIndex++;
          this.currentWordIndex++;
        }
      }

      if (this.currentRowIndex === 6 && !this.gameWin) {
        this.gameOver = true;
      }
    },
  },
});
