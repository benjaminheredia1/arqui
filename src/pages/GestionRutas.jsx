import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { rutasService } from '../services/api';
import { rutasSupabaseService } from '../services/supabase'
import { Link } from 'react-router-dom'

const GestionRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneKm, setZoneKm] = useState({});
  const [totalKm, setTotalKm] = useState(0);

  useEffect(() => {
    // Cargar km de camiones desde localStorage
    try {
      const z = JSON.parse(localStorage.getItem('truckZoneKm') || '{}')
      setZoneKm(z)
      setTotalKm(Object.values(z).reduce((a, b) => a + b, 0))
    } catch {}
  }, [])

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        setLoading(true);
        const data = await rutasSupabaseService.getAllRutas().catch(() => []);
        setRutas(data)
      } catch (error) {
        console.error('Error fetching rutas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  const filteredRutas = rutas.filter((ruta) =>
    (ruta.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ruta.macroZona || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupByMacro = (arr) => {
    const map = {}
    arr.forEach(r => {
      const key = r.macroZona || 'Sin zona'
      if (!map[key]) map[key] = { color: r.color || '#999', items: [] }
      map[key].items.push(r)
    })
    return map
  }

  const grouped = groupByMacro(filteredRutas)

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
          <Header title="Gestión de Camiones" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          {/* Resumen de KM Camiones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Km Camiones - Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalKm.toFixed(2)} km</p>
            </div>
            <div className="md:col-span-2 rounded-lg p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Km por Distrito</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {Object.entries(zoneKm).map(([zona, km]) => (
                  <div key={zona} className="flex items-center justify-between rounded-md px-3 py-2 border border-gray-200 dark:border-gray-800">
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate mr-2">{zona}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{km.toFixed(2)} km</span>
                  </div>
                ))}
                {Object.keys(zoneKm).length === 0 && (
                  <p className="text-sm text-gray-500">Sin datos. Abre Mapas (vista Camiones) para generar recorrido.</p>
                )}
              </div>
            </div>
          </div>

          {/* Agrupación por Macro Zona */}
          {Object.entries(grouped).map(([macro, data]) => (
            <div key={macro} className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: data.color }}></span>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{macro}</p>
              </div>
              <div className="overflow-hidden rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-neutral-gray-light/50 dark:bg-white/5">
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">Ruta</th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">Camión asignado</th>
                        <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">Color</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-gray-medium/20 dark:divide-white/10">
                      {data.items.map((ruta) => {
                        const camionId = `CAM-${ruta.id}`
                        return (
                          <tr key={ruta.id}>
                            <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-200">{ruta.title}</td>
                            <td className="px-6 py-3 text-sm text-gray-700 dark:text-gray-300">{camionId}</td>
                            <td className="px-6 py-3">
                              <span className="inline-flex items-center gap-2 text-sm" style={{ color: ruta.color }}>
                                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: ruta.color }}></span>
                                {ruta.color}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 bg-neutral-gray-light/30 dark:bg-white/5 border-t border-neutral-gray-medium/20 dark:border-white/10">
                  <Link to={`/mapas?routeId=${encodeURIComponent(data.items[0]?.id || '')}`} className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-white text-xs font-bold hover:bg-primary/90">
                    <span className="material-symbols-outlined text-sm">map</span>
                    <span>Ver en mapa</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Toolbar superior */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-gray-dark dark:text-neutral-gray-medium">
                  search
                </span>
                <input
                  className="h-10 w-full md:w-64 pl-10 pr-4 border border-neutral-gray-medium/30 dark:border-white/20 rounded-lg bg-neutral-white dark:bg-background-dark/50 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm"
                  placeholder="Buscar ruta..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default GestionRutas;

