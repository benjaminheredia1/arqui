import { useState } from 'react';
import VoiceAgentModal from './VoiceAgentModal';

const VoiceAgentButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
        style={{ zIndex: 1000 }}
        title="Abrir Asistente de Voz"
      >
        <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
          support_agent
        </span>
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
      </button>

      {/* Voice Agent Modal */}
      <VoiceAgentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default VoiceAgentButton;
