import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ComplaintsProvider } from "@/contexts/ComplaintsContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

import LoginPage from "@/pages/LoginPage";
import CitizenDashboard from "@/pages/citizen/CitizenDashboard";
import CitizenComplaints from "@/pages/citizen/CitizenComplaints";
import NewComplaint from "@/pages/citizen/NewComplaint";
import DistrictDashboard from "@/pages/district/DistrictDashboard";
import DistrictVerify from "@/pages/district/DistrictVerify";
import DistrictSeverity from "@/pages/district/DistrictSeverity";
import WorkScheduling from "@/pages/district/WorkScheduling";
import RepairMonitoring from "@/pages/district/RepairMonitoring";
import WorkOrders from "@/pages/district/WorkOrders";
import WorkTracking from "@/pages/district/WorkTracking";
import QualityAudit from "@/pages/district/QualityAudit";
import DistrictGIS from "@/pages/district/DistrictGIS";
import CompliancePanel from "@/pages/district/CompliancePanel";
import NotificationCenter from "@/pages/district/NotificationCenter";
import DistrictComplaints from './pages/district/DistrictComplaints';
import GrievanceDetails from './pages/district/GrievanceDetails';
import RecommendationMatrix from './pages/district/RecommendationMatrix';
import SettingsPage from './pages/SettingsPage';

import StateDashboard from "@/pages/state/StateDashboard";
import StateComplaints from "@/pages/state/StateComplaints";
import StateAnalytics from "@/pages/state/StateAnalytics";
import AIInsights from "@/pages/state/AIInsights";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ComplaintsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Common Protected Routes that use DashboardLayout */}
              <Route element={<ProtectedRoute allowedRoles={['citizen', 'district_officer', 'state_officer']}><DashboardLayout /></ProtectedRoute>}>
                <Route path="settings" element={<SettingsPage />} />
                <Route path="complaint/:id" element={<GrievanceDetails />} />
              </Route>

              {/* Citizen Routes */}
              <Route element={<ProtectedRoute allowedRoles={['citizen']}><DashboardLayout /></ProtectedRoute>}>
                <Route path="/citizen" element={<CitizenDashboard />} />
                <Route path="/citizen/complaints" element={<CitizenComplaints />} />
                <Route path="/citizen/new-complaint" element={<NewComplaint />} />
              </Route>

              {/* District Officer Routes - Simplified */}
              <Route element={<ProtectedRoute allowedRoles={['district_officer']}><DashboardLayout /></ProtectedRoute>}>
                <Route path="/district" element={<DistrictDashboard />} />
                <Route path="/district/complaints" element={<DistrictComplaints />} />
                <Route path="/district/orders" element={<WorkOrders />} />
                <Route path="/district/tracking" element={<WorkTracking />} />
                <Route path="/district/notifications" element={<NotificationCenter />} />
                <Route path="/district/recommendations/:id" element={<RecommendationMatrix />} />
              </Route>

              {/* State Officer Routes */}
              <Route element={<ProtectedRoute allowedRoles={['state_officer']}><DashboardLayout /></ProtectedRoute>}>
                <Route path="/state" element={<StateDashboard />} />
                <Route path="/state/complaints" element={<StateComplaints />} />
                <Route path="/state/analytics" element={<StateAnalytics />} />
                <Route path="/state/ai-insights" element={<AIInsights />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ComplaintsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
