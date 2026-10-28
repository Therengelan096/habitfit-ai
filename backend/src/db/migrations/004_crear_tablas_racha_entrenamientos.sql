ALTER TABLE usuarios
  ADD COLUMN IF NOT EXISTS "rachaActual" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "escudosProtectores" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "ultimaEvaluacionRacha" DATE;

ALTER TABLE usuarios
  ADD COLUMN IF NOT EXISTS "activo" BOOLEAN NOT NULL DEFAULT TRUE;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'usuarios_racha_actual_no_negativa'
  ) THEN
    ALTER TABLE usuarios
      ADD CONSTRAINT usuarios_racha_actual_no_negativa
      CHECK ("rachaActual" >= 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'usuarios_escudos_protectores_no_negativos'
  ) THEN
    ALTER TABLE usuarios
      ADD CONSTRAINT usuarios_escudos_protectores_no_negativos
      CHECK ("escudosProtectores" >= 0);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS entrenamientos (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "usuarioId" UUID NOT NULL REFERENCES usuarios("id") ON DELETE CASCADE,
  "fecha" DATE NOT NULL,
  "completado" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT entrenamientos_usuario_fecha_unica UNIQUE ("usuarioId", "fecha")
);