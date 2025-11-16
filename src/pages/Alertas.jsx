import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { rutasSupabaseService } from '../services/supabase'

const Alertas = () => {
  const [alertas, setAlertas] = useState([
    {
      id: 'ALT-001',
      tipo: 'Zona Crítica',
      mensaje: 'Distrito 1 con acumulación de residuos',
      prioridad: 'Alta',
      fecha: '2024-01-20 14:30',
      estado: 'Activa',
    },
  ]);

  const getPrioridadClass = (prioridad) => {
    const classes = {
      Alta: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400',
      Media: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400',
      Baja: 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400',
    };
    return classes[prioridad] || classes.Baja;
  };

  const simulateCheck = async () => {
    const now = Date.now()
    const THRESHOLD_MS = 30 * 60 * 1000 // 30 minutos
    let created = []

    try {
      const routes = await rutasSupabaseService.getAllRutas().catch(() => [])
      const lastRoutePass = JSON.parse(localStorage.getItem('lastRoutePass') || '{}')
      const lastMacroPass = JSON.parse(localStorage.getItem('lastMacroPass') || '{}')

      // Por ruta
      routes.forEach(r => {
        const last = Number(lastRoutePass[r.id] || 0)
        if (!last || now - last > THRESHOLD_MS) {
          created.push({
            id: `ALT-${Math.random().toString(36).slice(2,7).toUpperCase()}`,
            tipo: 'Retraso de Ruta',
            mensaje: `El camión de la ${r.title} no ha pasado recientemente.`,
            prioridad: 'Media',
            fecha: new Date().toISOString().slice(0,16).replace('T',' '),
            estado: 'Activa',
          })
        }
      })

      // Por macrozona (opcional extra)
      Object.entries(lastMacroPass).forEach(([macro, ts]) => {
        const last = Number(ts || 0)
        if (!last || now - last > THRESHOLD_MS) {
          created.push({
            id: `ALT-${Math.random().toString(36).slice(2,7).toUpperCase()}`,
            tipo: 'Zona sin paso reciente',
            mensaje: `No hay paso reciente de camiones en ${macro}.`,
            prioridad: 'Alta',
            fecha: new Date().toISOString().slice(0,16).replace('T',' '),
            estado: 'Activa',
          })
        }
      })

      if (created.length > 0) setAlertas(prev => [...created, ...prev])
    } catch {}
  }

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Alertas del Sistema" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* PageHeading */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-900 dark:text-white text-4xl font-black font-heading leading-tight tracking-tight">Alertas del Sistema</p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Monitoreo de alertas y notificaciones en tiempo real.</p>
              </div>
              <button onClick={simulateCheck} className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">Simular chequeo</button>
            </div>

            {/* Lista de Alertas */}
            <div className="space-y-4">
              {alertas.map((alerta) => (
                <div key={alerta.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                  <div className="flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-gray-900 dark:text-white font-medium">{alerta.tipo}</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPrioridadClass(alerta.prioridad)}`}>{alerta.prioridad}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${alerta.estado === 'Activa' ? 'bg-status-yellow/10 text-status-yellow' : 'bg-status-green/10 text-status-green'}`}>{alerta.estado}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{alerta.mensaje}</p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">{alerta.fecha}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><span className="material-symbols-outlined">more_vert</span></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Alertas;

