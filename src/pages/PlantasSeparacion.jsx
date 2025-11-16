import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PlantasSeparacion = () => {
  const [plantas, setPlantas] = useState([
    {
      id: 'PLA-001',
      nombre: 'Planta Alto San Pedro',
      descargasHoy: 12,
      porcentajeReciclado: 28,
      porcentajeRelleno: 72,
      tiempoEsperaPromedio: '25 min',
      estado: 'Operativa',
    },
    {
      id: 'PLA-002',
      nombre: 'Planta Norte',
      descargasHoy: 8,
      porcentajeReciclado: 32,
      porcentajeRelleno: 68,
      tiempoEsperaPromedio: '18 min',
      estado: 'Operativa',
    },
    {
      id: 'PLA-003',
      nombre: 'Planta Sur',
      descargasHoy: 15,
      porcentajeReciclado: 25,
      porcentajeRelleno: 75,
      tiempoEsperaPromedio: '30 min',
      estado: 'Operativa',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('hoy');

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Plantas de Separación" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* PageHeading */}
            <div className="flex flex-wrap justify-between gap-3 mb-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-900 dark:text-white text-4xl font-black font-heading leading-tight tracking-tight">
                  Plantas de Separación
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Monitoreo de descargas, porcentaje de reciclado y eficiencia operativa.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPeriod('hoy')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === 'hoy'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Hoy
                </button>
                <button
                  onClick={() => setSelectedPeriod('semana')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === 'semana'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Esta Semana
                </button>
                <button
                  onClick={() => setSelectedPeriod('mes')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === 'mes'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Este Mes
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm">
                <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                  Total Descargas Hoy
                </p>
                <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                  {plantas.reduce((sum, p) => sum + p.descargasHoy, 0)}
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm">
                <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                  % Reciclado Promedio
                </p>
                <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                  {Math.round(
                    plantas.reduce((sum, p) => sum + p.porcentajeReciclado, 0) / plantas.length
                  )}
                  %
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-lg p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm">
                <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-normal">
                  Tiempo Espera Promedio
                </p>
                <p className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight">
                  24 min
                </p>
              </div>
            </div>

            {/* Plantas Table */}
            <div className="w-full overflow-hidden rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-neutral-gray-light/50 dark:bg-white/5">
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Planta
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Descargas Hoy
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        % Reciclado
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        % Relleno Sanitario
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Tiempo Espera
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium text-center">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-gray-medium/20 dark:divide-white/10">
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <span className="ml-3 text-text-secondary">Cargando plantas...</span>
                          </div>
                        </td>
                      </tr>
                    ) : plantas.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-text-secondary">
                          No se encontraron plantas
                        </td>
                      </tr>
                    ) : (
                      plantas.map((planta) => (
                        <tr key={planta.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark dark:text-text-light">
                            {planta.nombre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {planta.descargasHoy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                                <div
                                  className="bg-status-green h-2 rounded-full"
                                  style={{ width: `${planta.porcentajeReciclado}%` }}
                                ></div>
                              </div>
                              <span className="text-text-secondary dark:text-neutral-gray-medium text-xs">
                                {planta.porcentajeReciclado}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                                <div
                                  className="bg-gray-500 h-2 rounded-full"
                                  style={{ width: `${planta.porcentajeRelleno}%` }}
                                ></div>
                              </div>
                              <span className="text-text-secondary dark:text-neutral-gray-medium text-xs">
                                {planta.porcentajeRelleno}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {planta.tiempoEsperaPromedio}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-status-green/10 text-status-green">
                              {planta.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <button className="text-text-secondary hover:text-primary dark:text-neutral-gray-medium dark:hover:text-primary transition-colors">
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gráfica de Comparativa */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                  % Reciclado vs. Relleno Sanitario
                </h3>
                <div className="flex items-center justify-center h-64">
                  <div className="relative flex items-center justify-center size-48">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="stroke-gray-200 dark:stroke-gray-700"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="4"
                      ></path>
                      <path
                        className="stroke-primary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeDasharray="28, 100"
                        strokeLinecap="round"
                        strokeWidth="4"
                      ></path>
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-gray-900 dark:text-white text-4xl font-bold tracking-tight">
                        28%
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Reciclado</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Reciclado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-gray-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Relleno Sanitario</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                  Descargas por Planta
                </h3>
                <div className="flex-1 flex flex-col justify-end gap-3">
                  {plantas.map((planta) => (
                    <div key={planta.id} className="flex items-center gap-3">
                      <div className="w-32 text-sm text-gray-600 dark:text-gray-400 truncate">
                        {planta.nombre}
                      </div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                        <div
                          className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                          style={{
                            width: `${(planta.descargasHoy / Math.max(...plantas.map((p) => p.descargasHoy))) * 100}%`,
                          }}
                        >
                          <span className="text-white text-xs font-medium">{planta.descargasHoy}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlantasSeparacion;

