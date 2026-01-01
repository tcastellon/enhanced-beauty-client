import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import ClientsPage from "./pages/ClientsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <Layout />
            </AuthenticatedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="clients" element={<ClientsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
