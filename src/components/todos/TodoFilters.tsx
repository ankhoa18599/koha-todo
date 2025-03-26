"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Priority, useTodoStore } from "@/lib/store";

export type Filter = "all" | "active" | "completed";
export type PriorityFilter = Priority | "all";

interface TodoFiltersProps {
  statusFilter: Filter;
  priorityFilter: PriorityFilter;
  onStatusFilterChange: (filter: Filter) => void;
  onPriorityFilterChange: (filter: PriorityFilter) => void;
}

export function TodoFilters({
  statusFilter,
  priorityFilter,
  onStatusFilterChange,
  onPriorityFilterChange,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="space-x-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          className="neubrutalism"
          onClick={() => onStatusFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "active" ? "default" : "outline"}
          className="neubrutalism"
          onClick={() => onStatusFilterChange("active")}
        >
          Active
        </Button>
        <Button
          variant={statusFilter === "completed" ? "default" : "outline"}
          className="neubrutalism"
          onClick={() => onStatusFilterChange("completed")}
        >
          Completed
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={priorityFilter === "all" ? "default" : "outline"}
          className="neubrutalism"
          onClick={() => onPriorityFilterChange("all")}
        >
          All Priorities
        </Button>
        <Button
          variant={priorityFilter === "urgent" ? "default" : "outline"}
          className="neubrutalism"
          onClick={() => onPriorityFilterChange("urgent")}
        >
          🔥 Urgent
        </Button>
        <Button
          variant={priorityFilter === "normal" ? "default" : "outline"}
          className="neubrutalism"
          onClick={() => onPriorityFilterChange("normal")}
        >
          ⚡ Normal
        </Button>
        <Button
          variant={priorityFilter === "low" ? "default" : "outline"}
          className="neubrutalism"
          onClick={() => onPriorityFilterChange("low")}
        >
          ❄️ Low
        </Button>
      </div>
    </div>
  );
}
