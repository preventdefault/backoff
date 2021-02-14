import { expandGlobSync } from "https://deno.land/std@0.87.0/fs/mod.ts";

for (const file of expandGlobSync(".build/**/*.ts")) {
  if (/test\.ts$/.test(file.name)) {
    continue;
  }

  Deno.writeTextFileSync(
    file.path,
    Deno.readTextFileSync(file.path).replace(
      /(from\s"..?\/[a-z-/]*\.)(ts)(";)/gm,
      "$1js$3",
    ),
  );
}
