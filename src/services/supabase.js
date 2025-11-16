import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variables de entorno de Supabase no configuradas. Usa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY')
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// Configuración: nombre de la tabla (puedes cambiarlo según tu estructura)
const TABLE_NAME = import.meta.env.VITE_SUPABASE_TABLE_NAME || 'rutas'

// Función helper para obtener el color según la macro zona
const getColorByMacroZona = (macroZona) => {
  if (!macroZona) return '#148040' // Verde por defecto
  
  const macroZonaLower = macroZona.toString().toLowerCase().trim()
  
  // Mapeo de macro zonas a colores
  const colorMap = {
    'verde': '#148040',
    'roja': '#E74C3C',
    'rojo': '#E74C3C',
    'naranja': '#F39C12',
    'lila': '#9B59B6',
    'morado': '#9B59B6',
    'violeta': '#9B59B6',
  }
  
  // Buscar coincidencia exacta o parcial
  for (const [key, color] of Object.entries(colorMap)) {
    if (macroZonaLower.includes(key)) {
      return color
    }
  }
  
  return '#148040' // Verde por defecto si no coincide
}

// Función helper para normalizar el schedule
const normalizeSchedule = (schedule) => {
  if (!schedule) {
    return {
      "Lunes": ["08:00"],
      "Martes": ["08:00", "15:00"],
      "Miércoles": ["08:00"],
      "Jueves": ["08:00", "15:00"],
      "Viernes": ["08:00"],
    }
  }
  
  // Si es string, intentar parsearlo
  if (typeof schedule === 'string') {
    try {
      const parsed = JSON.parse(schedule)
      return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
      return {}
    }
  }
  
  // Si es objeto, retornarlo directamente
  if (typeof schedule === 'object') {
    return schedule
  }
  
  return {}
}

// Normalizar texto y entidades HTML comunes
const cleanText = (value) => {
  if (value === undefined || value === null) return value
  let s = String(value)
  // Reemplazar entidades y guiones largos por '-'
  s = s.replace(/&#8211;|&ndash;|–|—/g, '-')
  s = s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  // Espacios alrededor de guión
  s = s.replace(/\s*-\s*/g, ' - ')
  return s.trim()
}

// Función helper para transformar datos de Supabase al formato esperado
const transformRuta = (ruta) => {
  // Intentar múltiples variaciones de nombres de columnas
  const scheduleRaw = ruta.schedule || ruta.horarios || ruta.schedules || ruta.times
  const macroZona = cleanText(ruta.macro_zona || ruta.macroZona || ruta.macro_zona_nombre || ruta.zona || 'Sin zona')
  
  // Obtener color: primero de la BD, luego según macro zona
  const colorFromDB = ruta.color || ruta.color_hex || ruta.color_code
  const color = colorFromDB || getColorByMacroZona(macroZona)

  const rawTitle = ruta.title || ruta.nombre || ruta.name || ruta.ruta || `Ruta ${ruta.id}`
  const title = cleanText(rawTitle)
  
  return {
    id: ruta.id || ruta.route_id || ruta.ruta_id,
    title: title,
    macroZona: macroZona,
    color: color,
    schedule: normalizeSchedule(scheduleRaw),
    recorrido: ruta.recorrido || ruta.coordenadas || ruta.coordinates || ruta.path || ruta.route || [],
  }
}

// Servicio para obtener rutas desde Supabase
export const rutasSupabaseService = {
  // Obtener todas las rutas
  getAllRutas: async () => {
    try {
      console.log(`🔍 Intentando obtener rutas de la tabla: ${TABLE_NAME}`)
      
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        console.error('❌ Error obteniendo rutas desde Supabase:', error)
        console.error('💡 Verifica que:')
        console.error('   1. La tabla existe en Supabase')
        console.error('   2. El nombre de la tabla es correcto (actualmente: ' + TABLE_NAME + ')')
        console.error('   3. Las políticas RLS permiten lectura')
        console.error('   4. Las credenciales son correctas')
        throw error
      }

      if (!data || data.length === 0) {
        console.warn('⚠️ No se encontraron rutas en la tabla:', TABLE_NAME)
        return []
      }

      console.log(`✅ Se encontraron ${data.length} rutas en Supabase`)
      console.log('📋 Estructura de la primera ruta:', data[0])

      // Transformar los datos de Supabase al formato esperado
      const transformed = data.map(transformRuta)
      console.log('🔄 Rutas transformadas:', transformed.length)
      
      // Log de colores asignados por macro zona para debug
      const colorCount = {}
      transformed.forEach(ruta => {
        const macroZona = ruta.macroZona || 'Sin zona'
        const color = ruta.color || '#148040'
        if (!colorCount[macroZona]) {
          colorCount[macroZona] = { count: 0, color: color }
        }
        colorCount[macroZona].count++
      })
      console.log('🎨 Colores asignados por macro zona:', colorCount)
      
      return transformed
    } catch (error) {
      console.error('Error en getAllRutas:', error)
      return []
    }
  },

  // Obtener una ruta por ID
  getRutaById: async (id) => {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error obteniendo ruta desde Supabase:', error)
        throw error
      }

      return transformRuta(data)
    } catch (error) {
      console.error('Error en getRutaById:', error)
      return null
    }
  },

  // Crear una nueva ruta
  createRuta: async (rutaData) => {
    try {
      // Intentar insertar con diferentes nombres de columnas
      const insertData = {
        title: rutaData.title,
        macro_zona: rutaData.macroZona,
        color: rutaData.color,
        schedule: rutaData.schedule,
        recorrido: rutaData.recorrido,
      }
      
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert(insertData)
        .select()
        .single()

      if (error) {
        console.error('Error creando ruta en Supabase:', error)
        throw error
      }

      return transformRuta(data)
    } catch (error) {
      console.error('Error en createRuta:', error)
      throw error
    }
  },

  // Actualizar una ruta
  updateRuta: async (id, rutaData) => {
    try {
      const updateData = {
        title: rutaData.title,
        macro_zona: rutaData.macroZona,
        color: rutaData.color,
        schedule: rutaData.schedule,
        recorrido: rutaData.recorrido,
      }
      
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error actualizando ruta en Supabase:', error)
        throw error
      }

      return transformRuta(data)
    } catch (error) {
      console.error('Error en updateRuta:', error)
      throw error
    }
  },

  // Eliminar una ruta
  deleteRuta: async (id) => {
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error eliminando ruta en Supabase:', error)
        throw error
      }

      return true
    } catch (error) {
      console.error('Error en deleteRuta:', error)
      throw error
    }
  },
}

export default supabase

