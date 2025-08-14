import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

const root = document.getElementById("root")

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)