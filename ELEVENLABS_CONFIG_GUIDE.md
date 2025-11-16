# Configuración del Agente en ElevenLabs

Esta guía te ayudará a configurar tu agente de voz en el panel de ElevenLabs para que funcione con tu aplicación.

## 📝 Pasos para Configurar tu Agente

### 1. Crear o Acceder a tu Agente

1. Ve a [ElevenLabs Conversational AI](https://elevenlabs.io/app/conversational-ai)
2. Haz clic en **"Create Agent"** o selecciona un agente existente
3. Copia el **Agent ID** que aparece en la configuración

### 2. Configuración Básica del Agente

#### **Prompt del Sistema**
En la sección "System Prompt", configura el comportamiento de tu agente:

```
Eres un asistente virtual para el sistema de gestión de EMACRUZ, una empresa de gestión de residuos.

Tu función es ayudar a los usuarios a:
- Navegar por diferentes secciones de la aplicación (dashboard, rutas, vehículos, personal, plantas, mapas, alertas, incidencias, usuarios, reportes, configuración)
- Obtener información sobre el estado del sistema
- Crear recordatorios y tareas
- Generar reportes
- Buscar información en el sistema
- Responder preguntas sobre la gestión de residuos y rutas

Debes ser:
- Profesional y cortés
- Claro y conciso en tus respuestas
- Proactivo en ofrecer ayuda
- Capaz de ejecutar acciones cuando te lo soliciten

Habla en español y mantén un tono amigable pero profesional.
```

#### **Primer Mensaje**
Configura el mensaje inicial del agente:

```
¡Hola! Soy tu asistente virtual de EMACRUZ. ¿En qué puedo ayudarte hoy? Puedo ayudarte a navegar por el sistema, obtener información, generar reportes y mucho más.
```

#### **Idioma**
- Selecciona **Spanish (es)** como idioma principal

### 3. Configurar la Voz

1. Ve a la sección **"Voice"**
2. Selecciona una voz en español que te guste
3. Ajusta la velocidad y estabilidad según prefieras
4. Prueba la voz con el botón "Preview"

Voces recomendadas en español:
- **Valentino** (Masculino, profesional)
- **Matilda** (Femenino, amigable)
- **Domi** (Femenino, profesional)

### 4. Configurar Client Tools (Herramientas del Cliente)

Las Client Tools permiten que el agente ejecute acciones en tu aplicación. Ve a la sección **"Tools"** y agrega las siguientes:

#### Tool 1: navegarAPagina
```json
{
  "name": "navegarAPagina",
  "description": "Navega a una página específica de la aplicación",
  "parameters": {
    "type": "object",
    "properties": {
      "pagina": {
        "type": "string",
        "description": "Nombre de la página",
        "enum": [
          "dashboard",
          "rutas",
          "vehiculos",
          "personal",
          "plantas",
          "mapas",
          "alertas",
          "incidencias",
          "usuarios",
          "reportes",
          "configuracion"
        ]
      }
    },
    "required": ["pagina"]
  }
}
```
✅ **Marcar como "Blocking"** para que el agente espere la respuesta

#### Tool 2: obtenerInformacionSistema
```json
{
  "name": "obtenerInformacionSistema",
  "description": "Obtiene información del estado actual del sistema",
  "parameters": {
    "type": "object",
    "properties": {}
  }
}
```
✅ **Marcar como "Blocking"**

#### Tool 3: mostrarAlerta
```json
{
  "name": "mostrarAlerta",
  "description": "Muestra una alerta al usuario",
  "parameters": {
    "type": "object",
    "properties": {
      "mensaje": {
        "type": "string",
        "description": "El mensaje de la alerta"
      },
      "tipo": {
        "type": "string",
        "description": "Tipo de alerta",
        "enum": ["info", "warning", "error", "success"]
      }
    },
    "required": ["mensaje"]
  }
}
```

#### Tool 4: buscarDatos
```json
{
  "name": "buscarDatos",
  "description": "Busca información en el sistema",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Texto a buscar"
      },
      "categoria": {
        "type": "string",
        "description": "Categoría donde buscar",
        "enum": ["vehiculos", "personal", "rutas", "alertas", "incidencias"]
      }
    },
    "required": ["query", "categoria"]
  }
}
```
✅ **Marcar como "Blocking"**

#### Tool 5: crearRecordatorio
```json
{
  "name": "crearRecordatorio",
  "description": "Crea un recordatorio para el usuario",
  "parameters": {
    "type": "object",
    "properties": {
      "titulo": {
        "type": "string",
        "description": "Título del recordatorio"
      },
      "fecha": {
        "type": "string",
        "description": "Fecha del recordatorio (formato: DD/MM/YYYY)"
      },
      "descripcion": {
        "type": "string",
        "description": "Descripción del recordatorio"
      }
    },
    "required": ["titulo", "fecha"]
  }
}
```

#### Tool 6: obtenerEstadisticas
```json
{
  "name": "obtenerEstadisticas",
  "description": "Obtiene estadísticas del sistema",
  "parameters": {
    "type": "object",
    "properties": {
      "tipo": {
        "type": "string",
        "description": "Tipo de estadística",
        "enum": ["vehiculos", "rutas", "personal", "alertas"]
      }
    },
    "required": ["tipo"]
  }
}
```
✅ **Marcar como "Blocking"**

#### Tool 7: generarReporte
```json
{
  "name": "generarReporte",
  "description": "Genera un reporte del sistema",
  "parameters": {
    "type": "object",
    "properties": {
      "tipo": {
        "type": "string",
        "description": "Tipo de reporte",
        "enum": ["vehiculos", "rutas", "personal", "incidencias", "completo"]
      },
      "formato": {
        "type": "string",
        "description": "Formato del reporte",
        "enum": ["pdf", "excel", "csv"]
      }
    },
    "required": ["tipo"]
  }
}
```

#### Tool 8: actualizarConfiguracion
```json
{
  "name": "actualizarConfiguracion",
  "description": "Actualiza una configuración del sistema",
  "parameters": {
    "type": "object",
    "properties": {
      "clave": {
        "type": "string",
        "description": "Nombre de la configuración"
      },
      "valor": {
        "type": "string",
        "description": "Nuevo valor"
      }
    },
    "required": ["clave", "valor"]
  }
}
```

### 5. Configuración Avanzada

#### **Knowledge Base** (Opcional)
Si quieres que el agente tenga conocimiento específico sobre tu empresa:

1. Ve a la sección **"Knowledge Base"**
2. Agrega documentos sobre:
   - Políticas de la empresa
   - Procedimientos operativos
   - Preguntas frecuentes
   - Información sobre servicios

#### **Conversation Settings**
- **Max Duration**: 30 minutos
- **Interruption Threshold**: Medium
- **Response Latency**: Low (para respuestas más rápidas)

### 6. Autenticación (Opcional)

Si quieres que el agente sea privado:

1. Ve a **"Authentication"**
2. Activa la autenticación
3. En tu código, necesitarás generar signed URLs o tokens desde tu backend

### 7. Probar el Agente

1. Usa el **Playground** de ElevenLabs para probar tu agente
2. Prueba cada client tool para verificar que funcionen
3. Ajusta el prompt según sea necesario

### 8. Copiar el Agent ID

1. En la configuración del agente, copia el **Agent ID**
2. Pégalo en tu archivo `.env`:

```bash
VITE_ELEVENLABS_AGENT_ID=tu_agent_id_aqui
```

## 🎯 Ejemplos de Interacción

Una vez configurado, tu agente podrá:

**Usuario**: "Llévame al mapa"
**Agente**: *Ejecuta navegarAPagina({pagina: "mapas"})* → "Claro, te llevo al mapa ahora mismo."

**Usuario**: "¿Cuántos vehículos están activos?"
**Agente**: *Ejecuta obtenerEstadisticas({tipo: "vehiculos"})* → "Actualmente hay 25 vehículos activos en el sistema."

**Usuario**: "Busca información sobre la ruta 5"
**Agente**: *Ejecuta buscarDatos({query: "ruta 5", categoria: "rutas"})* → "Buscando información sobre la ruta 5..."

**Usuario**: "Crea un recordatorio para revisar los vehículos mañana"
**Agente**: *Ejecuta crearRecordatorio({titulo: "Revisar vehículos", fecha: "17/11/2025"})* → "Perfecto, he creado un recordatorio para revisar los vehículos mañana."

## 🔧 Solución de Problemas

### El agente no invoca las herramientas
- Verifica que las herramientas estén marcadas como "Client Tools"
- Asegúrate de que los nombres coincidan exactamente
- Revisa que el prompt del agente mencione las capacidades

### El agente no responde bien en español
- Verifica que el idioma esté configurado como "Spanish"
- Ajusta el prompt del sistema
- Prueba con diferentes voces en español

### Las herramientas no funcionan
- Verifica la consola del navegador para errores
- Asegúrate de que las herramientas estén implementadas en `clientTools.js`
- Revisa que los parámetros coincidan con la configuración

## 📚 Recursos Adicionales

- [Documentación de Agents Platform](https://elevenlabs.io/docs/developer-guides/agents-platform)
- [Client Tools Guide](https://elevenlabs.io/docs/developer-guides/agents-platform/client-tools)
- [Voice Library](https://elevenlabs.io/voice-library)

## ✅ Checklist Final

- [ ] Agente creado en ElevenLabs
- [ ] Agent ID copiado y configurado en `.env`
- [ ] Prompt del sistema configurado
- [ ] Voz en español seleccionada
- [ ] Client Tools agregadas y configuradas
- [ ] Agente probado en el Playground
- [ ] Aplicación funcionando con el agente

¡Tu asistente de voz está listo para usar!
