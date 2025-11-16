// Script de prueba para verificar la conexión con Supabase
// Ejecuta este código en la consola del navegador (F12) en tu aplicación

// Importar el servicio de Supabase (o copiar y pegar el código directamente)
import { rutasSupabaseService, supabase } from './src/services/supabase.js'

// Función para probar la conexión y ver la estructura
async function testSupabaseConnection() {
  console.log('🔍 Probando conexión con Supabase...')
  console.log('📊 URL:', import.meta.env.VITE_SUPABASE_URL)
  console.log('🔑 Key configurada:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Sí' : 'No')
  
  try {
    // Intentar obtener todas las tablas disponibles
    console.log('\n📋 Intentando listar tablas...')
    
    // Probar diferentes nombres de tabla comunes
    const posiblesTablas = ['rutas', 'routes', 'recorridos', 'route', 'ruta']
    
    for (const tabla of posiblesTablas) {
      try {
        const { data, error } = await supabase
          .from(tabla)
          .select('*')
          .limit(1)
        
        if (!error && data) {
          console.log(`✅ Tabla encontrada: "${tabla}"`)
          console.log('📊 Estructura de la primera fila:', data[0])
          console.log('🔑 Columnas disponibles:', Object.keys(data[0] || {}))
          break
        }
      } catch (err) {
        console.log(`❌ Tabla "${tabla}" no encontrada o sin acceso`)
      }
    }
    
    // Intentar obtener rutas usando el servicio
    console.log('\n🔄 Probando servicio getAllRutas...')
    const rutas = await rutasSupabaseService.getAllRutas()
    console.log('✅ Rutas obtenidas:', rutas.length)
    if (rutas.length > 0) {
      console.log('📋 Primera ruta:', rutas[0])
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
    console.error('💡 Detalles:', error.message)
  }
}

// Ejecutar la prueba
testSupabaseConnection()

