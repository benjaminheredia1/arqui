#!/bin/bash

# Script de ayuda para el Asistente de Voz ElevenLabs
# Ejecuta: bash quick-start.sh

echo "🎤 Asistente de Voz ElevenLabs - Quick Start"
echo "==========================================="
echo ""

# Verificar si existe .env
if [ ! -f .env ]; then
    echo "⚠️  Archivo .env no encontrado"
    echo "📝 Creando .env desde .env.example..."
    cp .env.example .env
    echo "✅ Archivo .env creado"
    echo ""
    echo "⚠️  IMPORTANTE: Edita .env y agrega tu VITE_ELEVENLABS_AGENT_ID"
    echo "   Obtén tu Agent ID en: https://elevenlabs.io/app/conversational-ai"
    echo ""
    read -p "Presiona Enter cuando hayas configurado tu Agent ID..."
else
    echo "✅ Archivo .env encontrado"
fi

echo ""
echo "📦 Verificando dependencias..."

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
else
    echo "✅ Dependencias ya instaladas"
fi

echo ""
echo "🔍 Verificando configuración..."

# Verificar que el SDK de ElevenLabs esté instalado
if grep -q "@elevenlabs/react" package.json; then
    echo "✅ SDK de ElevenLabs instalado"
else
    echo "⚠️  SDK de ElevenLabs no encontrado"
    echo "📦 Instalando @elevenlabs/react..."
    npm install @elevenlabs/react
fi

echo ""
echo "📚 Recursos de documentación creados:"
echo "   - VOICE_AGENT_README.md (Guía de uso)"
echo "   - ELEVENLABS_CONFIG_GUIDE.md (Configuración del agente)"
echo "   - IMPLEMENTATION_SUMMARY.md (Resumen de implementación)"
echo ""

echo "🎯 Archivos de código creados:"
echo "   - src/components/VoiceAgentModal.jsx"
echo "   - src/components/VoiceAgentButton.jsx"
echo "   - src/config/elevenlabs.js"
echo "   - src/config/clientTools.js"
echo ""

echo "✅ Todo listo!"
echo ""
echo "🚀 Para iniciar el servidor de desarrollo:"
echo "   npm run dev"
echo ""
echo "📖 Para leer la documentación:"
echo "   cat VOICE_AGENT_README.md"
echo ""
echo "🎤 ¡Disfruta tu asistente de voz!"
