import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Register } from "./register";
import { Thanks } from "./thanks";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container!);

root.render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" Component={Register} />
        <Route path="/thanks" Component={Thanks} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
