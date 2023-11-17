import { updateCounter, updateStatusToggleAll } from "../features";

export const updateUI = () => {
  updateStatusToggleAll();
  updateCounter();
};
