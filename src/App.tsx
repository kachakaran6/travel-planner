import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout";
// import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import  ProtectedDashboard from './pages/dashboard';
import { Register } from "./pages/register";
import { AuthProvider } from "./contexts/auth-context";
import Trips from "./pages/trips";
import Packing from "./pages/packing";
// import calender from "./pages/calender";
import Expense from "./pages/expense";
import Places from "./pages/places";
import Accommodations from "./pages/accommodation";
import Transport from "./pages/transport";
import TripDetails from "./components/TripDetails"

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
              {/* <Route index element={<Dashboard />} /> */}
              <Route index element={<ProtectedDashboard />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/packing" element={<Packing />} />
              {/* <Route path="/calendar" element={<calender />} /> */}
              <Route path="/expenses" element={<Expense />} />
              <Route path="/places" element={<Places />} />
              <Route path="/accommodation" element={<Accommodations />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/TripDetails/:id" element={<TripDetails />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
