// Ejemplo de Client Tools para ElevenLabs Agent
// Estas funciones pueden ser invocadas por el agente durante la conversación

import { useNavigate } from 'react-router-dom';

/**
 * Hook personalizado para obtener las herramientas del cliente
 * Estas herramientas deben estar configuradas también en el panel de ElevenLabs
 */
export const useClientTools = () => {
  const navigate = useNavigate();

  const clientTools = {
    /**
     * Navegar a una página específica
     * El agente puede decir: "Déjame llevarte a la página de mapas"
     */
    navegarAPagina: (parameters) => {
      const { pagina } = parameters;
      const rutasValidas = {
        'dashboard': '/dashboard',
        'rutas': '/rutas',
        'vehiculos': '/vehiculos',
        'personal': '/personal',
        'plantas': '/plantas',
        'mapas': '/mapas',
        'alertas': '/alertas',
        'incidencias': '/incidencias',
        'usuarios': '/usuarios',
        'reportes': '/reportes',
        'configuracion': '/configuracion'
      };

      if (rutasValidas[pagina.toLowerCase()]) {
        navigate(rutasValidas[pagina.toLowerCase()]);
        return `Navegando a la página de ${pagina}`;
      }
      return `No se encontró la página: ${pagina}`;
    },

    /**
     * Obtener información del sistema
     * El agente puede solicitar información del estado actual
     */
    obtenerInformacionSistema: (parameters) => {
      const info = {
        paginaActual: window.location.pathname,
        horaActual: new Date().toLocaleTimeString('es-ES'),
        fechaActual: new Date().toLocaleDateString('es-ES'),
      };
      return JSON.stringify(info);
    },

    /**
     * Mostrar un mensaje de alerta
     * El agente puede mostrar alertas importantes
     */
    mostrarAlerta: (parameters) => {
      const { mensaje, tipo = 'info' } = parameters;
      
      // Aquí podrías integrar con tu sistema de notificaciones
      // Por ahora usamos alert nativo
      alert(mensaje);
      
      return `Alerta mostrada: ${mensaje}`;
    },

    /**
     * Buscar información
     * El agente puede buscar datos en tu sistema
     */
    buscarDatos: (parameters) => {
      const { query, categoria } = parameters;
      
      // Aquí implementarías la lógica de búsqueda real
      // Ejemplo: buscar en base de datos, APIs, etc.
      
      return `Buscando "${query}" en categoría "${categoria}"`;
    },

    /**
     * Crear un recordatorio o tarea
     * El agente puede ayudar a crear recordatorios
     */
    crearRecordatorio: (parameters) => {
      const { titulo, fecha, descripcion } = parameters;
      
      // Aquí implementarías la lógica para guardar el recordatorio
      // Ejemplo: localStorage, base de datos, etc.
      
      console.log('Recordatorio creado:', { titulo, fecha, descripcion });
      return `Recordatorio "${titulo}" creado para ${fecha}`;
    },

    /**
     * Obtener estadísticas
     * El agente puede proporcionar estadísticas del sistema
     */
    obtenerEstadisticas: (parameters) => {
      const { tipo } = parameters;
      
      // Aquí implementarías la lógica para obtener estadísticas reales
      const estadisticas = {
        vehiculos: '25 activos',
        rutas: '12 en progreso',
        personal: '45 empleados',
        alertas: '3 pendientes'
      };
      
      return estadisticas[tipo] || 'Tipo de estadística no disponible';
    },

    /**
     * Generar reporte
     * El agente puede ayudar a generar reportes
     */
    generarReporte: (parameters) => {
      const { tipo, formato = 'pdf' } = parameters;
      
      // Aquí implementarías la lógica para generar reportes
      console.log(`Generando reporte de tipo: ${tipo} en formato ${formato}`);
      
      return `Generando reporte de ${tipo} en formato ${formato}...`;
    },

    /**
     * Actualizar configuración
     * El agente puede ayudar a cambiar configuraciones
     */
    actualizarConfiguracion: (parameters) => {
      const { clave, valor } = parameters;
      
      // Aquí implementarías la lógica para actualizar configuraciones
      console.log(`Actualizando configuración: ${clave} = ${valor}`);
      
      return `Configuración "${clave}" actualizada a "${valor}"`;
    }
  };

  return clientTools;
};

