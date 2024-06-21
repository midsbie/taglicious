import { readFile } from "node:fs/promises";

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const pkgjson = JSON.parse(
  await readFile(new URL(process.cwd() + "/package.json", import.meta.url)),
);

const canonicalName = pkgjson.name.split("/").slice(-1)[0];
const bundleName = `dist/${canonicalName}`;

export function buildConfig() {
  return {
    input: "src/index.ts",
    output: [
      {
        file: `${bundleName}.cjs.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `${bundleName}.esm.js`,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [peerDepsExternal(), resolve(), commonjs(), typescript()],
    external: [/^@taglicious\//],
  };
}

export default buildConfig();
