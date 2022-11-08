import { defineStore } from "pinia";
import type { Key } from "@/types";
import type { HuxleRow } from "@/types";

export const useHuxleStore = defineStore("huxle", {
  state: () => ({
    currentRowIndex: 0,
    rows: [
      {
        tiles: [
          {
            key: "c",
            keyState: "present",
          },
          {
            key: "h",
            keyState: "absent",
          },
          {
            key: "o",
            keyState: "absent",
          },
          {
            key: "c",
            keyState: "present",
          },
          {
            key: "o",
            keyState: "absent",
          },
        ],
        rowState: "evaluated",
      },
      {
        tiles: [
          {
            key: "w",
            keyState: "initial",
          },
          {
            key: "e",
            keyState: "initial",
          },
          {
            key: "i",
            keyState: "initial",
          },
          {
            key: "r",
            keyState: "initial",
          },
          {
            key: "d",
            keyState: "initial",
          },
        ],
        rowState: "initial",
      },
      {
        tiles: [{}, {}, {}, {}, {}],
        rowState: "initial",
      },
      {
        tiles: [{}, {}, {}, {}, {}],
        rowState: "initial",
      },
      {
        tiles: [{}, {}, {}, {}, {}],
        rowState: "initial",
      },
      {
        tiles: [{}, {}, {}, {}, {}],
        rowState: "initial",
      },
    ] as HuxleRow[],
  }),
  getters: {},
  actions: {
    pushTile(key: Key) {
      console.log(`pushTile: key = ${key}`);
    },
    popTile() {
      console.log("popTile");
    },
    evaluateCurrentRow() {
      console.log("evaluateCurrentRow");
    },
  },
});
