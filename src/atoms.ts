import { atom } from "recoil";

export const selectedTable = atom({
  key: 'selectedTable', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});