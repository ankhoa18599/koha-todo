"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, isToday, isPast, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { GripVertical, Trash2, Edit2, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Todo, useTodoStore, Priority } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const priorityEmoji = {
  urgent: "🔥",
  normal: "⚡",
  low: "❄️",
};

interface TodoCardProps {
  todo: Todo;
  isActive: boolean;
}

export function TodoCard({ todo, isActive }: TodoCardProps) {
  const { toggleTodo, removeTodo, updateTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDate, setEditDate] = useState<Date | undefined>(todo.dueDate);
  const [editTime, setEditTime] = useState(todo.dueTime || "");
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;

    updateTodo(todo.id, {
      title: editTitle,
      dueDate: editDate,
      dueTime: editTime,
      priority: editPriority,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDate(todo.dueDate);
    setEditTime(todo.dueTime || "");
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const isDueToday = todo.dueDate && isToday(todo.dueDate);
  const isOverdue =
    todo.dueDate && todo.dueTime
      ? isPast(
          parseISO(`${format(todo.dueDate, "yyyy-MM-dd")}T${todo.dueTime}`),
        )
      : todo.dueDate && isPast(todo.dueDate) && !isToday(todo.dueDate);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-background neubrutalism group p-4",
        isActive ? "z-10 scale-105" : "",
        todo.completed ? "opacity-75" : "",
        isDueToday && !todo.completed ? "border-yellow-500" : "",
        isOverdue && !todo.completed ? "border-red-500" : "",
      )}
    >
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="touch-none p-1 opacity-50 transition-opacity hover:opacity-100"
          disabled={isEditing}
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => !isOverdue && toggleTodo(todo.id)}
          className="neubrutalism h-6 w-6 rounded-md"
          disabled={isOverdue}
        />

        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="neubrutalism"
              autoFocus
            />

            <select
              title="Edit Priority"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="neubrutalism rounded-md px-4 py-1"
            >
              <option value="low">❄️</option>
              <option value="normal">⚡</option>
              <option value="urgent">🔥</option>
            </select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="neubrutalism">
                  {editDate ? format(editDate, "MMM d") : "Set date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={editDate}
                  onSelect={setEditDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Input
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
              className="neubrutalism w-[120px]"
            />

            <Button onClick={handleSave} size="icon" variant="ghost">
              <Check className="h-4 w-4" />
            </Button>
            <Button onClick={handleCancel} size="icon" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "text-lg transition-all",
                todo.completed ? "line-through opacity-50" : "",
              )}
            >
              {todo.title}
            </span>
            <span className="text-xl" role="img" aria-label={todo.priority}>
              {priorityEmoji[todo.priority]}
            </span>
            {isDueToday && !todo.completed && (
              <span className="text-sm font-bold text-yellow-500">
                Due today!
              </span>
            )}
            {isOverdue && !todo.completed && (
              <span className="text-sm font-bold text-red-500">Overdue!</span>
            )}
          </div>
        )}

        {!isEditing && todo.dueDate && (
          <span
            className={cn(
              "hidden text-sm md:block",
              isDueToday && !todo.completed ? "font-bold text-yellow-500" : "",
              isOverdue && !todo.completed ? "font-bold text-red-500" : "",
            )}
          >
            {format(todo.dueDate, "MMM d, yyyy")}
            {todo.dueTime && ` ${todo.dueTime}`}
          </span>
        )}

        <div className="flex gap-2">
          {!isEditing && !isOverdue && (
            <button
              title="Edit"
              onClick={() => setIsEditing(true)}
              className="hover:text-primary p-1 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Edit2 className="h-5 w-5" />
            </button>
          )}
          <button
            title="Delete"
            onClick={() => removeTodo(todo.id)}
            className="hover:text-destructive p-1 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
