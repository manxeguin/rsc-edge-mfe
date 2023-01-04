import React from "react";
import { useState, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useServerResponse } from "./Cache.client";
import { createContext, useContext } from "react";

export const LocationContext = createContext();
export function useLocation() {
    return useContext(LocationContext);
}

export default function Root({ initialCache }) {
    return (
        <Suspense fallback={null}>
            <ErrorBoundary FallbackComponent={Error}>
                <Content />
            </ErrorBoundary>
        </Suspense>
    );
}

function Content() {
    const [location, setLocation] = useState({
        selectedId: null,
        isEditing: false,
        searchText: "",
    });

    const Component = useServerResponse(location);

    return (
        <LocationContext.Provider value={[location, setLocation]}>
            {Component}
        </LocationContext.Provider>
    );
}

function Error({ error }) {
    return (
        <div>
            <h1 className="text-red-500">Application Error</h1>
            <pre style={{ whiteSpace: "pre-wrap" }}>{error.stack}</pre>
        </div>
    );
}
