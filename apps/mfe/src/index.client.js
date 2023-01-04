import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./Root.client";
import './styles.css';

const initialCache = new Map();
const root = createRoot(document.getElementById("root"));
root.render(<Root initialCache={initialCache} />);
