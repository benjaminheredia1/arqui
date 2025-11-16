import { useState, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { ELEVENLABS_CONFIG } from '../config/elevenlabs';
import { useClientTools } from '../config/clientTools';

const VoiceAgentModal = ({ isOpen, onClose }) => {
  const [agentId, setAgentId] = useState(ELEVENLABS_CONFIG.AGENT_ID);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [volume, setVolume] = useState(0.8);
  const messagesEndRef = useRef(null);
  const clientTools = useClientTools();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const conversation = useConversation({
    volume,
    serverLocation: ELEVENLABS_CONFIG.SERVER_LOCATION,
    clientTools, // Habilita las herramientas del cliente
    onConnect: () => {
      console.log('Agente conectado');
      setIsConnected(true);
      setMessages([{
        source: 'agent',
        message: '¡Hola! ¿En qué puedo ayudarte hoy?',
        timestamp: new Date().toISOString()
      }]);
    },
    onDisconnect: () => {
      console.log('Agente desconectado');
      setIsConnected(false);
    },
    onMessage: (message) => {
      console.log('Mensaje recibido:', message);
      if (message.message && message.message.trim()) {
        setMessages(prev => [...prev, {
          ...message,
          timestamp: new Date().toISOString()
        }]);
      }
    },
    onError: (error) => {
      console.error('Error del agente:', error);
      setMessages(prev => [...prev, {
        source: 'system',
        message: `Error: ${error.message || 'Ocurrió un error'}`,
        timestamp: new Date().toISOString()
      }]);
    },
    onModeChange: (mode) => {
      console.log('Modo cambiado:', mode);
    },
  });

  const { status, isSpeaking } = conversation;

  // Solicitar permisos de micrófono cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      requestMicrophonePermission();
    }
  }, [isOpen]);

  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Permiso de micrófono concedido');
    } catch (error) {
      console.error('Error al solicitar permisos de micrófono:', error);
      alert('Por favor, permite el acceso al micrófono para usar el asistente de voz');
    }
  };

  const handleStartConversation = async () => {
    if (!agentId.trim()) {
      alert('Por favor, ingresa el ID del agente');
      return;
    }

    try {
      const conversationId = await conversation.startSession({
        agentId: agentId.trim(),
        connectionType: ELEVENLABS_CONFIG.CONNECTION_TYPE,
      });
      console.log('Conversación iniciada:', conversationId);
    } catch (error) {
      console.error('Error al iniciar conversación:', error);
      alert('Error al conectar con el agente. Verifica el ID del agente.');
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
      setMessages([]);
      setIsConnected(false);
    } catch (error) {
      console.error('Error al finalizar conversación:', error);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim() || !isConnected) return;
    
    // Agregar mensaje del usuario a la UI
    setMessages(prev => [...prev, {
      source: 'user',
      message: userInput,
      timestamp: new Date().toISOString()
    }]);
    
    conversation.sendUserMessage(userInput);
    setUserInput('');
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    conversation.setVolume({ volume: newVolume });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm" style={{ zIndex: 9999 }}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" style={{ zIndex: 10000 }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined text-3xl text-primary">
                support_agent
              </span>
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Asistente de Voz
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isConnected 
                  ? isSpeaking 
                    ? 'Hablando...' 
                    : 'Conectado - Escuchando...'
                  : 'Desconectado'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!isConnected ? (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                    info
                  </span>
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                      ¿Cómo usar el asistente de voz?
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Ingresa el ID de tu agente de ElevenLabs y haz clic en "Conectar" para comenzar. 
                      Asegúrate de permitir el acceso al micrófono.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ID del Agente de ElevenLabs
                </label>
                <input
                  type="text"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  placeholder="Ej: agent_abc123..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <button
                onClick={handleStartConversation}
                disabled={!agentId.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                <span className="material-symbols-outlined">phone_in_talk</span>
                <span>Conectar con el Agente</span>
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="space-y-3 min-h-[300px] max-h-[400px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                    <span className="material-symbols-outlined text-6xl mb-2">
                      chat_bubble_outline
                    </span>
                    <p className="text-sm">Habla o escribe para comenzar la conversación</p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          msg.source === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-lg ${
                            msg.source === 'user'
                              ? 'bg-primary text-white rounded-br-none'
                              : msg.source === 'system'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-bl-none'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 pt-2">
                <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
                  volume_up
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleEndConversation}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-base">call_end</span>
                  <span>Finalizar</span>
                </button>
                
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => {
                      setUserInput(e.target.value);
                      conversation.sendUserActivity();
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!userInput.trim()}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentModal;
