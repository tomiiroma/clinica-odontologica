-- CreateTable
CREATE TABLE "PlanAfiliacion" (
    "id_plan" SERIAL NOT NULL,
    "tipo_plan" TEXT NOT NULL,
    "nombre_convenio" TEXT,
    "porcentaje_desc" DOUBLE PRECISION,

    CONSTRAINT "PlanAfiliacion_pkey" PRIMARY KEY ("id_plan")
);

-- CreateTable
CREATE TABLE "Afiliado" (
    "id_afiliado" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "sexo" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono_fijo" TEXT,
    "telefono_movil" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "id_plan" INTEGER,

    CONSTRAINT "Afiliado_pkey" PRIMARY KEY ("id_afiliado")
);

-- CreateTable
CREATE TABLE "HistoriaClinica" (
    "id_historia" SERIAL NOT NULL,
    "id_afiliado" INTEGER NOT NULL,
    "observaciones_generales" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoriaClinica_pkey" PRIMARY KEY ("id_historia")
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "id_especialidad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Especialidad_pkey" PRIMARY KEY ("id_especialidad")
);

-- CreateTable
CREATE TABLE "Odontologo" (
    "id_odontologo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "id_especialidad" INTEGER,

    CONSTRAINT "Odontologo_pkey" PRIMARY KEY ("id_odontologo")
);

-- CreateTable
CREATE TABLE "Sede" (
    "id_sede" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" TEXT NOT NULL,

    CONSTRAINT "Sede_pkey" PRIMARY KEY ("id_sede")
);

-- CreateTable
CREATE TABLE "Consultorio" (
    "id_consultorio" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "id_sede" INTEGER NOT NULL,

    CONSTRAINT "Consultorio_pkey" PRIMARY KEY ("id_consultorio")
);

-- CreateTable
CREATE TABLE "Equipamiento" (
    "id_equipamiento" SERIAL NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "descripcion" TEXT,
    "cantidad" INTEGER NOT NULL,
    "ultima_fecha_mantenimiento" TIMESTAMP(3),
    "id_consultorio" INTEGER NOT NULL,

    CONSTRAINT "Equipamiento_pkey" PRIMARY KEY ("id_equipamiento")
);

-- CreateTable
CREATE TABLE "HorarioAtencion" (
    "id_horario" SERIAL NOT NULL,
    "dia_semana" TEXT NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fin" TIMESTAMP(3) NOT NULL,
    "id_odontologo" INTEGER NOT NULL,
    "id_sede" INTEGER NOT NULL,

    CONSTRAINT "HorarioAtencion_pkey" PRIMARY KEY ("id_horario")
);

-- CreateTable
CREATE TABLE "Turno" (
    "id_turno" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "id_afiliado" INTEGER NOT NULL,
    "id_odontologo" INTEGER NOT NULL,
    "id_consultorio" INTEGER NOT NULL,
    "id_historia" INTEGER NOT NULL,

    CONSTRAINT "Turno_pkey" PRIMARY KEY ("id_turno")
);

-- CreateTable
CREATE TABLE "Tratamiento" (
    "id_tratamiento" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "costo" DOUBLE PRECISION NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "finalizado" BOOLEAN NOT NULL DEFAULT false,
    "id_odontologo" INTEGER NOT NULL,
    "id_historia" INTEGER NOT NULL,

    CONSTRAINT "Tratamiento_pkey" PRIMARY KEY ("id_tratamiento")
);

-- CreateTable
CREATE TABLE "Insumo" (
    "id_insumo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "Insumo_pkey" PRIMARY KEY ("id_insumo")
);

-- CreateTable
CREATE TABLE "TratamientoInsumo" (
    "id_tratamiento" INTEGER NOT NULL,
    "id_insumo" INTEGER NOT NULL,
    "cantidad_usada" INTEGER NOT NULL,

    CONSTRAINT "TratamientoInsumo_pkey" PRIMARY KEY ("id_tratamiento","id_insumo")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id_pago" SERIAL NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha_pago" TIMESTAMP(3) NOT NULL,
    "metodo_pago" TEXT NOT NULL,
    "id_afiliado" INTEGER NOT NULL,
    "id_tratamiento" INTEGER NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id_pago")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id_notificacion" SERIAL NOT NULL,
    "mensaje" TEXT NOT NULL,
    "fecha_envio" TIMESTAMP(3) NOT NULL,
    "id_afiliado" INTEGER NOT NULL,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id_notificacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "Afiliado_dni_key" ON "Afiliado"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "HistoriaClinica_id_afiliado_key" ON "HistoriaClinica"("id_afiliado");

-- CreateIndex
CREATE UNIQUE INDEX "Especialidad_nombre_key" ON "Especialidad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Odontologo_email_key" ON "Odontologo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Equipamiento_numero_serie_key" ON "Equipamiento"("numero_serie");

-- AddForeignKey
ALTER TABLE "Afiliado" ADD CONSTRAINT "Afiliado_id_plan_fkey" FOREIGN KEY ("id_plan") REFERENCES "PlanAfiliacion"("id_plan") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriaClinica" ADD CONSTRAINT "HistoriaClinica_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Afiliado"("id_afiliado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Odontologo" ADD CONSTRAINT "Odontologo_id_especialidad_fkey" FOREIGN KEY ("id_especialidad") REFERENCES "Especialidad"("id_especialidad") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultorio" ADD CONSTRAINT "Consultorio_id_sede_fkey" FOREIGN KEY ("id_sede") REFERENCES "Sede"("id_sede") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipamiento" ADD CONSTRAINT "Equipamiento_id_consultorio_fkey" FOREIGN KEY ("id_consultorio") REFERENCES "Consultorio"("id_consultorio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioAtencion" ADD CONSTRAINT "HorarioAtencion_id_odontologo_fkey" FOREIGN KEY ("id_odontologo") REFERENCES "Odontologo"("id_odontologo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioAtencion" ADD CONSTRAINT "HorarioAtencion_id_sede_fkey" FOREIGN KEY ("id_sede") REFERENCES "Sede"("id_sede") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Afiliado"("id_afiliado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_odontologo_fkey" FOREIGN KEY ("id_odontologo") REFERENCES "Odontologo"("id_odontologo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_consultorio_fkey" FOREIGN KEY ("id_consultorio") REFERENCES "Consultorio"("id_consultorio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_historia_fkey" FOREIGN KEY ("id_historia") REFERENCES "HistoriaClinica"("id_historia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tratamiento" ADD CONSTRAINT "Tratamiento_id_odontologo_fkey" FOREIGN KEY ("id_odontologo") REFERENCES "Odontologo"("id_odontologo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tratamiento" ADD CONSTRAINT "Tratamiento_id_historia_fkey" FOREIGN KEY ("id_historia") REFERENCES "HistoriaClinica"("id_historia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TratamientoInsumo" ADD CONSTRAINT "TratamientoInsumo_id_tratamiento_fkey" FOREIGN KEY ("id_tratamiento") REFERENCES "Tratamiento"("id_tratamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TratamientoInsumo" ADD CONSTRAINT "TratamientoInsumo_id_insumo_fkey" FOREIGN KEY ("id_insumo") REFERENCES "Insumo"("id_insumo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Afiliado"("id_afiliado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_id_tratamiento_fkey" FOREIGN KEY ("id_tratamiento") REFERENCES "Tratamiento"("id_tratamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_id_afiliado_fkey" FOREIGN KEY ("id_afiliado") REFERENCES "Afiliado"("id_afiliado") ON DELETE RESTRICT ON UPDATE CASCADE;
