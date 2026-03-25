import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailsPage from "./pages/ClientDetailsPage";
import ClientFormPage from "./pages/ClientFormPage";
import EditClientPage from "./pages/EditClientPage";
import VisitsPage from "./pages/VisitsPage";
import VisitFormPage from "./pages/VisitsFormPage";
import EditVisitPage from "./pages/EditVisitPage";
import RegisterPage from "./pages/RegisterPage";
import PublicHome from "./pages/PublicHomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicHome />} />

        <Route
          path="/dashboard"
          element={
            <AuthenticatedRoute>
              <Layout />
            </AuthenticatedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="clients/new" element={<ClientFormPage />} />
          <Route path="clients/:id" element={<ClientDetailsPage />} />
          <Route path="clients/:id/edit" element={<EditClientPage />} />
          <Route path="visits" element={<VisitsPage />} />
          <Route path="visits/new" element={<VisitFormPage />} />
          <Route path="visits/:id/edit" element={<EditVisitPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
