import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner.tsx";
import { injectMock } from "./utils/injectMock.ts";
import { Layout } from "./components/ui/layout.tsx";

const queryClient = new QueryClient();

injectMock();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
