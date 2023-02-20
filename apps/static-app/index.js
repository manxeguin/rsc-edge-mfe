import ReactApp from "rsc-mfe/App";
import manifest from "rsc-mfe/manifest";
import clientManifest from "rsc-mfe/client-manifest";
import { renderHTML, getFlightString } from "rsc-utils";
import * as fsAsync from "fs/promises";
import * as fs from "fs";
import * as path from "path";
import { rimrafSync } from "rimraf";

const ROOT_PATH = path.resolve(__dirname, "../..");
const DIST_PATH = "dist/";

const cleanOutputFolder = () => {
  rimrafSync(DIST_PATH);
};
const copyClientAssets = () => {
  const libraryName = "rsc-mfe";
  const libraryBuildPath = path.resolve(
    ROOT_PATH,
    "node_modules",
    libraryName,
    "build/compiled"
  );

  fs.readdir(libraryBuildPath, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      if (!file.endsWith(".html")) {
        fs.copyFile(
          path.join(libraryBuildPath, file),
          path.join(DIST_PATH, file),
          (err) => {
            if (err) throw err;
            console.log(`${file} was copied to ${DIST_PATH}`);
          }
        );
      }
    }
  });
};

const pageTemplate = ({ content, flightString, scripts }) => `<html>
<head>
  <title>Static Landing Page Experiment</title>
  <meta name="description" content="Landing page" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.min.css">
</head>
<body>
  <div id="root">${content}</div>
  <script>
    window.__flightContent = {${flightString} }\n
  </script>
  ${scripts}
</body>
</html>`;

const getClientScripts = () => {
  return clientManifest.main.map(
    (asset) => `<script src="/${asset}" defer ></script>\n `
  );
};

const renderApp = async () => {
  cleanOutputFolder();
  const content = await renderHTML(ReactApp, manifest);
  const flightString = await getFlightString(ReactApp, manifest);
  const html = pageTemplate({
    content,
    flightString,
    scripts: getClientScripts(),
  });
  const distPath = "dist/";
  const filePath = distPath + "index.html";
  const flightResponsePath = distPath + "rsc";

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }
  await fsAsync.writeFile(filePath, html);
  await fsAsync.writeFile(flightResponsePath, flightString);
  copyClientAssets();
};

renderApp();
