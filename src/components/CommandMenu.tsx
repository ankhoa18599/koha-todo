'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useTodoStore } from '@/lib/store';

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const { addTodo } = useTodoStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => {
            addTodo('Quick todo', 'normal');
            setOpen(false);
          }}>
            Add Quick Todo
          </CommandItem>
          <CommandItem onSelect={() => {
            setTheme('light');
            setOpen(false);
          }}>
            Switch to Light Mode
          </CommandItem>
          <CommandItem onSelect={() => {
            setTheme('dark');
            setOpen(false);
          }}>
            Switch to Dark Mode
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}