ALTER TABLE grupos_musculares
  ADD COLUMN IF NOT EXISTS "categoria" VARCHAR(50) DEFAULT 'principal' CHECK ("categoria" IN ('principal', 'avanzado', 'articulacion')),
  ADD COLUMN IF NOT EXISTS "padreId" UUID REFERENCES grupos_musculares("id") ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS fatiga_muscular (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "usuarioId" UUID NOT NULL REFERENCES usuarios("id") ON DELETE CASCADE,
  "grupoMuscularId" UUID NOT NULL REFERENCES grupos_musculares("id") ON DELETE CASCADE,
  "porcentajeFatiga" FLOAT NOT NULL DEFAULT 0.0 CHECK ("porcentajeFatiga" >= 0.0 AND "porcentajeFatiga" <= 100.0),
  "ultimaActualizacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fatiga_usuario_musculo_unica UNIQUE ("usuarioId", "grupoMuscularId")
);