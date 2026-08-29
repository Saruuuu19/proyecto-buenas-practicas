import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = "" }: SearchBarProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/productos?search=${encodeURIComponent(q)}` : "/productos");
  }

  return (
    <form
      role="search"
      className={`relative group ${className}`}
      onSubmit={handleSubmit}
    >
      <label htmlFor="search-input" className="sr-only">
        Buscar productos
      </label>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary h-4 w-4" />
      <input
        id="search-input"
        type="search"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        className="w-full h-11 bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
      />
    </form>
  );
}
