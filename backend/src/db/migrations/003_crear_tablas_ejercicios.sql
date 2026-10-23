CREATE TABLE IF NOT EXISTS grupos_musculares (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(100) NOT NULL UNIQUE,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

 CREATE TABLE IF NOT EXISTS ejercicios (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(150) NOT NULL UNIQUE,
    "grupoMuscularId" UUID REFERENCES grupos_musculares("id") ON DELETE CASCADE,
    "nivelDificultad" VARCHAR(50) NOT NULL CHECK ("nivelDificultad" IN ('Principiante', 'Intermedio', 'Avanzado')),
    "tipoMovimiento" VARCHAR(50) NOT NULL,
    "requiereEquipo" BOOLEAN DEFAULT TRUE,
    "equipamientoNecesario" VARCHAR(100),
    "referenciaBibliografica" TEXT NOT NULL,
    "nivelEfectividad" VARCHAR(50) NOT NULL CHECK ("nivelEfectividad" IN ('Alto', 'Óptimo')),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);