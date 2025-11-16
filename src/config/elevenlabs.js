// Configuración del Agente de Voz de ElevenLabs
// Para obtener tu Agent ID, ve a: https://elevenlabs.io/app/conversational-ai

export const ELEVENLABS_CONFIG = {
  // Reemplaza esto con tu Agent ID real
  AGENT_ID: import.meta.env.VITE_ELEVENLABS_AGENT_ID || '',
  
  // Tipo de conexión: 'webrtc' o 'websocket'
  // WebRTC: mejor calidad de audio, menor latencia
  // WebSocket: más compatible, funciona en más navegadores
  CONNECTION_TYPE: 'webrtc',
  
  // Región del servidor: 'us', 'eu-residency', 'in-residency', 'global'
  SERVER_LOCATION: 'us',
  
  // Configuración de audio
  SAMPLE_RATE: 16000,
  AUDIO_FORMAT: 'pcm',
};

// Para configurar el Agent ID:
// 1. Crea un archivo .env en la raíz del proyecto
// 2. Agrega: VITE_ELEVENLABS_AGENT_ID=tu_agent_id_aqui
// 3. O edita directamente el valor AGENT_ID arriba (no recomendado para producción)
