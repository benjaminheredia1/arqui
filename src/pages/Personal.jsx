import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Personal = () => {
  const [personal, setPersonal] = useState([
    { id: 'REC-001', nombre: 'Juan Pérez', turno: 'Mañana', zonas: ['Distrito 1', 'Distrito 2'], cumplimiento: 95, estado: 'Activo' },
    { id: 'REC-002', nombre: 'Ana Gómez', turno: 'Tarde', zonas: ['Distrito 3'], cumplimiento: 88, estado: 'Activo' },
    { id: 'REC-003', nombre: 'Luis Castro', turno: 'Mañana', zonas: ['Distrito 2', 'Distrito 4'], cumplimiento: 92, estado: 'Activo' },
    { id: 'REC-004', nombre: 'Maria Sol', turno: 'Tarde', zonas: ['Distrito 1'], cumplimiento: 100, estado: 'Activo' },
  ]);

  const [loading, setLoading] = useState(false);
  const [collectorKm, setCollectorKm] = useState({})
  const [zoneKm, setZoneKm] = useState({})
  const [totalKm, setTotalKm] = useState(0)
  const [zoneFilter, setZoneFilter] = useState('Todas')

  useEffect(() => {
    try {
      const km = JSON.parse(localStorage.getItem('collectorKm') || '{}')
      const z = JSON.parse(localStorage.getItem('zoneKm') || '{}')
      setCollectorKm(km)
      setZoneKm(z)
      setTotalKm(Object.values(z).reduce((a, b) => a + b, 0))
    } catch {}
  }, [])

  const zones = ['Todas', ...Array.from(new Set(Object.keys(zoneKm)))]
  const filteredPersonal = personal.filter(p => zoneFilter === 'Todas' || (p.zonas || []).includes(zoneFilter))

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Gestión de Personal" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* Resumen Km por Zona */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Km Recolectores - Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalKm.toFixed(2)} km</p>
              </div>
              <div className="md:col-span-2 rounded-lg p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Km por Distrito</p>
                  <select
                    className="h-9 px-3 border border-neutral-gray-medium/30 dark:border-white/20 rounded-lg bg-neutral-white dark:bg-background-dark/50 text-sm"
                    value={zoneFilter}
                    onChange={(e) => setZoneFilter(e.target.value)}
                  >
                    {zones.map(z => (<option key={z} value={z}>{z}</option>))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {Object.entries(zoneKm).map(([zona, km]) => (
                    <div key={zona} className="flex items-center justify-between rounded-md px-3 py-2 border border-gray-200 dark:border-gray-800">
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate mr-2">{zona}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{km.toFixed(2)} km</span>
                    </div>
                  ))}
                  {Object.keys(zoneKm).length === 0 && (
                    <p className="text-sm text-gray-500">Sin datos. Abre Mapas y activa Recolectores para generar recorrido.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-gray-dark dark:text-neutral-gray-medium">
                    search
                  </span>
                  <input
                    className="h-10 w-full md:w-64 pl-10 pr-4 border border-neutral-gray-medium/30 dark:border-white/20 rounded-lg bg-neutral-white dark:bg-background-dark/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm"
                    placeholder="Buscar personal..."
                    type="text"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50 hover:bg-neutral-gray-light dark:hover:bg-white/10 transition-colors text-sm font-medium">
                  <span className="material-symbols-outlined text-base">filter_list</span>
                  <span>Filtros</span>
                </button>
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50 hover:bg-neutral-gray-light dark:hover:bg-white/10 transition-colors text-sm font-medium">
                  <span className="material-symbols-outlined text-base">upload_file</span>
                  <span>Exportar</span>
                </button>
              </div>
            </div>

            {/* Tabla de Personal */}
            <div className="w-full overflow-hidden rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-neutral-gray-light/50 dark:bg-white/5">
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">ID</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">Nombre</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">Turno</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">Zonas</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">Km recorridos</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">Cumplimiento</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">Estado</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-gray-medium/20 dark:divide-white/10">
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-8 text-center">Cargando personal...</td>
                      </tr>
                    ) : filteredPersonal.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-8 text-center text-text-secondary">No se encontró personal</td>
                      </tr>
                    ) : (
                      filteredPersonal.map((persona) => (
                        <tr key={persona.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark dark:text-text-light">{persona.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">{persona.nombre}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">{persona.turno}</td>
                          <td className="px-6 py-4 text-sm text-text-secondary dark:text-neutral-gray-medium">
                            <div className="flex flex-wrap gap-1">
                              {persona.zonas.map((zona, idx) => (
                                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">{zona}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">{(collectorKm[persona.id] || 0).toFixed(2)} km</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                                <div className={`h-2 rounded-full ${persona.cumplimiento >= 90 ? 'bg-status-green' : persona.cumplimiento >= 70 ? 'bg-status-yellow' : 'bg-red-500'}`} style={{ width: `${persona.cumplimiento}%` }}></div>
                              </div>
                              <span className="text-text-secondary dark:text-neutral-gray-medium text-xs">{persona.cumplimiento}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-status-green/10 text-status-green">{persona.estado}</span></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center"><button className="text-text-secondary hover:text-primary dark:text-neutral-gray-medium dark:hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button></td>
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

export default Personal;

