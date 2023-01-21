import React from "react";
import ReactDOMServer from "react-dom/server";
import { renderToReadableStream } from "react-server-dom-webpack/server.browser";
import { createFromReadableStream } from "react-server-dom-webpack/client";
import ReactApp from "rsc-mfe/App";
import manifest from "rsc-mfe/manifest";
import clientManifest from "rsc-mfe/client-manifest";
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
const renderHTML = async () => {
  const reactElement = React.createElement(ReactApp, {});
  const readableStream = renderToReadableStream(reactElement, manifest);
  const result = await createFromReadableStream(readableStream);
  const html = ReactDOMServer.renderToString(result);

  return html;
};

const renderFlight = async () => {
  const reactElement = React.createElement(ReactApp, {});
  const readableStream = renderToReadableStream(reactElement, manifest);
  return readableStream;
};

const getStringValueFromStream = async (readableStreamValue) => {
  const { value } = await readableStreamValue.getReader().read();

  return new TextDecoder().decode(value);
};

const pageTemplate = ({ content, flightString, scripts }) => `<html>
<head>
  <title>My Page</title>
  <meta name="description" content="This is my page" />
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
  const content = await renderHTML();
  const flightReadableStream = await renderFlight();
  const flightString = await getStringValueFromStream(flightReadableStream);
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

//TODO escribir en build el html y usar un simple server http para probar
