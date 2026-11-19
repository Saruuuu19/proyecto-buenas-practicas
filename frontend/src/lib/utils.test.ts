import { describe, expect, it } from "vitest";
import { formatPrice, normalize } from "./utils";

describe("normalize", () => {
  it("quita espacios extra y pasa todo a minúsculas", () => {
    expect(normalize("  Camiseta NIKE  ")).toBe("camiseta nike");
  });

  it("deja el texto ya normalizado sin tocarlo", () => {
    expect(normalize("zapatillas de running")).toBe("zapatillas de running");
  });
});

describe("formatPrice", () => {
  it("formatea con dos decimales y separador de miles", () => {
    expect(formatPrice(1999.5)).toBe("$1,999.50");
  });

  it("formatea precios enteros", () => {
    expect(formatPrice(89)).toBe("$89.00");
  });
});
