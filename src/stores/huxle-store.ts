import { defineStore } from "pinia";
import type { Key } from "@/types";
import type { HuxleRow } from "@/types";

export const useHuxleStore = defineStore("huxle", {
  state: () => ({
    currentRowIndex: 0,
    nextTileIndex: 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rows: Array(...Array(6)).map((_) => ({
      tiles: [{}, {}, {}, {}, {}],
      rowState: "initial",
    })) as HuxleRow[],
  }),
  getters: {
    currentRow: (state) => state.rows[state.currentRowIndex],
  },
  actions: {
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
        this.rows[this.currentRowIndex].rowState = "evaluated";
        this.currentRow.tiles.map((tile) => (tile.keyState = "correct"));
        this.nextTileIndex = 0;
        if (this.currentRowIndex < 5) {
          this.currentRowIndex++;
        } else {
          alert("won or lost");
        }
      }
    },
  },
});
