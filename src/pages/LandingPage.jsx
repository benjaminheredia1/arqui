import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Inicializar AOS con configuración épica
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out-cubic',
      once: false,
      mirror: true,
      anchorPlacement: 'top-bottom',
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 transform hover:scale-110 transition-transform duration-300" 
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
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
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
      <section className="pt-32 pb-20 px-6 relative">
        {/* Particles background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-1/2 right-0 animate-pulse delay-1000"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-0 left-1/2 animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div 
                className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                🌱 Innovación en Gestión Ambiental
              </div>
              <h1 
                className="text-5xl md:text-6xl font-bold font-heading leading-tight"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                Transforma la Gestión de Residuos en Santa Cruz
              </h1>
              <p 
                className="text-xl text-white/90 leading-relaxed"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                Sistema integral para optimizar rutas, monitorear recursos en tiempo real y mejorar la eficiencia operativa de tu empresa de gestión de residuos.
              </p>
              <div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2 group"
                >
                  <span>Comenzar Ahora</span>
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </Link>
                <button
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105"
                >
                  Conocer Más
                </button>
              </div>

              {/* Stats */}
              <div 
                className="grid grid-cols-3 gap-6 pt-8"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-4xl font-bold animate-pulse">25+</div>
                  <div className="text-sm text-white/80">Vehículos</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-4xl font-bold animate-pulse">45+</div>
                  <div className="text-sm text-white/80">Empleados</div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform">
                  <div className="text-4xl font-bold animate-pulse">12+</div>
                  <div className="text-sm text-white/80">Rutas Activas</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div 
              className="relative"
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-white animate-bounce" style={{ fontSize: '200px' }}>
                    local_shipping
                  </span>
                </div>
                {/* Floating elements */}
                <div 
                  className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  data-aos="zoom-in"
                  data-aos-delay="800"
                >
                  100% Eficiente
                </div>
                <div 
                  className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  data-aos="zoom-in"
                  data-aos-delay="1000"
                >
                  Tiempo Real
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl top-20 left-10"></div>
          <div className="absolute w-64 h-64 bg-blue-500/5 rounded-full blur-3xl bottom-20 right-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div 
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
              Funcionalidades Principales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para gestionar tu flota de manera eficiente y profesional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 transform group relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">route</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Gestión de Rutas</h3>
                <p className="text-gray-700">
                  Planifica y optimiza rutas de recolección con mapas interactivos en tiempo real. Reduce costos y mejora la eficiencia.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div 
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 transform group relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">map</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Monitoreo en Vivo</h3>
                <p className="text-gray-700">
                  Rastrea vehículos y personal en tiempo real. Visualiza rutas activas y recibe alertas instantáneas.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div 
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 transform group relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">bar_chart</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Reportes Inteligentes</h3>
                <p className="text-gray-700">
                  Genera reportes detallados y análisis de rendimiento. Toma decisiones basadas en datos reales.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div 
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 transform group relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/0 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">groups</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Gestión de Personal</h3>
                <p className="text-gray-700">
                  Administra tu equipo de trabajo, asigna tareas y monitorea el desempeño de cada colaborador.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div 
              className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 transform group relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">local_shipping</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Control de Vehículos</h3>
                <p className="text-gray-700">
                  Gestiona tu flota completa, programa mantenimientos y controla el estado de cada vehículo.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div 
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 transform group relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">support_agent</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Asistente IA</h3>
                <p className="text-gray-700">
                  Asistente de voz inteligente que te ayuda a navegar por el sistema y obtener información rápidamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-20 -right-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-0 -left-20 animate-pulse delay-1000"></div>
          <div className="absolute top-20 left-1/4 w-4 h-4 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-white/50 rounded-full animate-ping delay-500"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping delay-1000"></div>
        </div>

        <div 
          className="container mx-auto px-6 text-center relative z-10"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            ¿Listo para optimizar tu gestión de residuos?
          </h2>
          <p 
            className="text-xl mb-8 max-w-2xl mx-auto text-white/90"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Únete a las empresas que confían en EMACRUZ para mejorar su eficiencia operativa
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-lg font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl group"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <span>Comenzar Ahora</span>
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="bg-gray-900 text-white py-12"
        data-aos="fade-up"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 transform hover:scale-110 transition-transform" 
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDheMyNvEYavfxelpg194zNSVWHjLczJVh2vJ6PoRUvrp0OtsMi-W_CIMzpsL2yuFDSXUgOYx8at-T7FIfKV1DF0oWQskKH32pZikFcfC3Wa0K_LapmrWkUzwgvPCFU4pY7QCrqL9pprhwSiJHj0JI9P76hV7V5CCU4lwPWtvI39bJVeTmphynNCff8NIWBW9klw58FJfIuPYjYSD5JBq_6BuIEpTi02WFzxwAL_KbD9ydD2CRDvxV9DQ-9c6R8CV_bhs_-UyMtY_k")'}}
                ></div>
                <h3 className="text-xl font-bold">EMACRUZ</h3>
              </div>
              <p className="text-gray-400">
                Gestión inteligente de residuos para Santa Cruz de la Sierra
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
              <h4 className="font-bold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Documentación</a></li>
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-delay="300">
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Contacto</a></li>
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-delay="400">
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div 
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <p>&copy; 2025 EMACRUZ. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
