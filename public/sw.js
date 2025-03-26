self.addEventListener("periodicsync", (event) => {
  if (event.tag === "check-todos") {
    event.waitUntil(
      (async () => {
        const todos = JSON.parse(
          localStorage.getItem("todo-storage") || '{"state":{"todos":[]}}',
        ).state.todos;

        todos.forEach((todo) => {
          if (todo.completed || !todo.dueDate) return;

          const dueDateTime = todo.dueTime
            ? new Date(`${todo.dueDate.split("T")[0]}T${todo.dueTime}`)
            : new Date(todo.dueDate);

          if (
            isToday(dueDateTime) &&
            (!todo.lastNotified || !isToday(new Date(todo.lastNotified)))
          ) {
            self.registration.showNotification("Task Due Today!", {
              body: `"${todo.title}" is due today${todo.dueTime ? ` at ${todo.dueTime}` : ""}!`,
              icon: "/favicon.ico",
            });
          }
        });
      })(),
    );
  }
});

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
