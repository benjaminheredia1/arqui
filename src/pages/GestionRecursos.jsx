import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const GestionRecursos = () => {
  const [vehiculos, setVehiculos] = useState([
    {
      id: 'CAM-101',
      tipo: 'Camión Recolector',
      estado: 'Activo',
      estadoColor: 'status-green',
      distrito: 'Distrito 1',
      ultimaRevision: '2024-01-15',
      capacidad: '8 Ton',
      conductor: 'Juan Pérez',
    },
    {
      id: 'CAM-102',
      tipo: 'Camión Recolector',
      estado: 'En Mantenimiento',
      estadoColor: 'status-yellow',
      distrito: 'Distrito 3',
      ultimaRevision: '2024-01-10',
      capacidad: '8 Ton',
      conductor: 'Ana Gómez',
    },
    {
      id: 'CAM-103',
      tipo: 'Camión Recolector',
      estado: 'Activo',
      estadoColor: 'status-green',
      distrito: 'Distrito 2',
      ultimaRevision: '2024-01-12',
      capacidad: '8 Ton',
      conductor: 'Luis Castro',
    },
    {
      id: 'CAM-104',
      tipo: 'Camión Recolector',
      estado: 'Inactivo',
      estadoColor: 'status-gray',
      distrito: 'N/A',
      ultimaRevision: '2023-12-20',
      capacidad: '8 Ton',
      conductor: 'N/A',
    },
  ]);

  const [recolectores, setRecolectores] = useState([
    {
      id: 'REC-001',
      nombre: 'Juan Pérez',
      turno: 'Mañana',
      zonas: ['Distrito 1', 'Distrito 2'],
      cumplimiento: 95,
      estado: 'Activo',
    },
    {
      id: 'REC-002',
      nombre: 'Ana Gómez',
      turno: 'Tarde',
      zonas: ['Distrito 3'],
      cumplimiento: 88,
      estado: 'Activo',
    },
    {
      id: 'REC-003',
      nombre: 'Luis Castro',
      turno: 'Mañana',
      zonas: ['Distrito 2', 'Distrito 4'],
      cumplimiento: 92,
      estado: 'Activo',
    },
    {
      id: 'REC-004',
      nombre: 'Maria Sol',
      turno: 'Tarde',
      zonas: ['Distrito 1'],
      cumplimiento: 100,
      estado: 'Activo',
    },
  ]);

  const [activeTab, setActiveTab] = useState('vehiculos');
  const [loading, setLoading] = useState(false);

  const getEstadoClass = (color) => {
    const colors = {
      'status-green': 'bg-status-green/10 text-status-green',
      'status-blue': 'bg-status-blue/10 text-status-blue',
      'status-gray': 'bg-status-gray/10 text-status-gray',
      'status-yellow': 'bg-status-yellow/10 text-status-yellow dark:text-yellow-300',
    };
    return colors[color] || colors['status-gray'];
  };

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Gestión de Recursos" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setActiveTab('vehiculos')}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  activeTab === 'vehiculos'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Vehículos
              </button>
              <button
                onClick={() => setActiveTab('recolectores')}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  activeTab === 'recolectores'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Recolectores
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50 hover:bg-neutral-gray-light dark:hover:bg-white/10 transition-colors text-sm font-medium">
                  <span className="material-symbols-outlined text-base">filter_list</span>
                  <span>Filtros</span>
                </button>
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50 hover:bg-neutral-gray-light dark:hover:bg-white/10 transition-colors text-sm font-medium">
                  <span className="material-symbols-outlined text-base">upload_file</span>
                  <span>Exportar</span>
                </button>
              </div>
              <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined text-xl">add</span>
                <span className="truncate">
                  {activeTab === 'vehiculos' ? 'Agregar Vehículo' : 'Agregar Recolector'}
                </span>
              </button>
            </div>

            {/* Tabla de Vehículos */}
            {activeTab === 'vehiculos' && (
              <div className="w-full overflow-hidden rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-neutral-gray-light/50 dark:bg-white/5">
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          ID Vehículo
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Tipo
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Distrito
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Última Revisión
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Capacidad
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Conductor
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium text-center">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-gray-medium/20 dark:divide-white/10">
                      {loading ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-8 text-center">
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                              <span className="ml-3 text-text-secondary">Cargando vehículos...</span>
                            </div>
                          </td>
                        </tr>
                      ) : vehiculos.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-8 text-center text-text-secondary">
                            No se encontraron vehículos
                          </td>
                        </tr>
                      ) : (
                        vehiculos.map((vehiculo) => (
                          <tr key={vehiculo.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark dark:text-text-light">
                              {vehiculo.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                              {vehiculo.tipo}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoClass(
                                  vehiculo.estadoColor
                                )}`}
                              >
                                {vehiculo.estado}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                              {vehiculo.distrito}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                              {vehiculo.ultimaRevision}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                              {vehiculo.capacidad}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                              {vehiculo.conductor}
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
            )}

            {/* Tabla de Recolectores */}
            {activeTab === 'recolectores' && (
              <div className="w-full overflow-hidden rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-neutral-gray-light/50 dark:bg-white/5">
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          ID
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Nombre
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Turno
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Zonas Asignadas
                        </th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                          Cumplimiento
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
                              <span className="ml-3 text-text-secondary">Cargando recolectores...</span>
                            </div>
                          </td>
                        </tr>
                      ) : recolectores.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-8 text-center text-text-secondary">
                            No se encontraron recolectores
                          </td>
                        </tr>
                      ) : (
                        recolectores.map((recolector) => (
                          <tr key={recolector.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark dark:text-text-light">
                              {recolector.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                              {recolector.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                              {recolector.turno}
                            </td>
                            <td className="px-6 py-4 text-sm text-text-secondary dark:text-neutral-gray-medium">
                              <div className="flex flex-wrap gap-1">
                                {recolector.zonas.map((zona, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                                  >
                                    {zona}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                                  <div
                                    className={`h-2 rounded-full ${
                                      recolector.cumplimiento >= 90
                                        ? 'bg-status-green'
                                        : recolector.cumplimiento >= 70
                                        ? 'bg-status-yellow'
                                        : 'bg-red-500'
                                    }`}
                                    style={{ width: `${recolector.cumplimiento}%` }}
                                  ></div>
                                </div>
                                <span className="text-text-secondary dark:text-neutral-gray-medium text-xs">
                                  {recolector.cumplimiento}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-status-green/10 text-status-green">
                                {recolector.estado}
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GestionRecursos;

