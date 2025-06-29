
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="billboards" element={
                <ProtectedRoute requiredRole="manager">
                  <Billboards />
                </ProtectedRoute>
              } />
              <Route path="clients" element={
                <ProtectedRoute requiredRole="manager">
                  <Clients />
                </ProtectedRoute>
              } />
              <Route path="partners" element={
                <ProtectedRoute requiredRole="manager">
                  <Partners />
                </ProtectedRoute>
              } />
              <Route path="landowners" element={
                <ProtectedRoute requiredRole="manager">
                  <LandOwners />
                </ProtectedRoute>
              } />
              <Route path="rentals" element={
                <ProtectedRoute requiredRole="manager">
                  <Rentals />
                </ProtectedRoute>
              } />
              <Route path="payments" element={
                <ProtectedRoute requiredRole="admin">
                  <Payments />
                </ProtectedRoute>
              } />
              <Route path="reports" element={
                <ProtectedRoute requiredRole="manager">
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="invoices" element={<Invoices />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
