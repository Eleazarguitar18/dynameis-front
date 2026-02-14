import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ActividadMain from "./pages/Actividades/ActivdadMain";
import GrupoMain from "./pages/GestionGrupos/GrupoMain";
import GrupoCreate from "./pages/GestionGrupos/GrupoCreate";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ActividadCreate from "./pages/Actividades/ActividadCreate";
import PuntuacionMain from "./pages/Puntuacion/Ranking/PuntuacionMain";
import SancionarGrupo from "./pages/Puntuacion/Ranking/SancionarGrupo";
import SumarPuntaje from "./pages/Puntuacion/Ranking/SumarPuntaje";
import { GrupoProvider } from "./context/GrupoContextType";
import { AuthProvider } from "./context/AuthContext";
export default function App() {
  return (
    <AuthProvider>
      <GrupoProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* 1. RUTAS PROTEGIDAS */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                {/* Usamos 'index' solo para la raíz del Dashboard */}
                <Route path="/dashboard" element={<Home />} />
                <Route index element={<Navigate to="/dashboard" replace />} />
                {/* Grupos - Quitamos 'index' donde hay 'path' */}
                <Route path="/grupos" element={<GrupoMain />} />
                <Route path="/grupos/nuevo" element={<GrupoCreate />} />

                {/* Actividades */}
                <Route path="/actividades" element={<ActividadMain />} />
                <Route
                  path="/actividades/nuevo"
                  element={<ActividadCreate />}
                />

                {/* Puntuacion */}
                <Route path="/ranking" element={<PuntuacionMain />} />
                <Route path="/sancionar-grupo" element={<SancionarGrupo />} />
                <Route path="/sumar-puntos" element={<SumarPuntaje />} />
                <Route path="/historial-grupos" element={<PuntuacionMain />} />

                {/* Resto de páginas */}
                <Route path="/profile" element={<UserProfiles />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/blank" element={<Blank />} />
                <Route path="/form-elements" element={<FormElements />} />
                <Route path="/basic-tables" element={<BasicTables />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} />
              </Route>
            </Route>

            {/* 2. RUTAS PÚBLICAS */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* 3. MANEJO DE ERRORES / REDIRECCIÓN */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </GrupoProvider>
    </AuthProvider>
  );
}
