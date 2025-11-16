import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MapOSM from '../components/MapOSM';
import { dashboardService } from '../services/api';

const DashboardGeneral = () => {
  const [stats, setStats] = useState({
    camionesActivos: { actual: 120, min: 50, max: 200 },
    recolectores: { actual: 350, min: 300, max: 400 },
    viajesHoy: 153,
    porcentajeRutasCamiones: 78,
    porcentajeRutasRecolectores: 65,
  });

  // Calcular volumen estimado: camiones activos × 8 toneladas por camión
  const volumenEstimado = stats.camionesActivos.actual * 8;
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTruck, setSearchTruck] = useState('');
  const [highlightVehicleId, setHighlightVehicleId] = useState(null);
  const [highlightRouteId, setHighlightRouteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Intentar obtener datos de la API
        const [statsData, incidentsData] = await Promise.all([
          dashboardService.getStats().catch(() => null),
          dashboardService.getIncidents().catch(() => null),
        ]);

        if (statsData) setStats(statsData);
        if (incidentsData) setIncidents(incidentsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Mantener datos por defecto si falla la API
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark group/design-root overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Dashboard de Gestión de Residuos" />
          <div className="flex-1 overflow-y-auto p-10 space-y-8">
            {/* PageHeading */}
            <div className="flex flex-wrap justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-gray-900 dark:text-white text-4xl font-black font-heading leading-tight tracking-tight">
                  Resumen Operativo
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Vista en tiempo real de las operaciones de gestión de residuos.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-gray-dark dark:text-neutral-gray-medium">search</span>
                  <input
                    className="h-10 w-[260px] pl-10 pr-28 border border-neutral-gray-medium/30 dark:border-white/20 rounded-lg bg-neutral-white dark:bg-background-dark/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm"
                    placeholder="Buscar (CAM-5903 o R-1)"
                    type="text"
                    value={searchTruck}
                    onChange={(e) => setSearchTruck(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      const q = (searchTruck || '').trim()
                      if (!q) { setHighlightVehicleId(null); setHighlightRouteId(null); return }
                      if (/^cam[-\s]?/i.test(q)) {
                        // Buscar por vehículo
                        const id = q.toUpperCase().startsWith('CAM') ? q.toUpperCase().replace(/\s+/g,'').replace('CAM','CAM-').replace(/--+/,'-') : q
                        setHighlightVehicleId(id)
                        setHighlightRouteId(null)
                      } else if (/^r\s*-?/i.test(q)) {
                        // Buscar por ruta (título)
                        const cleaned = q.replace(/^r\s*-?/i, 'R - ').replace(/\s+/g,' ').trim()
                        setHighlightRouteId(cleaned)
                        setHighlightVehicleId(null)
                      } else {
                        // fallback: intentar como ID directo
                        setHighlightVehicleId(q)
                        setHighlightRouteId(q)
                      }
                    }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 rounded-md bg-primary text-white text-xs font-bold hover:bg-primary/90"
                  >Buscar</button>
                </div>
              </div>
            </div>

            {/* Stats */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                    Camiones Activos
                  </p>
                  <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                    {stats.camionesActivos.actual}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                    Rango: {stats.camionesActivos.min} - {stats.camionesActivos.max}
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                    Recolectores Activos
                  </p>
                  <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                    {stats.recolectores.actual}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                    Rango: {stats.recolectores.min} - {stats.recolectores.max}
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                    Viajes Realizados Hoy
                  </p>
                  <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                    {stats.viajesHoy}
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                    Volumen Estimado
                  </p>
                  <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                    {volumenEstimado} <span className="text-xl font-medium">Ton.</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                    {stats.camionesActivos.actual} camiones × 8 Ton/camión
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                    % Rutas Recorridas - Camiones
                  </p>
                  <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                    {stats.porcentajeRutasCamiones}%
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                    Por distrito
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                    % Rutas Recorridas - Recolectores
                  </p>
                  <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                    {stats.porcentajeRutasRecolectores}%
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                    Por distrito
                  </p>
                </div>
              </div>
            )}

            {/* Map and Incidents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                  Mapa en Tiempo Real
                </h3>
                <MapOSM className="w-full aspect-[16/10] rounded-xl overflow-hidden" highlightVehicleId={highlightVehicleId} highlightRouteId={highlightRouteId} />
              </div>

              {/* Incidents & Alerts Card */}
              <div className="flex flex-col">
                <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                  Incidencias y Alertas
                </h3>
                <div className="flex flex-col gap-4 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4 h-full max-h-[600px] overflow-y-auto">
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse flex items-start gap-4 p-3 rounded-md bg-gray-100 dark:bg-gray-800">
                          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : incidents.length > 0 ? (
                    incidents.map((incident, index) => {
                      const colors = {
                        warning: { bg: 'bg-yellow-50 dark:bg-yellow-500/10', border: 'border-yellow-400', text: 'text-yellow-800 dark:text-yellow-200', textLight: 'text-yellow-700 dark:text-yellow-300', icon: 'text-yellow-500 dark:text-yellow-400', iconName: 'notification_important' },
                        error: { bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-500', text: 'text-red-800 dark:text-red-200', textLight: 'text-red-700 dark:text-red-300', icon: 'text-red-500', iconName: 'error' },
                        info: { bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-500', text: 'text-blue-800 dark:text-blue-200', textLight: 'text-blue-700 dark:text-blue-300', icon: 'text-blue-500', iconName: 'info' },
                      };
                      const color = colors[incident.type] || colors.info;
                      return (
                        <div key={index} className={`flex items-start gap-4 p-3 rounded-md ${color.bg} border-l-4 ${color.border}`}>
                          <span className={`material-symbols-outlined ${color.icon} mt-0.5`}>
                            {color.iconName}
                          </span>
                          <div className="flex flex-col flex-1">
                            <p className={`font-bold text-sm ${color.text}`}>
                              {incident.title}
                            </p>
                            <p className={`text-sm ${color.textLight}`}>
                              {incident.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{incident.time}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                      <p>No hay incidencias activas</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardGeneral;

