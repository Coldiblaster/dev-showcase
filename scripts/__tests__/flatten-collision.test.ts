import { describe, expect, it } from "vitest";

import { flatten, unflatten } from "../translate";

describe("flatten/unflatten path collision", () => {
  it("should warn or overwrite on path collision (limitation)", () => {
    // O flatten atual sobrescreve valores colididos sem aviso.
    // Este teste documenta a limitação: paths como foo.bar e foo.bar.baz colidem.
    const input = {
      foo: {
        bar: "a",
        "bar.baz": "b",
      },
      "foo.bar": {
        baz: "c",
      },
    };
    const flat = flatten(input);
    // Espera-se apenas as chaves finais, pois há sobrescrita
    expect(Object.keys(flat).sort()).toEqual(["foo.bar", "foo.bar.baz"].sort());
    // O valor de 'foo.bar' será sobrescrito, comportamento documentado
    // O unflatten não consegue restaurar o input original se houver colisão
    // O teste serve para garantir que não há erro silencioso
    const restored = unflatten(flat);
    expect(restored).toHaveProperty("foo.bar");
    expect(restored).toHaveProperty("foo.bar.baz");
  });

  it("should handle arrays and objects without collision", () => {
    const input = {
      arr: [
        { a: "x", b: "y" },
        { a: "z", b: "w" },
      ],
      // Se existir arr.0.a fora do array, será sobrescrito pelo flatten
      "arr.0.a": "should not collide",
    };
    const flat = flatten(input);
    // O valor do array prevalece
    expect(flat["arr.0.a"]).toBe("x");
    expect(flat["arr.1.a"]).toBe("z");
    // unflatten deve restaurar apenas o array
    const restored = unflatten(flat);
    expect(restored).toEqual({
      arr: [
        { a: "x", b: "y" },
        { a: "z", b: "w" },
      ],
    });
  });
});
