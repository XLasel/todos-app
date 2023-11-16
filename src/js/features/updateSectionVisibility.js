import { todoRepository, toggleAll, sectionList, footer } from "../entities";

export function updateSectionVisibility() {
  if (todoRepository.tasks.length === 0) {
    footer.classList.add("hidden");
    sectionList.classList.add("hidden");
    toggleAll.classList.add("hidden");
  }
  if (todoRepository.tasks.length > 0) {
    footer.classList.remove("hidden");
    sectionList.classList.remove("hidden");
    toggleAll.classList.remove("hidden");
  }
};
