"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TodoFilters,
  Filter,
  PriorityFilter,
} from "@components/todos/TodoFilters";
import {
  requestNotificationPermission,
  checkDueTasks,
  setupBackgroundSync,
} from "@lib/notifications";

import { ThemeToggler } from "@components/ThemeToggler";
import { TodoForm } from "@components/todos/TodoForm";
import { TodoList } from "@components/todos/TodoList";
import { useTodoStore } from "@lib/store";
import { CommandMenu } from "@components/CommandMenu";

export default function Home() {
  const [statusFilter, setStatusFilter] = useState<Filter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  // const todos = useTodoStore((state) => state.todos);
  const autoDisableOverdueTasks = useTodoStore(
    (state) => state.autoDisableOverdueTasks,
  );

  useEffect(() => {
    // Request notification permission and setup background sync
    requestNotificationPermission();
    setupBackgroundSync();

    // Set up periodic checks
    const notificationInterval = setInterval(
      () => {
        const currentTodos = useTodoStore.getState().todos;
        checkDueTasks(currentTodos);
      },
      1000 * 60 * 60,
    ); // Every hour

    const autoDisableInterval = setInterval(
      () => {
        autoDisableOverdueTasks();
      },
      1000 * 60 * 5,
    ); // Every 5 minutes

    // Initial checks
    const initialTodos = useTodoStore.getState().todos;
    checkDueTasks(initialTodos);
    autoDisableOverdueTasks();

    return () => {
      clearInterval(notificationInterval);
      clearInterval(autoDisableInterval);
    };
  }, []); // Empty dependency array since we're using getState()

  return (
    <div className="bg-background min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold md:text-4xl">
            Koha<span className="text-primary">Todo</span>
          </h1>
          <ThemeToggler />
        </header>

        <main className="space-y-8">
          <TodoForm />
          <TodoFilters
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onStatusFilterChange={setStatusFilter}
            onPriorityFilterChange={setPriorityFilter}
          />
          <TodoList
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
          />
        </main>

        <CommandMenu />
      </motion.div>
    </div>
  );
}
