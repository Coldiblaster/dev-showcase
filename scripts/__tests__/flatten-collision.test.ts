import { describe, expect, it } from "vitest";

import { flatten, unflatten } from "../translate";

describe("flatten/unflatten path collision", () => {
  it("should preserve nested object structure in flatten", () => {
    const input = {
      foo: {
        bar: "a",
        baz: "b",
      },
    };
    const flat = flatten(input);
    expect(flat["foo"]).toEqual({ bar: "a", baz: "b" });
  });

  it("should handle arrays with bracket notation", () => {
    const input = {
      items: [
        { title: "x", desc: "y" },
        { title: "z", desc: "w" },
      ],
    };
    const flat = flatten(input);
    expect(flat["items[0].title"]).toBe("x");
    expect(flat["items[1].title"]).toBe("z");

    const restored = unflatten(flat);
    expect(restored).toEqual(input);
  });
});
