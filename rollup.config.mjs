import { readFile } from "node:fs/promises";

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-scss";

const pkgjson = JSON.parse(
  await readFile(new URL(process.cwd() + "/package.json", import.meta.url)),
);

const canonicalName = pkgjson.name.split("/").slice(-1)[0];
const bundleName = `dist/${canonicalName}`;

export function buildConfig({ styles } = {}) {
  const cfgs = [
    {
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
    },
  ];

  if (styles) {
    cfgs.push({
      input: "scss/style.scss",
      output: {
        // If `file` is given instead, places generated CSS in an "assets" directory. Note that
        // either `file` or `dir` can be given; not both.
        dir: "dist",
        // The following two settings ensure that a phantom "style.js" file isn't created in "dist".
        // Unclear if this is the right approach here.
        entryFileNames: `${canonicalName}.css`, // Define the output CSS file name
        assetFileNames: `${canonicalName}.[ext]`, // Ensure no JS file is created
      },
      plugins: [
        scss({
          // Unfortunately, the file name must be explicitly given again or a phantom
          // "react-bootstrap.css" will be created with the CSS styling output to
          // "react-bootstrap2.css" instead. Sadly this hack produces the following warning:
          //
          //   The emitted file "react.css" overwrites a previously emitted file of the same name.
          fileName: `${canonicalName}.css`,
          outputStyle: "compressed",
        }),
      ],
    });
  }

  return cfgs;
}

export default buildConfig();
