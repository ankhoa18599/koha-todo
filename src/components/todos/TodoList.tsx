'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTodoStore } from '@/lib/store';
import { TodoCard } from './TodoCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, PriorityFilter } from './TodoFilters';

interface TodoListProps {
  statusFilter: Filter;
  priorityFilter: PriorityFilter;
}

export function TodoList({ statusFilter, priorityFilter }: TodoListProps) {
  const { todos, reorderTodos } = useTodoStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTodos = todos.filter((todo) => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !todo.completed) ||
      (statusFilter === 'completed' && todo.completed);

    const matchesPriority =
      priorityFilter === 'all' || todo.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);
      const newTodos = arrayMove(todos, oldIndex, newIndex);
      reorderTodos(newTodos);
    }

    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => setActiveId(event.active.id as string)}
    >
      <SortableContext items={filteredTodos} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TodoCard
                  todo={todo}
                  isActive={activeId === todo.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
}