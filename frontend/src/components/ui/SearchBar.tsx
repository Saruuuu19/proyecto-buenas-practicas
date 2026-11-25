import { useId, useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
  onSearch?: () => void;
}

export function SearchBar({ className = "", onSearch }: SearchBarProps) {
  const navigate = useNavigate();
  const { key, search } = useLocation();
  const id = useId();
  const urlQuery = new URLSearchParams(search).get("search") ?? "";
  const [draft, setDraft] = useState({ key, query: urlQuery });

  if (draft.key !== key) {
    setDraft({ key, query: urlQuery });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = draft.query.trim();
    navigate(q ? `/productos?search=${encodeURIComponent(q)}` : "/productos");
    onSearch?.();
  }

  return (
    <form
      role="search"
      className={`relative ${className}`}
      onSubmit={handleSubmit}
    >
      <label htmlFor={id} className="sr-only">
        Buscar productos
      </label>
      <input
        id={id}
        type="search"
        placeholder="Buscar productos..."
        value={draft.query}
        onChange={(e) => setDraft({ key, query: e.target.value })}
        autoComplete="off"
        className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-11 pr-4 text-body-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute inset-y-0 left-0 grid size-11 place-items-center rounded-lg text-on-surface-variant cursor-pointer hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Search aria-hidden="true" className="size-4" />
      </button>
    </form>
  );
}
