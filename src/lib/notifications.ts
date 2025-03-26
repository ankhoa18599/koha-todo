'use client';

import { differenceInHours, isToday, parseISO } from 'date-fns';
import { Todo, useTodoStore } from './store';
import { toast } from 'sonner';

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

export function setupBackgroundSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      // Register periodic sync if supported
      if ('periodicSync' in registration) {
        const periodicSync = registration.periodicSync as any;
        periodicSync.register('check-todos', {
          minInterval: 24 * 60 * 60 * 1000, // 24 hours
        });
      }
    });
  }
}

export function checkDueTasks(todos: Todo[]) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const { updateLastNotified } = useTodoStore.getState();

  todos.forEach((todo) => {
    if (todo.completed || !todo.dueDate) return;

    const dueDateTime = todo.dueTime
      ? parseISO(`${todo.dueDate.toISOString().split('T')[0]}T${todo.dueTime}`)
      : new Date(todo.dueDate);

    const now = new Date();
    const hoursDifference = differenceInHours(dueDateTime, now);

    // Only notify once per day per task
    if (todo.lastNotified && isToday(todo.lastNotified)) {
      return;
    }

    if (isToday(dueDateTime)) {
      new Notification('Task Due Today!', {
        body: `"${todo.title}" is due today${todo.dueTime ? ` at ${todo.dueTime}` : ''}!`,
        icon: '/favicon.ico',
      });
      
      toast.warning(`Task "${todo.title}" is due today${todo.dueTime ? ` at ${todo.dueTime}` : ''}!`, {
        duration: 5000,
      });

      updateLastNotified(todo.id);
    } else if (hoursDifference < 0) {
      new Notification('Task Overdue!', {
        body: `"${todo.title}" is overdue!`,
        icon: '/favicon.ico',
      });
      
      toast.error(`Task "${todo.title}" is overdue!`, {
        duration: 5000,
      });

      updateLastNotified(todo.id);
    }
  });
}