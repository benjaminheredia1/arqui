import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ variant = 'default' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({
    recursos: false,
    reportes: false,
    monitoreo: false,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const isActive = (path) => location.pathname === path;
  
  const isSubmenuActive = (items) => {
    return items.some(item => isActive(item.path));
  };

  // Auto-expandir menús si tienen una página activa
  useEffect(() => {
    const menuConfig = [
      { 
        key: 'recursos',
        items: [
          { path: '/vehiculos' },
          { path: '/personal' },
          { path: '/plantas' },
        ]
      },
      { 
        key: 'reportes',
        items: [
          { path: '/reportes' },
        ]
      },
      { 
        key: 'monitoreo',
        items: [
          { path: '/mapas' },
          { path: '/alertas' },
          { path: '/incidencias' },
        ]
      },
    ];

    menuConfig.forEach(menu => {
      const hasActive = menu.items.some(item => location.pathname === item.path);
      if (hasActive) {
        setExpandedMenus(prev => ({
          ...prev,
          [menu.key]: true
        }));
      }
    });
  }, [location.pathname]);

  const menuItems = [
    { 
      type: 'link',
      icon: 'dashboard', 
      label: 'Dashboard', 
      path: '/dashboard' 
    },
    { 
      type: 'link',
      icon: 'route', 
      label: 'Rutas', 
      path: '/rutas' 
    },
    { 
      type: 'submenu',
      icon: 'local_shipping',
      label: 'Recursos',
      key: 'recursos',
      items: [
        { icon: 'local_shipping', label: 'Vehículos', path: '/vehiculos' },
        { icon: 'groups', label: 'Personal', path: '/personal' },
        { icon: 'factory', label: 'Plantas', path: '/plantas' },
      ]
    },
    { 
      type: 'link',
      icon: 'bar_chart', 
      label: 'Reportes', 
      path: '/reportes' 
    },
    { 
      type: 'submenu',
      icon: 'map',
      label: 'Monitoreo',
      key: 'monitoreo',
      items: [
        { icon: 'map', label: 'Mapas', path: '/mapas' },
        { icon: 'notifications', label: 'Alertas', path: '/alertas' },
        { icon: 'warning', label: 'Incidencias', path: '/incidencias' },
      ]
    },
    { 
      type: 'link',
      icon: 'group', 
      label: 'Usuarios', 
      path: '/usuarios' 
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col justify-between bg-primary p-4 sticky top-0 overflow-y-auto">
      <div className="flex flex-col gap-8 flex-1 min-h-0">
        <div className="flex items-center gap-3 px-2">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 flex-shrink-0" 
            data-alt="Emacruz company logo" 
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDheMyNvEYavfxelpg194zNSVWHjLczJVh2vJ6PoRUvrp0OtsMi-W_CIMzpsL2yuFDSXUgOYx8at-T7FIfKV1DF0oWQskKH32pZikFcfC3Wa0K_LapmrWkUzwgvPCFU4pY7QCrqL9pprhwSiJHj0JI9P76hV7V5CCU4lwPWtvI39bJVeTmphynNCff8NIWBW9klw58FJfIuPYjYSD5JBq_6BuIEpTi02WFzxwAL_KbD9ydD2CRDvxV9DQ-9c6R8CV_bhs_-UyMtY_k")'}}
          ></div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-white text-base font-bold font-heading leading-normal truncate">Emacruz</h1>
            <p className="text-white/80 text-sm font-normal leading-normal truncate">Panel Administrativo</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            if (item.type === 'submenu') {
              const isExpanded = expandedMenus[item.key];
              const hasActiveChild = isSubmenuActive(item.items);
              
              return (
                <div key={item.key}>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                      hasActiveChild
                        ? 'bg-white/20'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span 
                        className="material-symbols-outlined text-white flex-shrink-0" 
                        style={hasActiveChild ? {fontVariationSettings: "'FILL' 1"} : {}}
                      >
                        {item.icon}
                      </span>
                      <p className="text-white text-sm font-medium leading-normal truncate">{item.label}</p>
                    </div>
                    <span 
                      className={`material-symbols-outlined text-white flex-shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-white/10 pl-2">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                            isActive(subItem.path)
                              ? 'bg-white/20'
                              : 'hover:bg-white/10'
                          }`}
                        >
                          <span 
                            className="material-symbols-outlined text-white flex-shrink-0 text-base" 
                            style={isActive(subItem.path) ? {fontVariationSettings: "'FILL' 1"} : {}}
                          >
                            {subItem.icon}
                          </span>
                          <p className="text-white text-sm font-medium leading-normal truncate">{subItem.label}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                  isActive(item.path)
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                }`}
              >
                <span 
                  className="material-symbols-outlined text-white flex-shrink-0" 
                  style={isActive(item.path) ? {fontVariationSettings: "'FILL' 1"} : {}}
                >
                  {item.icon}
                </span>
                <p className="text-white text-sm font-medium leading-normal truncate">{item.label}</p>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-white/10">
        <Link 
          to="/configuracion" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-white flex-shrink-0">settings</span>
          <p className="text-white text-sm font-medium leading-normal truncate">Configuración</p>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors w-full text-left whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-white flex-shrink-0">logout</span>
          <p className="text-white text-sm font-medium leading-normal truncate">Cerrar Sesión</p>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

