import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PlantasReportaje = () => {
  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark group/design-root overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col gap-6">
            {/* PageHeading & Chips */}
            <header className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-slate-800 dark:text-slate-200 text-3xl font-bold font-heading leading-tight tracking-tight">
                  Dashboard de Reportes
                </p>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Análisis de la gestión de residuos urbanos.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-slate-700 pl-3 pr-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/20">
                  <p className="text-sm font-medium leading-normal">Últimos 7 Días</p>
                  <span className="material-symbols-outlined text-lg">expand_more</span>
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-slate-700 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/20">
                  <p className="text-sm font-medium leading-normal">Este Mes</p>
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-slate-700 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/20">
                  <p className="text-sm font-medium leading-normal">Últimos 30 Días</p>
                </button>
              </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-normal">
                  Camiones Activos
                </p>
                <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  42
                </p>
                <p className="text-green-600 dark:text-green-500 text-sm font-medium leading-normal flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">arrow_upward</span>
                  <span>2.1% vs ayer</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-normal">
                  Tonelaje Recolectado (Hoy)
                </p>
                <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  1,204 Ton
                </p>
                <p className="text-red-600 dark:text-red-500 text-sm font-medium leading-normal flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">arrow_downward</span>
                  <span>0.5% vs ayer</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-normal">
                  Alertas Activas
                </p>
                <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  3
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal flex items-center gap-1">
                  <span>En las últimas 24h</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-normal">
                  Eficiencia de Ruta
                </p>
                <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  96%
                </p>
                <p className="text-green-600 dark:text-green-500 text-sm font-medium leading-normal flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">arrow_upward</span>
                  <span>1.2% vs semana pasada</span>
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: Bar Chart */}
              <div className="flex flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800">
                <p className="text-slate-900 dark:text-white text-base font-medium font-heading leading-normal">
                  Descargas por Día
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight truncate">
                    1,230
                  </p>
                  <p className="text-green-600 dark:text-green-500 text-sm font-medium leading-normal">
                    +5.2%
                  </p>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                  Últimos 7 Días
                </p>
                <div className="grid min-h-[220px] grid-flow-col gap-4 grid-rows-[1fr_auto] items-end justify-items-center pt-6 px-3">
                  <div className="bg-primary/20 dark:bg-primary/40 rounded-t-md w-full" style={{ height: '70%' }}></div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                    Lun
                  </p>
                  <div className="bg-primary/20 dark:bg-primary/40 rounded-t-md w-full" style={{ height: '80%' }}></div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                    Mar
                  </p>
                  <div className="bg-primary/20 dark:bg-primary/40 rounded-t-md w-full" style={{ height: '20%' }}></div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                    Mié
                  </p>
                  <div className="bg-primary/20 dark:bg-primary/40 rounded-t-md w-full" style={{ height: '40%' }}></div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                    Jue
                  </p>
                  <div className="bg-primary/20 dark:bg-primary/40 rounded-t-md w-full" style={{ height: '80%' }}></div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                    Vie
                  </p>
                  <div className="bg-primary rounded-t-md w-full" style={{ height: '100%' }}></div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                    Sáb
                  </p>
                  <div className="bg-primary/20 dark:bg-primary/40 rounded-t-md w-full" style={{ height: '90%' }}></div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                    Dom
                  </p>
                </div>
              </div>

              {/* Chart 2: Line Chart */}
              <div className="flex flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800">
                <p className="text-slate-900 dark:text-white text-base font-medium font-heading leading-normal">
                  Tiempos de Espera Promedio
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight truncate">
                    25 min
                  </p>
                  <p className="text-red-600 dark:text-red-500 text-sm font-medium leading-normal">-1.8%</p>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                  Últimos 7 Días
                </p>
                <div className="flex min-h-[220px] flex-1 flex-col justify-end gap-2 py-4">
                  <svg
                    fill="none"
                    height="100%"
                    preserveAspectRatio="none"
                    viewBox="0 0 475 150"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
                      fill="url(#paint0_linear_chart)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#2a8d4b"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></path>
                    <defs>
                      <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="236" x2="236" y1="1" y2="149">
                        <stop stopColor="#2a8d4b" stopOpacity="0.2"></stop>
                        <stop offset="1" stopColor="#2a8d4b" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex justify-around">
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                      Lun
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                      Mar
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                      Mié
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                      Jue
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                      Vie
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                      Sáb
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-normal tracking-wide">
                      Dom
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart 3: Donut Chart */}
              <div className="flex flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800 lg:col-span-2">
                <p className="text-slate-900 dark:text-white text-base font-medium font-heading leading-normal">
                  % Reciclado vs. Relleno Sanitario
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
                  <div className="relative flex items-center justify-center size-48">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="stroke-slate-200 dark:stroke-slate-700"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="4"
                      ></path>
                      <path
                        className="stroke-primary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeDasharray="35, 100"
                        strokeLinecap="round"
                        strokeWidth="4"
                      ></path>
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-slate-900 dark:text-white text-4xl font-bold tracking-tight">35%</span>
                      <span className="text-slate-500 dark:text-slate-400 text-sm">Reciclado</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="size-3 rounded-full bg-primary"></div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Reciclado</p>
                        <p className="text-slate-900 dark:text-white font-bold text-lg">4,280 Ton</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="size-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Relleno Sanitario</p>
                        <p className="text-slate-900 dark:text-white font-bold text-lg">7,890 Ton</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-green-600 dark:text-green-500 text-sm font-medium">+1.2%</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">vs Últimos 7 Días</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlantasReportaje;

