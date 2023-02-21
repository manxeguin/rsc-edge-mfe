import React, { useEffect, useState } from "react";
import { createFromFetch } from "react-server-dom-webpack/client";

function createResponseCache() {
  return new Map();
}

export function useRefresh() {
  return function refresh(key, seededResponse) {
    refreshCache(createResponseCache, new Map([[key, seededResponse]]));
  };
}

const getFlightResponse = async (locationKey) => {
  //const flightResponse = fetch("/react?location=" + encodeURIComponent(locationKey));
  const flightResponse = fetch("rsc");
  const flight = await createFromFetch(flightResponse);
  return flight;
};

export function useServerResponse(location) {
  const [Response, setServerResponse] = useState(null);
  const key = JSON.stringify(location);

  useEffect(() => {
    getFlightResponse(key).then((res) => {
      setServerResponse(res);
    });
  }, [key]);

  return Response;
}
