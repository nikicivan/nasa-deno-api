/**
 * DENO Includes
 * 
 * 1. The test runner in the CLI.
 * 2. Assertions in the standard library.
 * 3. Built-in test fixtures with Deno.test().
*/

import { assertEquals, assertNotEquals } from "../test_deps.ts";

import { filterHabitablePlanets } from "./planets.ts";


const HABITABLE_PLANET = {
  koi_desposition: "CONFIRMED",
  koi_prad: "1",
  koi_smass: "1",
  koi_srad: "1",
};

const NOT_CONFIRMED = {
  koi_desposition: "FALSE POSITIVE"  
};

const TOO_LARGE_SOLAR_MASS = {
  koi_desposition: "CONFIRMED",
  koi_prad: "1",
  koi_smass: "1.04",
  koi_srad: "1",
};

const TOO_LARGE_SOLAR_RADIUS = {
  koi_desposition: "CONFIRMED",
  koi_prad: "1",
  koi_smass: "1",
  koi_srad: "1.01",
};

const TOO_LARGE_PLANETARY_RADIUS = {
  koi_desposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_smass: "1",
  koi_srad: "1",
};

Deno.test("filter only habitable planets", () => {
  const filtered = filterHabitablePlanets([
    HABITABLE_PLANET,
    NOT_CONFIRMED,
    TOO_LARGE_SOLAR_MASS,
    TOO_LARGE_SOLAR_RADIUS,
    TOO_LARGE_PLANETARY_RADIUS,
  ]);

  assertEquals(filtered, [
    HABITABLE_PLANET,
  ]);  
});

Deno.test("short example test", () => {
  assertEquals("deno", "deno");
  assertNotEquals({
    runtime: "deno"
  }, {
    runtime: "node"
  });
});

Deno.test({
  name: "long example test",
  ignore: Deno.build.os === "windows",
  fn() { 
    assertEquals("deno", "deno");
    assertNotEquals({
      runtime: "deno"
    }, {
      runtime: "node"
    })
  }
});

Deno.test({
  name: "ops leak",
  sanitizeOps: false,
  fn() { 
    setTimeout(console.log, 10000);
  }
});

Deno.test({
  name: "resource leak",
  sanitizeResources: false,
  async fn() { 
    await Deno.open("./models/planets.ts");
  }
});