import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { User } from "lucide-react";
import axios from "axios";
import { login as loginRequest } from "../../../api/auth";
import { useAuth } from "../hooks/useAuth";

const iconButtonClass =
  "relative size-11 inline-flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const inputClass =
  "w-full h-10 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";

/** Menú de cuenta del header: iniciar sesión o cerrar sesión. */
export function AccountMenu() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cierra el menú con Escape o al hacer clic afuera.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    else setPassword(value);
    setError(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const session = await loginRequest(username.trim(), password);
      login(session.token, session.username);
      setPassword("");
      setOpen(false);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const detail: unknown = err.response.data?.detail;
        setError(
          typeof detail === "string" && detail.trim() !== ""
            ? detail
            : `El servidor respondió con error ${err.response.status}.`,
        );
      } else {
        setError("No se pudo conectar con el backend.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={isAuthenticated ? `Cuenta de ${user}` : "Mi cuenta"}
        aria-expanded={open}
        aria-controls="account-menu"
        onClick={() => setOpen(!open)}
        className={iconButtonClass}
      >
        <User className="h-5 w-5" />
        {isAuthenticated && (
          <span
            aria-hidden="true"
            className="absolute top-1.5 right-1.5 size-2 rounded-full bg-emerald-500"
          />
        )}
      </button>

      {open && (
        <div
          id="account-menu"
          className="absolute right-0 mt-2 w-72 rounded-lg border border-outline-variant bg-surface-container-lowest shadow-lg p-4 z-50"
        >
          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <p className="text-body-sm text-on-surface-variant">
                Sesión activa:{" "}
                <span className="font-semibold text-on-surface">{user}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              aria-label="Formulario de inicio de sesión"
              className="flex flex-col gap-3"
            >
              <p className="text-body-sm text-on-surface-variant">
                Acceso de administrador para agregar productos.
              </p>
              <div>
                <label
                  htmlFor="menu-username"
                  className="block text-body-sm mb-1"
                >
                  Usuario
                </label>
                <input
                  id="menu-username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  placeholder="admin"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="menu-password"
                  className="block text-body-sm mb-1"
                >
                  Contraseña
                </label>
                <input
                  id="menu-password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {submitting ? "Ingresando…" : "Ingresar"}
              </button>
              {error && (
                <p role="alert" className="text-body-sm text-error">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
