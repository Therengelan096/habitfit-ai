CREATE TABLE IF NOT EXISTS logros (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "codigo" VARCHAR(50) NOT NULL UNIQUE,
  "nombre" VARCHAR(120) NOT NULL,
  "descripcion" VARCHAR(255) NOT NULL,
  "diasRacha" INTEGER NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT logros_dias_racha_positivos CHECK ("diasRacha" > 0)
);

INSERT INTO logros ("codigo", "nombre", "descripcion", "diasRacha")
VALUES
  ('racha_1', 'Primer paso', 'Completa tu primer día consecutivo.', 1),
  ('racha_7', 'Semana constante', 'Mantén una racha de siete días.', 7),
  ('racha_30', 'Hábito consolidado', 'Mantén una racha de treinta días.', 30),
  ('racha_90', 'Constancia extraordinaria', 'Mantén una racha de noventa días.', 90),
  ('racha_100', 'Centenario', 'Mantén una racha de cien días.', 100),
  ('racha_500', 'Disciplina legendaria', 'Mantén una racha de quinientos días.', 500),
  ('racha_1000', 'Maestro de la constancia', 'Mantén una racha de mil días.', 1000)
ON CONFLICT ("codigo") DO UPDATE SET
  "nombre" = EXCLUDED."nombre",
  "descripcion" = EXCLUDED."descripcion",
  "diasRacha" = EXCLUDED."diasRacha",
  "updatedAt" = CURRENT_TIMESTAMP;

CREATE TABLE IF NOT EXISTS usuarios_logros (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "usuarioId" UUID NOT NULL REFERENCES usuarios("id") ON DELETE CASCADE,
  "logroId" UUID NOT NULL REFERENCES logros("id") ON DELETE CASCADE,
  "otorgadoEn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT usuarios_logros_usuario_logro_unico UNIQUE ("usuarioId", "logroId")
);

