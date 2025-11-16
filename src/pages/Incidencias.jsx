import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Incidencias = () => {
  const [incidencias, setIncidencias] = useState([
    {
      id: 'INC-001',
      tipo: 'Bloqueo de Calle',
      descripcion: 'Calle principal bloqueada por manifestación',
      zona: 'Distrito 1',
      ruta: 'R-001',
      estado: 'Pendiente',
      estadoColor: 'status-yellow',
      fecha: '2024-01-20 10:30',
      reportadoPor: 'Juan Pérez',
    },
    {
      id: 'INC-002',
      tipo: 'Contenedor Lleno',
      descripcion: 'Contenedor en Av. Busch completamente lleno',
      zona: 'Distrito 3',
      ruta: 'R-002',
      estado: 'En Proceso',
      estadoColor: 'status-blue',
      fecha: '2024-01-20 09:15',
      reportadoPor: 'Ana Gómez',
    },
    {
      id: 'INC-003',
      tipo: 'Avería de Vehículo',
      descripcion: 'Camión CAM-102 con problemas mecánicos',
      zona: 'Distrito 2',
      ruta: 'R-003',
      estado: 'Resuelto',
      estadoColor: 'status-green',
      fecha: '2024-01-19 14:20',
      reportadoPor: 'Luis Castro',
    },
    {
      id: 'INC-004',
      tipo: 'Desvío de Ruta',
      descripcion: 'Ruta desviada por obras en construcción',
      zona: 'Distrito 4',
      ruta: 'R-005',
      estado: 'Pendiente',
      estadoColor: 'status-yellow',
      fecha: '2024-01-20 08:00',
      reportadoPor: 'Maria Sol',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [filterEstado, setFilterEstado] = useState('todos');

  const getEstadoClass = (color) => {
    const colors = {
      'status-green': 'bg-status-green/10 text-status-green',
      'status-blue': 'bg-status-blue/10 text-status-blue',
      'status-gray': 'bg-status-gray/10 text-status-gray',
      'status-yellow': 'bg-status-yellow/10 text-status-yellow dark:text-yellow-300',
    };
    return colors[color] || colors['status-gray'];
  };

  const filteredIncidencias =
    filterEstado === 'todos'
      ? incidencias
      : incidencias.filter((inc) => {
          if (filterEstado === 'pendiente') return inc.estado === 'Pendiente';
          if (filterEstado === 'proceso') return inc.estado === 'En Proceso';
          if (filterEstado === 'resuelto') return inc.estado === 'Resuelto';
          return true;
        });

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Incidencias y Alertas" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* PageHeading */}
            <div className="flex flex-wrap justify-between gap-3 mb-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-900 dark:text-white text-4xl font-black font-heading leading-tight tracking-tight">
                  Incidencias y Alertas
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Gestión y seguimiento de incidencias reportadas en las rutas de recolección.
                </p>
              </div>
              <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined text-xl">add</span>
                <span className="truncate">Reportar Incidencia</span>
              </button>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterEstado('todos')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterEstado === 'todos'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterEstado('pendiente')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterEstado === 'pendiente'
                      ? 'bg-status-yellow text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Pendientes
                </button>
                <button
                  onClick={() => setFilterEstado('proceso')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterEstado === 'proceso'
                      ? 'bg-status-blue text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  En Proceso
                </button>
                <button
                  onClick={() => setFilterEstado('resuelto')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterEstado === 'resuelto'
                      ? 'bg-status-green text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Resueltos
                </button>
              </div>
              <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50 hover:bg-neutral-gray-light dark:hover:bg-white/10 transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-base">upload_file</span>
                <span>Exportar</span>
              </button>
            </div>

            {/* Tabla de Incidencias */}
            <div className="w-full overflow-hidden rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-neutral-gray-light/50 dark:bg-white/5">
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        ID
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Descripción
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Zona
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Ruta
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Reportado Por
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium text-center">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-gray-medium/20 dark:divide-white/10">
                    {loading ? (
                      <tr>
                        <td colSpan="9" className="px-6 py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <span className="ml-3 text-text-secondary">Cargando incidencias...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredIncidencias.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="px-6 py-8 text-center text-text-secondary">
                          No se encontraron incidencias
                        </td>
                      </tr>
                    ) : (
                      filteredIncidencias.map((incidencia) => (
                        <tr key={incidencia.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark dark:text-text-light">
                            {incidencia.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {incidencia.tipo}
                          </td>
                          <td className="px-6 py-4 text-sm text-text-secondary dark:text-neutral-gray-medium max-w-xs truncate">
                            {incidencia.descripcion}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {incidencia.zona}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {incidencia.ruta}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoClass(
                                incidencia.estadoColor
                              )}`}
                            >
                              {incidencia.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {incidencia.fecha}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {incidencia.reportadoPor}
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Incidencias;

