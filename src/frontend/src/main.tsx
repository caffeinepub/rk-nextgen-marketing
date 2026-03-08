import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import AdminPage from "./AdminPage";
import App from "./App";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import "../index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

const queryClient = new QueryClient();

function Router() {
  const path = window.location.pathname;
  if (path === "/admin" || path === "/admin/") {
    return <AdminPage />;
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <Router />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
