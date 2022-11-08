export const ALL_KEYS = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "Enter",
  "Backspace",
] as const;

type KeyTuple = typeof ALL_KEYS;

export type Key = KeyTuple[number];

export type KeyState = "initial" | "correct" | "present" | "absent";

export type Row = Key[];

export type GameStatus = "IN_PROGRESS" | "WIN" | "FAIL";

export type Tile = {
  key: Key;
  keyState: KeyState;
};

export type HuxleRow = {
  tiles: Tile[];
  rowState: HuxleRowState;
};

export type HuxleRowState = "initial" | "evaluated";
