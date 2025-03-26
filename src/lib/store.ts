import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { format, isPast, isToday, parseISO } from "date-fns";

export type Priority = "low" | "normal" | "urgent";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date;
  dueTime?: string;
  createdAt: Date;
  lastNotified?: Date;
}

interface TodoState {
  todos: Todo[];
  addTodo: (
    title: string,
    priority: Priority,
    dueDate?: Date,
    dueTime?: string,
  ) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  reorderTodos: (todos: Todo[]) => void;
  autoDisableOverdueTasks: () => void;
  updateLastNotified: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (title, priority, dueDate, dueTime) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: uuidv4(),
              title,
              completed: false,
              priority,
              dueDate: dueDate ? new Date(dueDate) : undefined,
              dueTime,
              createdAt: new Date(),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === id) {
              if (todo.dueDate) {
                const dueDateTime =
                  todo.dueTime && todo.dueDate
                    ? parseISO(
                        `${format(todo.dueDate, "yyyy-MM-dd")}T${todo.dueTime}`,
                      )
                    : todo.dueDate;

                if (isPast(dueDateTime) && !isToday(dueDateTime)) {
                  return todo;
                }
              }
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          }),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  ...updates,
                  dueDate: updates.dueDate
                    ? new Date(updates.dueDate)
                    : todo.dueDate,
                }
              : todo,
          ),
        })),
      reorderTodos: (todos) =>
        set({
          todos: todos.map((todo) => ({
            ...todo,
            dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
            createdAt: new Date(todo.createdAt),
            lastNotified: todo.lastNotified
              ? new Date(todo.lastNotified)
              : undefined,
          })),
        }),
      autoDisableOverdueTasks: () =>
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (!todo.completed && todo.dueDate) {
              const dueDateTime =
                todo.dueTime && todo.dueDate
                  ? parseISO(
                      `${format(todo.dueDate, "yyyy-MM-dd")}T${todo.dueTime}`,
                    )
                  : todo.dueDate;

              if (isPast(dueDateTime) && !isToday(dueDateTime)) {
                return { ...todo, completed: true };
              }
            }
            return todo;
          }),
        })),
      updateLastNotified: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, lastNotified: new Date() } : todo,
          ),
        })),
    }),
    {
      name: "todo-storage",

      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              todos: parsed.state.todos.map((todo) => ({
                ...todo,
                dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
                createdAt: new Date(todo.createdAt),
                lastNotified: todo.lastNotified
                  ? new Date(todo.lastNotified)
                  : undefined,
              })),
            },
          };
        },
        setItem: (name, state) => {
          const serialized = JSON.stringify({
            ...state,
            state: {
              ...state.state,
              todos: state.state.todos.map((todo) => ({
                ...todo,
                dueDate: todo.dueDate?.toISOString(),
                createdAt: todo.createdAt.toISOString(),
                lastNotified: todo.lastNotified?.toISOString(),
              })),
            },
          });
          localStorage.setItem(name, serialized);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
