import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDheMyNvEYavfxelpg194zNSVWHjLczJVh2vJ6PoRUvrp0OtsMi-W_CIMzpsL2yuFDSXUgOYx8at-T7FIfKV1DF0oWQskKH32pZikFcfC3Wa0K_LapmrWkUzwgvPCFU4pY7QCrqL9pprhwSiJHj0JI9P76hV7V5CCU4lwPWtvI39bJVeTmphynNCff8NIWBW9klw58FJfIuPYjYSD5JBq_6BuIEpTi02WFzxwAL_KbD9ydD2CRDvxV9DQ-9c6R8CV_bhs_-UyMtY_k")'}}
              ></div>
              <div>
                <h1 className={`text-2xl font-bold font-heading ${scrolled ? 'text-primary' : 'text-white'}`}>
                  EMACRUZ
                </h1>
                <p className={`text-sm ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>
                  Gestión Inteligente de Residuos
                </p>
              </div>
            </div>
            <Link
              to="/login"
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                scrolled 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-white text-primary hover:bg-white/90'
              }`}
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                🌱 Innovación en Gestión Ambiental
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-heading leading-tight">
                Transforma la Gestión de Residuos en Santa Cruz
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Sistema integral para optimizar rutas, monitorear recursos en tiempo real y mejorar la eficiencia operativa de tu empresa de gestión de residuos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Comenzar Ahora</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <button
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300"
                >
                  Conocer Más
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold">25+</div>
                  <div className="text-sm text-white/80">Vehículos</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">45+</div>
                  <div className="text-sm text-white/80">Empleados</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">12+</div>
                  <div className="text-sm text-white/80">Rutas Activas</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: '200px' }}>
                    local_shipping
                  </span>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                  100% Eficiente
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  Tiempo Real
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Principales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para gestionar tu flota de manera eficiente y profesional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">route</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Gestión de Rutas</h3>
              <p className="text-gray-700">
                Planifica y optimiza rutas de recolección con mapas interactivos en tiempo real. Reduce costos y mejora la eficiencia.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">map</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Monitoreo en Vivo</h3>
              <p className="text-gray-700">
                Rastrea vehículos y personal en tiempo real. Visualiza rutas activas y recibe alertas instantáneas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">bar_chart</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Reportes Inteligentes</h3>
              <p className="text-gray-700">
                Genera reportes detallados y análisis de rendimiento. Toma decisiones basadas en datos reales.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Gestión de Personal</h3>
              <p className="text-gray-700">
                Administra tu equipo de trabajo, asigna tareas y monitorea el desempeño de cada colaborador.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">local_shipping</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Control de Vehículos</h3>
              <p className="text-gray-700">
                Gestiona tu flota completa, programa mantenimientos y controla el estado de cada vehículo.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Asistente IA</h3>
              <p className="text-gray-700">
                Asistente de voz inteligente que te ayuda a navegar por el sistema y obtener información rápidamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para optimizar tu gestión de residuos?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Únete a las empresas que confían en EMACRUZ para mejorar su eficiencia operativa
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-lg font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            <span>Comenzar Ahora</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDheMyNvEYavfxelpg194zNSVWHjLczJVh2vJ6PoRUvrp0OtsMi-W_CIMzpsL2yuFDSXUgOYx8at-T7FIfKV1DF0oWQskKH32pZikFcfC3Wa0K_LapmrWkUzwgvPCFU4pY7QCrqL9pprhwSiJHj0JI9P76hV7V5CCU4lwPWtvI39bJVeTmphynNCff8NIWBW9klw58FJfIuPYjYSD5JBq_6BuIEpTi02WFzxwAL_KbD9ydD2CRDvxV9DQ-9c6R8CV_bhs_-UyMtY_k")'}}
                ></div>
                <h3 className="text-xl font-bold">EMACRUZ</h3>
              </div>
              <p className="text-gray-400">
                Gestión inteligente de residuos para Santa Cruz de la Sierra
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EMACRUZ. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
