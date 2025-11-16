# Asistente de Voz con ElevenLabs

Este proyecto incluye un asistente de voz interactivo utilizando el SDK de ElevenLabs.

## 🚀 Características

- **Botón flotante** accesible desde todas las páginas
- **Modal interactivo** con el agente de voz
- **Comunicación por voz y texto** bidireccional
- **Indicadores visuales** de estado de conexión y voz
- **Diseño responsive** y moderno

## 📋 Requisitos Previos

1. Una cuenta en [ElevenLabs](https://elevenlabs.io)
2. Un agente creado en el [Panel de ElevenLabs](https://elevenlabs.io/app/conversational-ai)
3. Permisos de micrófono en el navegador

## ⚙️ Configuración

### Opción 1: Usar variables de entorno (Recomendado)

1. Crea un archivo `.env` en la raíz del proyecto:

```bash
# .env
VITE_ELEVENLABS_AGENT_ID=tu_agent_id_aqui
```

2. Reinicia el servidor de desarrollo:

```bash
npm run dev
```

### Opción 2: Configuración directa

Edita el archivo `src/config/elevenlabs.js` y reemplaza el `AGENT_ID`:

```javascript
export const ELEVENLABS_CONFIG = {
  AGENT_ID: 'tu_agent_id_aqui',
  // ... resto de la configuración
};
```

## 🎯 Cómo Obtener tu Agent ID

1. Ve a [ElevenLabs Conversational AI](https://elevenlabs.io/app/conversational-ai)
2. Crea un nuevo agente o selecciona uno existente
3. Copia el **Agent ID** desde el panel de configuración
4. Pégalo en tu archivo `.env` o en `src/config/elevenlabs.js`

## 📱 Uso

### Abrir el Asistente

- Haz clic en el **botón flotante** (icono de agente) en la esquina inferior derecha
- El botón está disponible en todas las páginas protegidas de la aplicación

### Iniciar una Conversación

1. **Primera vez**: El modal te pedirá que ingreses el Agent ID (si no está configurado)
2. Haz clic en **"Conectar con el Agente"**
3. Acepta los permisos de micrófono cuando el navegador lo solicite
4. ¡Comienza a hablar con el agente!

### Interactuar

- **Por voz**: Simplemente habla cuando el agente esté escuchando
- **Por texto**: Escribe en el campo de entrada y presiona Enter o el botón de enviar
- **Finalizar**: Haz clic en el botón "Finalizar" para terminar la conversación

## 🎨 Componentes Creados

### `VoiceAgentButton.jsx`
Botón flotante que abre el modal del agente. Incluye:
- Animación de pulso
- Efecto hover
- Posicionamiento fijo en la esquina inferior derecha

### `VoiceAgentModal.jsx`
Modal principal con el agente de voz. Características:
- Indicadores de estado (conectado/desconectado/hablando)
- Historial de mensajes
- Input de texto
- Controles de conexión/desconexión

### `config/elevenlabs.js`
Archivo de configuración centralizado para:
- Agent ID
- Tipo de conexión (WebRTC/WebSocket)
- Región del servidor
- Configuración de audio

## 🔧 Configuraciones Avanzadas

### Cambiar el tipo de conexión

En `src/config/elevenlabs.js`:

```javascript
CONNECTION_TYPE: 'websocket', // o 'webrtc'
```

- **WebRTC**: Mejor calidad de audio, menor latencia (recomendado)
- **WebSocket**: Mayor compatibilidad con navegadores antiguos

### Cambiar la región del servidor

En `src/config/elevenlabs.js`:

```javascript
SERVER_LOCATION: 'eu-residency', // 'us', 'eu-residency', 'in-residency', 'global'
```

### Personalizar el agente

Puedes personalizar el comportamiento del agente desde el panel de ElevenLabs:
- Prompt del sistema
- Voz y lenguaje
- Herramientas del lado del cliente
- Base de conocimientos

## 🛠️ Herramientas del Cliente (Client Tools)

Para agregar funcionalidad personalizada que el agente pueda invocar, edita `VoiceAgentModal.jsx`:

```javascript
const conversation = useConversation({
  clientTools: {
    abrirMapa: (parameters) => {
      // Tu lógica aquí
      navigate('/mapas');
      return 'Mapa abierto';
    },
    crearAlerta: (parameters) => {
      // Tu lógica aquí
      alert(parameters.mensaje);
      return 'Alerta creada';
    },
  },
  // ... resto de la configuración
});
```

Luego configura las mismas herramientas en el panel de ElevenLabs UI.

## 🐛 Solución de Problemas

### El agente no se conecta

- Verifica que el Agent ID sea correcto
- Asegúrate de que tu agente esté activo en ElevenLabs
- Revisa la consola del navegador para errores

### No se escucha el audio

- Verifica que hayas aceptado los permisos de micrófono
- Comprueba el volumen de tu sistema
- Intenta usar `CONNECTION_TYPE: 'websocket'` si WebRTC no funciona

### El modal no aparece

- Verifica que `VoiceAgentButton` esté importado en `App.jsx`
- Revisa que no haya errores en la consola

## 📚 Recursos

- [Documentación de ElevenLabs](https://elevenlabs.io/docs)
- [React SDK de ElevenLabs](https://elevenlabs.io/docs/developer-guides/agents-platform-sdk/react-sdk)
- [API Reference](https://elevenlabs.io/docs/api-reference/agents-platform)

## 🎉 ¡Listo!

Tu asistente de voz está configurado y listo para usar. Disfruta de la experiencia conversacional mejorada en tu aplicación.
