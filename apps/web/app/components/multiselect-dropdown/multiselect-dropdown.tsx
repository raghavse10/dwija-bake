"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronDown, Search, X } from "lucide-react";

export interface MultiselectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface MultiselectDropdownProps {
  options: MultiselectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  /** Max height of the options list (default: 240px) */
  maxListHeight?: string | number;
}

export function MultiselectDropdown({
  options,
  value,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  disabled = false,
  className = "",
  maxListHeight = 240,
}: MultiselectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.trim().toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, search]);

  const selectedSet = useMemo(() => new Set(value), [value]);
  const selectedOptions = useMemo(
    () => options.filter((o) => selectedSet.has(o.value)),
    [options, selectedSet]
  );

  const toggleOption = useCallback(
    (optionValue: string) => {
      const next = selectedSet.has(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(next);
    },
    [value, selectedSet, onChange]
  );

  const clearSelection = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange([]);
    },
    [onChange]
  );

  const selectAll = useCallback(() => {
    const allValues = filteredOptions.map((o) => o.value);
    const merged = new Set([...value, ...allValues]);
    onChange(Array.from(merged));
  }, [filteredOptions, value, onChange]);

  const clearAll = useCallback(() => {
    if (filteredOptions.length === 0) return;
    const filteredSet = new Set(filteredOptions.map((o) => o.value));
    onChange(value.filter((v) => !filteredSet.has(v)));
  }, [filteredOptions, value, onChange]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Focus search when opening
  useEffect(() => {
    if (open) {
      setSearch("");
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    },
    [open]
  );

  const triggerLabel =
    value.length === 0
      ? placeholder
      : value.length === 1
        ? selectedOptions[0]?.label ?? placeholder
        : `${value.length} selected`;

  const maxHeight =
    typeof maxListHeight === "number"
      ? `${maxListHeight}px`
      : maxListHeight;

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-w-[200px] ${className}`.trim()}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={placeholder}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-pink-cherry focus-visible:outline focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="truncate">{triggerLabel}</span>
        <span className="flex shrink-0 items-center gap-1">
          {value.length > 0 && (
            <button
              type="button"
              onClick={clearSelection}
              aria-label="Clear selection"
              className="rounded p-0.5 text-muted hover:bg-surface hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
          <ChevronDown
            className={`size-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-1 flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-lg"
          role="listbox"
          aria-multiselectable
          aria-label={placeholder}
        >
          <div className="border-b border-border p-2">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5">
              <Search className="size-4 shrink-0 text-muted" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-1 border-b border-border px-2 pb-2">
            <button
              type="button"
              onClick={selectAll}
              className="rounded px-2 py-1 text-xs text-muted hover:bg-pink-mist hover:text-foreground dark:hover:bg-pink-burgundy/20"
            >
              Select all
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="rounded px-2 py-1 text-xs text-muted hover:bg-pink-mist hover:text-foreground dark:hover:bg-pink-burgundy/20"
            >
              Clear
            </button>
          </div>

          <ul
            ref={listRef}
            className="overflow-y-auto overscroll-contain py-1"
            style={{ maxHeight }}
          >
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted">No options</li>
            ) : (
              filteredOptions.map((option) => {
                const selected = selectedSet.has(option.value);
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={selected}
                    onClick={() => toggleOption(option.value)}
                    className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-pink-mist dark:hover:bg-pink-burgundy/20"
                  >
                    <span
                      className="flex size-4 shrink-0 items-center justify-center rounded border border-border"
                      aria-hidden
                    >
                      {selected ? (
                        <span className="size-2.5 rounded-sm bg-brand-gold" />
                      ) : null}
                    </span>
                    {option.icon && (
                      <span className="flex shrink-0 text-muted [&>svg]:size-4">
                        {option.icon}
                      </span>
                    )}
                    <span className="min-w-0 truncate">{option.label}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
