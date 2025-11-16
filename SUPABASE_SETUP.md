# Configuración de Supabase

Este proyecto está configurado para conectarse a Supabase y obtener las rutas desde la base de datos.

## Pasos para configurar Supabase

### 1. Crear un archivo `.env` en la raíz del proyecto

Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

### 2. Obtener las credenciales de Supabase

1. Ve a [https://supabase.com](https://supabase.com) e inicia sesión
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **Settings** > **API**
4. Copia los siguientes valores:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

### 3. Configurar las variables de entorno

Edita el archivo `.env` y reemplaza los valores:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 4. Crear la tabla de rutas en Supabase

Ejecuta este SQL en el editor SQL de Supabase:

```sql
-- Crear tabla de rutas
CREATE TABLE IF NOT EXISTS rutas (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  macro_zona TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#148040',
  schedule JSONB NOT NULL DEFAULT '{}',
  recorrido JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_rutas_macro_zona ON rutas(macro_zona);
CREATE INDEX IF NOT EXISTS idx_rutas_title ON rutas(title);

-- Habilitar Row Level Security (RLS) - opcional
ALTER TABLE rutas ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (ajusta según tus necesidades)
CREATE POLICY "Permitir lectura pública de rutas"
  ON rutas FOR SELECT
  USING (true);
```

### 5. Estructura de datos esperada

Cada ruta debe tener la siguiente estructura:

```json
{
  "id": 6862,
  "title": "R - 6",
  "macro_zona": "Verde",
  "color": "#148040",
  "schedule": {
    "Lunes": ["08:00"],
    "Martes": ["08:00", "15:00"],
    "Miércoles": ["08:00"],
    "Jueves": ["08:00", "15:00"],
    "Viernes": ["08:00"]
  },
  "recorrido": [
    [-17.740602348177436, -63.17170429236286],
    [-17.749013231930277, -63.17502915859223]
    // ... más coordenadas
  ]
}
```

### 6. Insertar datos de ejemplo

Puedes insertar rutas usando el panel de Supabase o ejecutando SQL:

```sql
INSERT INTO rutas (title, macro_zona, color, schedule, recorrido) VALUES
('R - 6', 'Verde', '#148040', 
 '{"Lunes": ["08:00"], "Martes": ["08:00", "15:00"], "Miércoles": ["08:00"], "Jueves": ["08:00", "15:00"], "Viernes": ["08:00"]}'::jsonb,
 '[[-17.740602348177436, -63.17170429236286], [-17.749013231930277, -63.17502915859223]]'::jsonb
);
```

## Uso

Una vez configurado, el componente `MapOSM` automáticamente:

1. Intentará cargar las rutas desde Supabase al montarse
2. Si Supabase no está configurado o hay un error, usará las rutas estáticas como fallback
3. Las rutas se actualizarán automáticamente cada minuto

## Notas

- Las variables de entorno deben comenzar con `VITE_` para que Vite las exponga al código del cliente
- El servicio de Supabase está en `src/services/supabase.js`
- El componente `MapOSM` está en `src/components/MapOSM.jsx`

