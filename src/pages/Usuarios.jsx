import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([
    {
      id: 'USR-001',
      nombre: 'Ana Gomez',
      email: 'ana.gomez@emacruz.gob.bo',
      rol: 'Administrador',
      estado: 'Activo',
      ultimoAcceso: '2024-01-20 14:30',
    },
    {
      id: 'USR-002',
      nombre: 'Carlos Mendoza',
      email: 'carlos.mendoza@emacruz.gob.bo',
      rol: 'Supervisor',
      estado: 'Activo',
      ultimoAcceso: '2024-01-20 13:15',
    },
    {
      id: 'USR-003',
      nombre: 'Laura Torres',
      email: 'laura.torres@emacruz.gob.bo',
      rol: 'Operador',
      estado: 'Inactivo',
      ultimoAcceso: '2024-01-18 10:00',
    },
    {
      id: 'USR-004',
      nombre: 'Roberto Silva',
      email: 'roberto.silva@emacruz.gob.bo',
      rol: 'Supervisor',
      estado: 'Activo',
      ultimoAcceso: '2024-01-20 15:45',
    },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="admin" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Gestión de Usuarios" variant="admin" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* PageHeading */}
            <div className="flex flex-wrap justify-between gap-3 mb-6">
              <div className="flex flex-col gap-1">
                <p className="text-gray-900 dark:text-white text-4xl font-black font-heading leading-tight tracking-tight">
                  Gestión de Usuarios
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Administra los usuarios y permisos del sistema.
                </p>
              </div>
              <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined text-xl">add</span>
                <span className="truncate">Agregar Usuario</span>
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
                    placeholder="Buscar usuario..."
                    type="text"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50 hover:bg-neutral-gray-light dark:hover:bg-white/10 transition-colors text-sm font-medium">
                  <span className="material-symbols-outlined text-base">filter_list</span>
                  <span>Filtros</span>
                </button>
              </div>
              <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-neutral-gray-medium/30 dark:border-white/20 bg-neutral-white dark:bg-background-dark/50 hover:bg-neutral-gray-light dark:hover:bg-white/10 transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-base">upload_file</span>
                <span>Exportar</span>
              </button>
            </div>

            {/* Tabla de Usuarios */}
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
                        Email
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-neutral-gray-medium">
                        Último Acceso
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
                            <span className="ml-3 text-text-secondary">Cargando usuarios...</span>
                          </div>
                        </td>
                      </tr>
                    ) : usuarios.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-text-secondary">
                          No se encontraron usuarios
                        </td>
                      </tr>
                    ) : (
                      usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-dark dark:text-text-light">
                            {usuario.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {usuario.nombre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {usuario.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {usuario.rol}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                usuario.estado === 'Activo'
                                  ? 'bg-status-green/10 text-status-green'
                                  : 'bg-status-gray/10 text-status-gray'
                              }`}
                            >
                              {usuario.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-neutral-gray-medium">
                            {usuario.ultimoAcceso}
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

export default Usuarios;

