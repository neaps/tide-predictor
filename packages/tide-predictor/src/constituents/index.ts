import { type Constituent } from "./definition";

// Dynamically import all constituent files
const constituentModules = import.meta.glob<Constituent>("./*.ts", {
  eager: true,
  import: "default",
});

const constituents: Record<string, Constituent> = {};

// Extract constituent name from file path and populate the constituents object
for (const [path, module] of Object.entries(constituentModules)) {
  // Skip the index file itself
  if (path.includes("index.ts")) continue;

  // Extract filename without extension and .js suffix
  const name = path.split("/").pop()?.replace(/\..*$/, "") ?? "";

  // Skip module for definition.ts
  if (name === "definition") continue;

  constituents[name] = module;
}

export default constituents;
