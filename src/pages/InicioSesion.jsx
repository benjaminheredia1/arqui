import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const InicioSesion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light p-4 dark:bg-background-dark">
      <div className="w-full max-w-md">
        <div className="flex w-full flex-col items-center rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 sm:p-8">
          {/* Logo */}
          <div className="mb-6 h-20 w-20">
            <div
              className="w-full bg-center bg-no-repeat bg-contain aspect-square"
              data-alt="Logo de Emacruz, una hoja verde estilizada formando una letra E"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCpXDwIr9lDDvzbmlaNQAN39E2HkcswvQ3QtGKPyNffLm_Vt4ZbW90sOuVncEyxDfMt5HS_3NUnS5xxqgoKsqwiuLRKg1WUt4rSRp3ie5luAG8IbBWYtPZeY5Ppj853wUhhOi6acSBhmDMzBZLupa2XkzetA3hkBqmIF5B5jekPInaLd7-_RX9g21_8l2PHeFPtz6hh91NiRDb_W71ydrnRcnInyKkTKootU-GzP40YlX6pvyvzpymIqiQEfBHBbHA8lz_HeZ9BF5Q")',
              }}
            ></div>
          </div>

          {/* Headline Text */}
          <h1 className="text-[#121714] dark:text-white tracking-light text-2xl font-bold leading-tight text-center pb-2">
            Bienvenido a Gestión Municipal
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-center mb-8">
            Inicia sesión para continuar
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Text Field: Correo Electrónico */}
            <div className="flex w-full flex-wrap items-end gap-4 pb-4">
              <label className="flex flex-col min-w-40 flex-1 w-full">
                <p className="text-[#121714] dark:text-neutral-200 text-sm font-medium leading-normal pb-2">
                  Correo Electrónico
                </p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#121714] dark:text-white focus:outline-0 focus:ring-0 border border-[#E0E0E0] dark:border-neutral-700 bg-white dark:bg-neutral-800/50 focus:border-[#2a8d4b] h-12 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 p-[15px] text-base font-normal leading-normal transition-colors"
                  placeholder="ejemplo@correo.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>
            </div>

            {/* Text Field: Contraseña */}
            <div className="flex w-full flex-wrap items-end gap-4 pb-6">
              <label className="flex flex-col min-w-40 flex-1 w-full">
                <p className="text-[#121714] dark:text-neutral-200 text-sm font-medium leading-normal pb-2">
                  Contraseña
                </p>
                <div className="relative flex w-full flex-1 items-stretch">
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#121714] dark:text-white focus:outline-0 focus:ring-0 border border-[#E0E0E0] dark:border-neutral-700 bg-white dark:bg-neutral-800/50 focus:border-[#2a8d4b] h-12 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 p-[15px] pr-10 text-base font-normal leading-normal transition-colors"
                    placeholder="Ingresa tu contraseña"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    className="text-[#828282] dark:text-neutral-400 absolute inset-y-0 right-0 flex items-center pr-3 hover:text-[#2A8C4A] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <span className="material-symbols-outlined" data-icon="Eye" data-size="24px" data-weight="regular">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </label>
            </div>

            {/* Button Group */}
            <div className="flex w-full flex-1 flex-col items-stretch gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#2A8C4A] text-white text-base font-bold leading-normal tracking-[0.015em] w-full hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Iniciando sesión...
                  </span>
                ) : (
                  <span className="truncate">Iniciar sesión</span>
                )}
              </button>
              <button
                type="button"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-transparent text-[#2A8C4A] border border-[#2A8C4A] text-base font-bold leading-normal tracking-[0.015em] w-full hover:bg-[#2A8C4A]/10 dark:hover:bg-[#2A8C4A]/20 transition-colors"
              >
                <span className="truncate">Registrarse</span>
              </button>
            </div>
          </form>

          {/* Help Link */}
          <div className="mt-6 text-center">
            <a
              className="text-sm text-[#828282] dark:text-neutral-400 hover:text-[#2A8C4A] dark:hover:text-primary transition-colors"
              href="#"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;

