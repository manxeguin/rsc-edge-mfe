import ReactApp from "rsc-mfe/App";
import manifest from "rsc-mfe/manifest";
import { renderHTML } from "rsc-utils";

export const config = {
  runtime: "edge",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async () => {
  const html = await renderHTML(ReactApp, manifest);
  return new Response(html);
};
