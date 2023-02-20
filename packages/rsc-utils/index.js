import React from "react";
import ReactDOMServer from "react-dom/server";
import { renderToReadableStream } from "react-server-dom-webpack/server.browser";
import { createFromReadableStream } from "react-server-dom-webpack/client";

export const renderHTML = async (App, manifest) => {
  const reactElement = React.createElement(App, {});
  const readableStream = renderToReadableStream(reactElement, manifest);
  const result = await createFromReadableStream(readableStream);
  const html = ReactDOMServer.renderToString(result);

  return html;
};

export const renderFlight = async (App, manifest) => {
  const reactElement = React.createElement(App, {});
  const readableStream = renderToReadableStream(reactElement, manifest);
  return readableStream;
};

export const getStringValueFromStream = async (readableStreamValue) => {
  const { value } = await readableStreamValue.getReader().read();

  return new TextDecoder().decode(value);
};

export const getFlightString = async (App, manifest) => {
  const readableStreamValue = await renderFlight(App, manifest);
  return getStringValueFromStream(readableStreamValue);
};
