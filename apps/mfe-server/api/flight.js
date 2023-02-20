import React from "react";

import ReactApp from "rsc-mfe/App";
import manifest from "rsc-mfe/manifest";
import { renderFlight } from "rsc-utils";
export const config = {
  runtime: "edge",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request, response) => {
  const readableStream = await renderFlight(ReactApp, manifest);

  return new Response(readableStream);
};
