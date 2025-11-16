-- Script SQL para crear la tabla de rutas en Supabase
-- Ejecuta este script en el Editor SQL de tu proyecto Supabase

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

-- Habilitar Row Level Security (RLS) - opcional pero recomendado
ALTER TABLE rutas ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (ajusta según tus necesidades de seguridad)
CREATE POLICY "Permitir lectura pública de rutas"
  ON rutas FOR SELECT
  USING (true);

-- Política para permitir inserción (solo si necesitas insertar desde la app)
-- CREATE POLICY "Permitir inserción de rutas"
--   ON rutas FOR INSERT
--   WITH CHECK (true);

-- Política para permitir actualización (solo si necesitas actualizar desde la app)
-- CREATE POLICY "Permitir actualización de rutas"
--   ON rutas FOR UPDATE
--   USING (true);

-- Ejemplo de inserción de una ruta (Macro Zona Verde - R-6)
-- Puedes copiar este formato para insertar más rutas
INSERT INTO rutas (title, macro_zona, color, schedule, recorrido) VALUES
(
  'R - 6',
  'Verde',
  '#148040',
  '{
    "Lunes": ["08:00"],
    "Martes": ["08:00", "15:00"],
    "Miércoles": ["08:00"],
    "Jueves": ["08:00", "15:00"],
    "Viernes": ["08:00"]
  }'::jsonb,
  '[
    [-17.740602348177436, -63.17170429236286],
    [-17.749013231930277, -63.17502915859223],
    [-17.749463295155415, -63.175404667854316]
  ]'::jsonb
) ON CONFLICT DO NOTHING;

