import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/variables.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // React Query

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
