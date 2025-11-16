import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import VoiceAgentButton from './components/VoiceAgentButton';
import DashboardGeneral from './pages/DashboardGeneral';
import GestionRutas from './pages/GestionRutas';
import GestionRecursos from './pages/GestionRecursos';
import PlantasSeparacion from './pages/PlantasSeparacion';
import InicioSesion from './pages/InicioSesion';
import PlantasReportaje from './pages/PlantasReportaje';
import Incidencias from './pages/Incidencias';
import Configuracion from './pages/Configuracion';
import Usuarios from './pages/Usuarios';
import Vehiculos from './pages/Vehiculos';
import Personal from './pages/Personal';
import Mapas from './pages/Mapas';
import Alertas from './pages/Alertas';
import Ajustes from './pages/Ajustes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<InicioSesion />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardGeneral />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rutas"
            element={
              <ProtectedRoute>
                <GestionRutas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recursos"
            element={
              <ProtectedRoute>
                <GestionRecursos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plantas"
            element={
              <ProtectedRoute>
                <PlantasSeparacion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reportes"
            element={
              <ProtectedRoute>
                <PlantasReportaje />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidencias"
            element={
              <ProtectedRoute>
                <Incidencias />
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracion"
            element={
              <ProtectedRoute>
                <Configuracion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehiculos"
            element={
              <ProtectedRoute>
                <Vehiculos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personal"
            element={
              <ProtectedRoute>
                <Personal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mapas"
            element={
              <ProtectedRoute>
                <Mapas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alertas"
            element={
              <ProtectedRoute>
                <Alertas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ajustes"
            element={
              <ProtectedRoute>
                <Ajustes />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        
        {/* Botón flotante del asistente de voz - visible en todas las páginas */}
        <VoiceAgentButton />
      </Router>
    </AuthProvider>
  );
}

export default App;

