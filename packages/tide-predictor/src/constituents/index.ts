import { type Constituent } from "./definition";

// Dynamically import all constituent files
const constituentModules = import.meta.glob<Constituent>("./*.ts", {
  eager: true,
  import: "default",
});

const constituents: Record<string, Constituent> = {};

// Extract constituent name from file path and populate the constituents object
for (const [path, module] of Object.entries(constituentModules)) {
  // Skip the index and definition files
  if (path.match(/index|definition/)) continue;

  module.names.forEach((name) => {
    constituents[name] = module;
  });
}

export default constituents;
