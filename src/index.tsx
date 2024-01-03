import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoutes } from "./app/createRoutes";
import { createQueryClient } from "./app/queryClient";

// biome-ignore lint/style/noNonNullAssertion: there should always be root
const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container);

const queryClient = createQueryClient();

const router = createBrowserRouter(createRoutes(queryClient));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
