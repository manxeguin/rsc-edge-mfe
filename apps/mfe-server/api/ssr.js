import React from "react";
import ReactDOMServer from "react-dom/server";
import { renderToReadableStream } from "react-server-dom-webpack/server.browser";
import { createFromReadableStream } from "react-server-dom-webpack/client";
import ReactApp from "rsc-mfe/App";
import manifest from "rsc-mfe/manifest";

export const config = {
  runtime: "edge",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  const reactElement = React.createElement(ReactApp, {});
  const readableStream = renderToReadableStream(reactElement, manifest);
  const result = await createFromReadableStream(readableStream);
  const html = ReactDOMServer.renderToString(result);
  return new Response(html);
};