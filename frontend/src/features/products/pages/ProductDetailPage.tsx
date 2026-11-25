import { useCallback } from "react";
import { isAxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getProduct } from "../../../api/products";
import { ErrorState } from "../../../components/ui/ErrorState";
import { Spinner } from "../../../components/ui/Spinner";
import { useApi } from "../../../hooks/useApi";
import { formatPrice } from "../../../lib/utils";

function ProductNotFound() {
  return (
    <h1 className="text-headline-lg font-semibold text-on-background">
      Producto no encontrado
    </h1>
  );
}

function ProductDetail({ id }: { id: number }) {
  const fetchProduct = useCallback(async () => {
    try {
      return await getProduct(id);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) return null;
      throw error;
    }
  }, [id]);
  const { data: product, loading, error, reload } = useApi(fetchProduct);

  if (loading) return <Spinner />;
  if (error) return <ErrorState message="No se pudo cargar el producto." onRetry={reload} />;
  if (!product) return <ProductNotFound />;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div className="aspect-square bg-surface-container-low p-4 rounded-xl">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full rounded-xl object-contain"
        />
      </div>
      <div className="min-w-0 flex flex-col items-start gap-4">
        <p className="text-body-sm text-on-surface-variant">{product.category}</p>
        <h1 className="w-full wrap-break-word text-headline-lg font-semibold text-on-background">
          {product.title}
        </h1>
        <p className="text-headline-md font-semibold text-on-background">
          {formatPrice(product.price)}
        </p>
        <p className="w-full wrap-break-word text-body-md text-on-surface-variant">
          {product.description || "Este producto no tiene descripción."}
        </p>
      </div>
    </div>
  );
}

export function ProductDetailPage() {
  const { id = "" } = useParams();
  const { search } = useLocation();
  const productId = Number(id);
  const validId = /^[1-9]\d*$/.test(id) && Number.isSafeInteger(productId);

  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <Link
          to={{ pathname: "/productos", search }}
          className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-body-md font-medium text-primary underline underline-offset-4 hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Volver al catálogo
        </Link>
        {validId ? <ProductDetail key={productId} id={productId} /> : <ProductNotFound />}
      </div>
    </section>
  );
}
