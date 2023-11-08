import todoRepository from "../entities/todoRepository.js";

const localStorageHandler = {
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(todoRepository.tasks));
  },

  getTasks() {
    if (localStorage.getItem("tasks")) {
      todoRepository.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  },
};

export default localStorageHandler;