/**
 * Configuración de herramientas para el panel de ElevenLabs
 * Copia esta configuración al panel de ElevenLabs UI
 */
export const ELEVENLABS_TOOLS_CONFIG = [
  {
    name: 'navegarAPagina',
    description: 'Navega a una página específica de la aplicación',
    parameters: {
      type: 'object',
      properties: {
        pagina: {
          type: 'string',
          description: 'Nombre de la página (dashboard, rutas, vehiculos, personal, plantas, mapas, alertas, incidencias, usuarios, reportes, configuracion)',
          enum: ['dashboard', 'rutas', 'vehiculos', 'personal', 'plantas', 'mapas', 'alertas', 'incidencias', 'usuarios', 'reportes', 'configuracion']
        }
      },
      required: ['pagina']
    }
  },
  {
    name: 'obtenerInformacionSistema',
    description: 'Obtiene información del estado actual del sistema',
    parameters: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'mostrarAlerta',
    description: 'Muestra una alerta al usuario',
    parameters: {
      type: 'object',
      properties: {
        mensaje: {
          type: 'string',
          description: 'El mensaje de la alerta'
        },
        tipo: {
          type: 'string',
          description: 'Tipo de alerta (info, warning, error, success)',
          enum: ['info', 'warning', 'error', 'success']
        }
      },
      required: ['mensaje']
    }
  },
  {
    name: 'buscarDatos',
    description: 'Busca información en el sistema',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Texto a buscar'
        },
        categoria: {
          type: 'string',
          description: 'Categoría donde buscar',
          enum: ['vehiculos', 'personal', 'rutas', 'alertas', 'incidencias']
        }
      },
      required: ['query', 'categoria']
    }
  },
  {
    name: 'crearRecordatorio',
    description: 'Crea un recordatorio para el usuario',
    parameters: {
      type: 'object',
      properties: {
        titulo: {
          type: 'string',
          description: 'Título del recordatorio'
        },
        fecha: {
          type: 'string',
          description: 'Fecha del recordatorio (formato: DD/MM/YYYY)'
        },
        descripcion: {
          type: 'string',
          description: 'Descripción detallada del recordatorio'
        }
      },
      required: ['titulo', 'fecha']
    }
  },
  {
    name: 'obtenerEstadisticas',
    description: 'Obtiene estadísticas del sistema',
    parameters: {
      type: 'object',
      properties: {
        tipo: {
          type: 'string',
          description: 'Tipo de estadística',
          enum: ['vehiculos', 'rutas', 'personal', 'alertas']
        }
      },
      required: ['tipo']
    }
  },
  {
    name: 'generarReporte',
    description: 'Genera un reporte del sistema',
    parameters: {
      type: 'object',
      properties: {
        tipo: {
          type: 'string',
          description: 'Tipo de reporte',
          enum: ['vehiculos', 'rutas', 'personal', 'incidencias', 'completo']
        },
        formato: {
          type: 'string',
          description: 'Formato del reporte',
          enum: ['pdf', 'excel', 'csv']
        }
      },
      required: ['tipo']
    }
  },
  {
    name: 'actualizarConfiguracion',
    description: 'Actualiza una configuración del sistema',
    parameters: {
      type: 'object',
      properties: {
        clave: {
          type: 'string',
          description: 'Nombre de la configuración'
        },
        valor: {
          type: 'string',
          description: 'Nuevo valor de la configuración'
        }
      },
      required: ['clave', 'valor']
    }
  }
];
