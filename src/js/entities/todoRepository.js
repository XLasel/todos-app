let todoRepository = {
  tasks: [],

  addTask(taskText) {
    let newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };
    this.tasks.push(newTask);
    return newTask;
  },

  doneTask(id) {
    const task = this.tasks.find((task) => task.id === id);
    task.done = !task.done;
  },

  deleteTask(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1);
  },

  getTask(id) {
    return this.tasks.find((task) => task.id === id) || null;
  },
};

export default todoRepository;
