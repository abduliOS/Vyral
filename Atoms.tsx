import { atom } from "recoil";
import { SampleData } from "./SampleData";
export const selectedButtonState = atom({
  key: "selectedButtonState",
  default: "pending",
});

export const selectedItemsState = atom({
  key: "selectedItemsState",
  default: SampleData,
});
