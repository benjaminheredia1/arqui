import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MapOSM from '../components/MapOSM';
import { useLocation } from 'react-router-dom'

const Mapas = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const highlightRouteId = params.get('routeId')
  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Mapas y Visualización" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* PageHeading */}
            <div className="flex flex-col gap-1 mb-6">
              <p className="text-gray-900 dark:text-white text-4xl font-black font-heading leading-tight tracking-tight">
                Mapas y Visualización
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                Seguimiento en tiempo real de camiones, recolectores a pie, rutas y zonas de recolección.
              </p>
            </div>

            {/* Mapa Principal */}
            <div className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 overflow-hidden">
              <MapOSM className="w-full aspect-[16/10]" highlightRouteId={highlightRouteId} />
            </div>

            {/* Leyenda */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                <div className="w-8 h-8 rounded-full bg-[#2D9CDB] flex items-center justify-center text-white text-sm">🚛</div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Camiones</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Vehículos en ruta</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                <div className="w-8 h-8 rounded-full bg-[#6EC870] flex items-center justify-center text-white text-sm">🚶</div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Recolectores a Pie</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Personal en terreno</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                <div className="w-4 h-4 rounded-full bg-status-green"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Rutas Activas</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rutas en curso</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                <div className="w-4 h-4 rounded-full bg-status-yellow"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Zonas Críticas</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Áreas con incidencias</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mapas;

