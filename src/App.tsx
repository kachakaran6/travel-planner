import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout";
// import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import ProtectedDashboard from "./pages/dashboard";
import { Register } from "./pages/register";
import { AuthProvider } from "./contexts/auth-context";
import Trips from "./pages/trips";
import Packing from "./pages/packing";
// import calender from "./pages/calender";
import Expense from "./pages/expense";
import Places from "./pages/places";
import Accommodations from "./pages/accommodation";
import Transport from "./pages/transport";
import TripDetails from "./components/TripDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ProtectedDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trips"
                element={
                  <ProtectedRoute>
                    <Trips />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/packing"
                element={
                  <ProtectedRoute>
                    <Packing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses"
                element={
                  <ProtectedRoute>
                    <Expense />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/places"
                element={
                  <ProtectedRoute>
                    <Places />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accommodation"
                element={
                  <ProtectedRoute>
                    <Accommodations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transport"
                element={
                  <ProtectedRoute>
                    <Transport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/TripDetails/:id"
                element={
                  <ProtectedRoute>
                    <TripDetails />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
