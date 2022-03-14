const esbuild = require("esbuild");
const sassPlugin = require("esbuild-sass-plugin").sassPlugin;

return esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    outfile: "bundle.js",
    external: ["*.png"],
    loader: {'.js':'jsx'},
    plugins: [sassPlugin()]
})