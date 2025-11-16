import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Configuracion = () => {
  const [settings, setSettings] = useState({
    notificaciones: true,
    alertasEmail: true,
    reportesAutomaticos: false,
    idioma: 'es',
    zonaHoraria: 'America/La_Paz',
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Configuración" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* PageHeading */}
            <div className="flex flex-col gap-1 mb-8">
              <p className="text-gray-900 dark:text-white text-4xl font-black font-heading leading-tight tracking-tight">
                Configuración
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                Gestiona las preferencias y ajustes del sistema.
              </p>
            </div>

            <div className="max-w-3xl space-y-6">
              {/* Notificaciones */}
              <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                  Notificaciones
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-gray-900 dark:text-white font-medium">Notificaciones en tiempo real</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Recibe alertas sobre incidencias y cambios en las rutas
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notificaciones}
                        onChange={(e) => handleChange('notificaciones', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-gray-900 dark:text-white font-medium">Alertas por correo electrónico</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Recibe resúmenes diarios y alertas importantes por email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.alertasEmail}
                        onChange={(e) => handleChange('alertasEmail', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Reportes */}
              <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">Reportes</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-gray-900 dark:text-white font-medium">Reportes automáticos</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Genera reportes semanales automáticamente
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.reportesAutomaticos}
                        onChange={(e) => handleChange('reportesAutomaticos', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Preferencias */}
              <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">Preferencias</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Idioma
                    </label>
                    <select
                      value={settings.idioma}
                      onChange={(e) => handleChange('idioma', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Zona Horaria
                    </label>
                    <select
                      value={settings.zonaHoraria}
                      onChange={(e) => handleChange('zonaHoraria', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="America/La_Paz">America/La_Paz (GMT-4)</option>
                      <option value="America/Sao_Paulo">America/Sao_Paulo (GMT-3)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botón Guardar */}
              <div className="flex justify-end gap-3">
                <button className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                  Cancelar
                </button>
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configuracion;

