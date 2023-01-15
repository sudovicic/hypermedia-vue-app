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
    resetMetaDataAfterLangChange(): void {
      this.gameWin = false;
      this.gameOver = false;
      this.currentWord = "";
      this.currentWordIndex = 0;
      this.nextTileIndex = 0;
      this.currentRowIndex = 0;
      this.currentWordIndex = 0;
      this.rows = Array(...Array(6)).map((_) => ({
        tiles: [{}, {}, {}, {}, {}],
        rowState: "initial",
      })) as HuxleRow[];
    },
    setLanguage(lang: string): void {
      this.language = lang;
    },
    initWord(word: string): void {
      this.correctWord = word;
    },
    setCurrentWord(word: string): void {
      this.currentWord = word;
    },
    pushTile(key: Key): void {
      if (this.nextTileIndex < 5) {
        this.rows[this.currentRowIndex].tiles[this.nextTileIndex] = {
          key: key,
          keyState: "initial",
        };
        this.nextTileIndex++;
      }
    },
    popTile(): void {
      if (this.nextTileIndex > 0) {
        this.rows[this.currentRowIndex].tiles[this.nextTileIndex - 1] = {};
        this.nextTileIndex--;
      }
    },
    evaluateCurrentRow(): void {
      if (
        this.currentRowIndex < 6 &&
        this.nextTileIndex === 5 &&
        this.currentRow.rowState === "initial"
      ) {
        if (this.currentWord.toLowerCase() === this.correctWord.toLowerCase()) {
          this.rows[this.currentRowIndex].rowState = "evaluated";
          this.currentRow.tiles.map((tile) => (tile.keyState = "correct"));
          this.gameWin = true;
        } else {
          this.currentRow.tiles.forEach((tile, index) => {
            this.rows[this.currentRowIndex].rowState = "evaluated";
            console.log(tile.key?.toLowerCase() === this.correctWord[index].toLowerCase());

            console.log(!this.correctWord.includes(tile.key as string));

            if (
              this.correctWord
                .toLowerCase()
                .includes(tile.key?.toLowerCase() as string)
            ) {
              // if correct letter but wrong position
              tile.keyState = "present";
            } else {
              // if wrong letter
              tile.keyState = "absent";
            }

            // if correct letter and correct position
            if (
              tile.key?.toLowerCase() === this.correctWord[index].toLowerCase()
            ) {
              tile.keyState = "correct";
            }
          });
        }

        this.nextTileIndex = 0;

        this.currentRowIndex++;
        this.currentWordIndex++;
      }

      if (this.currentRowIndex === 6 && !this.gameWin) {
        this.gameOver = true;
      }
    },
  },
});
