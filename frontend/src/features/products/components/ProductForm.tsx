import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { createProduct } from "../../../api/products";
import { ErrorState } from "../../../components/ui/ErrorState";
import { Spinner } from "../../../components/ui/Spinner";

interface ProductFormProps {
  /** Se ejecuta después de un 201 para recargar la lista. */
  onCreated: () => void;
}

const initialForm = {
  title: "",
  price: "",
  category: "",
  image: "",
};

/** Traduce los errores de axios (400 del backend o red caída) a un mensaje. */
function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const detail: unknown = error.response?.data?.detail;
    if (typeof detail === "string" && detail.trim() !== "") return detail;
    if (error.response) return `El servidor respondió con error ${error.response.status}.`;
    return "No se pudo conectar con el backend. ¿Está corriendo en el puerto 8000?";
  }
  return "No se pudo agregar el producto.";
}

export function ProductForm({ onCreated }: ProductFormProps) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSaved(false);
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      await createProduct({
        title: form.title.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        image: form.image.trim(),
      });
      setForm(initialForm);
      setSaved(true);
      onCreated();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void submit();
  }

  const inputClass =
    "w-full h-11 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Formulario para agregar producto"
      className="mb-8 rounded-lg border border-outline-variant bg-surface-container-lowest p-6"
    >
      <h3 className="text-headline-sm font-semibold mb-4">Agregar producto</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="product-title" className="block text-body-sm mb-1">
            Título
          </label>
          <input
            id="product-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Teclado mecánico"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="product-price" className="block text-body-sm mb-1">
            Precio
          </label>
          <input
            id="product-price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            placeholder="79.99"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="product-category" className="block text-body-sm mb-1">
            Categoría
          </label>
          <input
            id="product-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Periféricos"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="product-image" className="block text-body-sm mb-1">
            Imagen (URL)
          </label>
          <input
            id="product-image"
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            required
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {submitting ? "Guardando…" : "Agregar producto"}
        </button>
        {saved && (
          <p role="status" className="text-body-sm text-emerald-600">
            Producto agregado correctamente.
          </p>
        )}
      </div>

      {submitting && <Spinner />}
      {error && (
        <div className="mt-2">
          <ErrorState message={error} onRetry={() => void submit()} />
        </div>
      )}
    </form>
  );
}
