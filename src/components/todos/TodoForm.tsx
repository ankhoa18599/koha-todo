"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Priority, useTodoStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo(title, priority, date, time);
    setTitle("");
    setDate(undefined);
    setTime("");
    setPriority("normal");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap gap-4 md:flex-nowrap">
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="neubrutalism flex-1"
        />

        <select
          title="select priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="neubrutalism bg-background px-4 py-2"
        >
          <option value="low">❄️ Low</option>
          <option value="normal">⚡ Normal</option>
          <option value="urgent">🔥 Urgent</option>
        </select>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`neubrutalism w-[180px] justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                autoFocus
              />
            </PopoverContent>
          </Popover>

          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="neubrutalism w-[150px]"
            placeholder="Set time"
          />
        </div>

        <Button type="submit" className="neubrutalism">
          Add Todo
        </Button>
      </div>
    </form>
  );
}
