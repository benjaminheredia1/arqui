import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { rutasSupabaseService } from '../services/supabase'

const Vehiculos = () => {
  const navigate = useNavigate();
  const [vehiculos, setVehiculos] = useState([
    { id: 'CAM-6862', tipo: 'Camión Recolector', estado: 'Activo', estadoColor: 'status-green', distrito: 'Distrito 1', ultimaRevision: '2024-01-15', capacidad: '8 Ton', conductor: 'Juan Pérez' },
    { id: 'CAM-6860', tipo: 'Camión Recolector', estado: 'En Mantenimiento', estadoColor: 'status-yellow', distrito: 'Distrito 3', ultimaRevision: '2024-01-10', capacidad: '8 Ton', conductor: 'Ana Gómez' },
    { id: 'CAM-6861', tipo: 'Camión Recolector', estado: 'Activo', estadoColor: 'status-green', distrito: 'Distrito 2', ultimaRevision: '2024-01-12', capacidad: '8 Ton', conductor: 'Luis Castro' },
  ]);
  const [loading, setLoading] = useState(false);
  const [rutas, setRutas] = useState([])
  const [macroFilter, setMacroFilter] = useState('Todas')

  useEffect(() => {
    (async () => {
      const data = await rutasSupabaseService.getAllRutas().catch(() => [])
      setRutas(data)
      // Generar vehículos automáticamente por cada ruta
      if (data && data.length > 0) {
        const generated = data.map((r, idx) => ({
          id: `CAM-${r.id}`,
          tipo: 'Camión Recolector',
          estado: idx % 9 === 0 ? 'En Mantenimiento' : 'Activo',
          estadoColor: idx % 9 === 0 ? 'status-yellow' : 'status-green',
          distrito: r.macroZona || 'N/D',
          ultimaRevision: '2024-01-15',
          capacidad: '8 Ton',
          conductor: `Conductor ${r.title}`,
        }))
        setVehiculos(generated)
      }
    })()
  }, [])

  const routeById = useMemo(() => {
    const map = {}
    rutas.forEach(r => { map[r.id] = r })
    return map
  }, [rutas])

  const colorOfVehicle = (vehiculoId) => {
    const m = vehiculoId.match(/^CAM-(\d+)/)
    if (!m) return '#999999'
    const r = routeById[Number(m[1])] || routeById[m[1]]
    return r?.color || '#999999'
  }

  const macroOfVehicle = (vehiculoId) => {
    const m = vehiculoId.match(/^CAM-(\d+)/)
    if (!m) return 'Sin zona'
    const r = routeById[Number(m[1])] || routeById[m[1]]
    return r?.macroZona || 'Sin zona'
  }

  const getEstadoClass = (color) => {
    const colors = {
      'status-green': 'bg-status-green/10 text-status-green',
      'status-blue': 'bg-status-blue/10 text-status-blue',
      'status-gray': 'bg-status-gray/10 text-status-gray',
      'status-yellow': 'bg-status-yellow/10 text-status-yellow dark:text-yellow-300',
    };
    return colors[color] || colors['status-gray'];
  };

  const filteredVehiculos = vehiculos.filter(v => macroFilter === 'Todas' || macroOfVehicle(v.id) === macroFilter)
  const macros = useMemo(() => ['Todas', ...Array.from(new Set(rutas.map(r => r.macroZona || 'Sin zona')))], [rutas])

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Gestión de Vehículos" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* PageHeading */}
            <div className="flex flex-wrap justify-between gap-3 mb-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-900 dark:text-white text-4xl font-black font-heading leading-tight tracking-tight">
                  Gestión de Vehículos
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Administración y control de la flota de vehículos de recolección.
                </p>
              </div>
              <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined text-xl">add</span>
                <span className="truncate">Agregar Vehículo</span>
              </button>
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
                    placeholder="Buscar vehículo..."
                    type="text"
                  />
                </div>
                <select
                  className="h-10 px-3 border border-neutral-gray-medium/30 dark:border-white/20 rounded-lg bg-neutral-white dark:bg-background-dark/50 text-sm"
                  value={macroFilter}
                  onChange={(e) => setMacroFilter(e.target.value)}
                >
                  {macros.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tabla de Vehículos */}
            <div className="w-full overflow-hidden rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-neutral-gray-light/50 dark:bg-white/5">
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        ID Vehículo
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Ruta / Macro Zona
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
                    ) : filteredVehiculos.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-8 text-center text-text-secondary">
                          No se encontraron vehículos
                        </td>
                      </tr>
                    ) : (
                      filteredVehiculos.map((vehiculo) => {
                        const color = colorOfVehicle(vehiculo.id)
                        const macro = macroOfVehicle(vehiculo.id)
                        return (
                          <tr key={vehiculo.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark dark:text-text-light">
                              <span className="inline-flex items-center gap-2">
                                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
                                {vehiculo.id}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                              <span className="inline-flex items-center gap-2">
                                <span className="text-xs px-2 py-0.5 rounded-md border" style={{ borderColor: color, color }}>{macro}</span>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoClass(vehiculo.estadoColor)}`}>
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
                        )
                      })
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

export default Vehiculos;

