const Header = ({ title, showButtons = true, variant = 'default' }) => {
  return (
    <header className={`flex items-center justify-between whitespace-nowrap border-b border-solid ${
      variant === 'routes' 
        ? 'border-neutral-gray-medium/20 dark:border-white/10' 
        : variant === 'admin'
        ? 'border-border-light dark:border-border-dark'
        : 'border-gray-200 dark:border-gray-800'
    } px-10 py-4 ${
      variant === 'routes' || variant === 'admin'
        ? 'bg-neutral-white dark:bg-background-dark'
        : 'bg-background-light dark:bg-background-dark'
    } sticky top-0 z-10`}>
      <div className="flex items-center gap-4 text-gray-900 dark:text-white">
        <h2 className={`${
          variant === 'routes' || variant === 'admin'
            ? 'font-heading text-lg font-bold leading-tight tracking-[-0.015em] text-text-dark dark:text-text-light'
            : variant === 'admin'
            ? 'font-heading text-xl font-bold text-text-light-title dark:text-text-dark-title'
            : 'text-gray-900 dark:text-white text-lg font-bold font-heading leading-tight'
        }`}>
          {title}
        </h2>
      </div>
      {showButtons && (
        <div className="flex items-center gap-4">
          {variant === 'admin' && (
            <button className="flex items-center justify-center gap-x-2 rounded-lg bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm font-medium transition-colors duration-200">
              <span className="material-symbols-outlined text-base">download</span>
              <span>Exportar</span>
            </button>
          )}
          {variant !== 'admin' && (
            <>
              <button className="flex items-center justify-center rounded-full size-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                <span className="material-symbols-outlined text-xl">notifications</span>
              </button>
              {variant === 'default' && (
                <button className="flex items-center justify-center rounded-full size-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                  <span className="material-symbols-outlined text-xl">help</span>
                </button>
              )}
            </>
          )}
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
            data-alt="User profile picture" 
            style={{
              backgroundImage: variant === 'admin' 
                ? 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaxhf_kjx1fcIVApTGFI6QYDICzhiBnptwhnf0eccdGf_ifPWOdlBzhOPrunVRPRgPSZdExRXiEN8eLRxO9apSYS5Am-MzzUrimplVQSPJTW9JtBgGkVBGT1YXLcht2RPlwphXrdNHyJ9qlR85YFIzPbtgSPFCPY1KaGBc81y6tZieludqopb4xZVOkKqHGM6ixB64W4cm2tuGgw6OQA-lF9m8xWZRp66NNBhMHUEsDR1V3e1UlA8bEHvl8q7S9JjfsOEkWeogsPA")'
                : variant === 'routes'
                ? 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDElIS3rTqPcTUWZKlGoUzTuOZhLkS_lbP4_gJakuNAeQtYHYcqt9rSrHqSXtXd_HBfROjIsssjd3X4z4JLfaHa_q122Nxl6AOFpQZBH4Mwpd_quMqx8IceldgRo0RCNoQOyR_dN6Tztf4FdChaY1pZndk0_t9cWoVvky3J0dyv9myYPUQXVrIbTXTrwWOq4beIG0wlh_OnestqlDXrBrM89BJFUmPfvnx1t0wV4bhksa70fcgwhw8HMANV4L5bY2VeFZpAUdgziA8")'
                : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA9ghjRvuezh7gGwP9MibQU_YU6H-fbUNs01pWjbyC23pVZDhGS7xBisuqm4DnYQds5WRYruOF8RmyW_KGAvqkyRgg0kPgh3937DEhruMTIDtBrkI1mOGAomSdc5izKnQDt-iYspXNtYDYypE6cbvLRrfVkk-zVkcYVrI6JBwgcCzS6G_zQo9qeWWOVLhGoYAVcW9o60XDygjJNIcTEk146Qf6e1P15npQfzVyo9rnoFUWE4z39JQ6ofTHh4Xu-_DHCy3At34FZUkA")'
            }}
          ></div>
        </div>
      )}
    </header>
  );
};

export default Header;

