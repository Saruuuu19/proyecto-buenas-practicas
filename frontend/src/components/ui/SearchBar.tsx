import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/productos?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative group ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary h-4 w-4" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
      />
    </form>
  );
}
