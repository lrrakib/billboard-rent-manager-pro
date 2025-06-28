
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Billboards from "./pages/Billboards";
import Clients from "./pages/Clients";
import Partners from "./pages/Partners";
import LandOwners from "./pages/LandOwners";
import Rentals from "./pages/Rentals";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="billboards" element={<Billboards />} />
            <Route path="clients" element={<Clients />} />
            <Route path="partners" element={<Partners />} />
            <Route path="landowners" element={<LandOwners />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reports" element={<Reports />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
