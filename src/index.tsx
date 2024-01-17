import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AuthProvider } from "./app/authProvider";
import { createQueryClient } from "./app/queryClient";

// biome-ignore lint/style/noNonNullAssertion: there should always be root
const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container);

const queryClient = createQueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
