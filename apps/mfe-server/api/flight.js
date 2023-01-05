import React from "react";

import { renderToReadableStream } from "react-server-dom-webpack/server.browser";
import ReactApp from "rsc-mfe/App";
import manifest from "rsc-mfe/manifest";

export const config = {
  runtime: "edge",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request, response) => {
  const reactElement = React.createElement(ReactApp, {});
  const readableStream = renderToReadableStream(reactElement, manifest);

  return new Response(readableStream);
};
