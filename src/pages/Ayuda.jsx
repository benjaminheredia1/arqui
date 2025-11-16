import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Ayuda = () => {
  const faqs = [
    {
      pregunta: '¿Cómo asigno una ruta a un camión?',
      respuesta: 'Ve a la sección de Gestión de Rutas, selecciona la ruta deseada y haz clic en "Asignar Camión". Luego selecciona el vehículo disponible.',
    },
    {
      pregunta: '¿Cómo reporto una incidencia?',
      respuesta: 'En la página de Incidencias, haz clic en "Reportar Incidencia" y completa el formulario con los detalles del problema.',
    },
    {
      pregunta: '¿Cómo exporto reportes?',
      respuesta: 'En cualquier sección de reportes, encontrarás un botón "Exportar" que te permitirá descargar los datos en formato CSV o PDF.',
    },
    {
      pregunta: '¿Cómo veo el estado de las plantas de separación?',
      respuesta: 'Ve a la sección "Plantas" en el menú lateral para ver el estado operativo, porcentaje de reciclado y descargas diarias.',
    },
  ];

  return (
    <div className="relative flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="flex flex-1 w-full min-h-0">
        <Sidebar variant="default" />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header title="Ayuda y Soporte" />
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            {/* PageHeading */}
            <div className="flex flex-col gap-1 mb-8">
              <p className="text-gray-900 dark:text-white text-4xl font-black font-heading leading-tight tracking-tight">
                Ayuda y Soporte
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                Encuentra respuestas a las preguntas más frecuentes y recursos de ayuda.
              </p>
            </div>

            <div className="max-w-4xl space-y-6">
              {/* Preguntas Frecuentes */}
              <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                      <p className="text-gray-900 dark:text-white font-medium mb-2">{faq.pregunta}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.respuesta}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacto */}
              <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">email</span>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">Correo Electrónico</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">soporte@emacruz.gob.bo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">phone</span>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">Teléfono</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">+591 3 1234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">Horario de Atención</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Lunes a Viernes: 8:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recursos */}
              <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
                <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">Recursos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">Manual de Usuario</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Guía completa del sistema</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
                    <span className="material-symbols-outlined text-primary">video_library</span>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">Tutoriales en Video</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Aprende paso a paso</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Ayuda;

