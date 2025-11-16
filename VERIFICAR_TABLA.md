# Cómo verificar tu tabla en Supabase

## Opción 1: Desde el Editor SQL de Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard/project/lnstndalhxrtpsghxujm
2. Ve a **SQL Editor** (Editor SQL)
3. Ejecuta esta consulta para ver todas tus tablas:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

4. Luego ejecuta esta consulta para ver la estructura de tu tabla (reemplaza `rutas` con el nombre de tu tabla):

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'rutas'  -- Cambia 'rutas' por el nombre de tu tabla
ORDER BY ordinal_position;
```

5. Para ver una muestra de datos:

```sql
SELECT * FROM rutas LIMIT 1;  -- Cambia 'rutas' por el nombre de tu tabla
```

## Opción 2: Desde el Table Editor

1. Ve a **Table Editor** en tu dashboard de Supabase
2. Selecciona tu tabla
3. Verás todas las columnas y datos

## Opción 3: Desde la consola del navegador

1. Abre tu aplicación en el navegador
2. Presiona F12 para abrir las herramientas de desarrollador
3. Ve a la pestaña **Console**
4. Navega a la página de Mapas
5. Deberías ver logs como:
   - `🔍 Intentando obtener rutas de la tabla: rutas`
   - `✅ Se encontraron X rutas en Supabase`
   - `📋 Estructura de la primera ruta: {...}`

## Información que necesito

Por favor, comparte:

1. **Nombre de la tabla** (ej: `rutas`, `routes`, `recorridos`)
2. **Nombres de las columnas** que contienen:
   - El ID de la ruta
   - El nombre/título de la ruta
   - La macro zona
   - El color
   - Los horarios/schedule
   - Las coordenadas/recorrido

Ejemplo de lo que necesito:
```
Tabla: rutas
Columnas:
- id (bigint)
- nombre (text)  <- nombre de la ruta
- zona (text)    <- macro zona
- color_hex (text) <- color
- horarios (jsonb) <- schedule
- coordenadas (jsonb) <- recorrido
```

