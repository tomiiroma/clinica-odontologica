# 🦷 Sistema de Gestión Clínica Odontológica

Este repositorio contiene el desarrollo del sistema propuesto para la gestión integral de una clínica odontológica multisedes, presentado como trabajo final de la materia **Diseño de Sistemas**.

## 📄 Propuesta oficial

📎 [Leer propuesta completa en PDF](https://drive.google.com/file/d/1xFYZ95Hyd-Zr9lETZQM6jIfXKS9aUCaC/view?usp=sharing)

## 🎯 Objetivo del sistema

Brindar una solución digital escalable y centralizada para la administración de turnos, pacientes, odontólogos, afiliaciones, planes, pagos y tratamientos en clínicas odontológicas con múltiples sedes.

---

## 🧱 Arquitectura del sistema

El diseño del sistema sigue una **arquitectura en tres capas**:

- **Presentación:** Interfaz amigable para pacientes, odontólogos y personal administrativo.
- **Lógica de Negocio:** Encapsula reglas del sistema y coordinación entre módulos.
- **Persistencia:** Base de datos relacional que almacena información de turnos, usuarios, pagos, tratamientos y más.

### Diagrama de Componentes y Despliegue
> Incluye componentes como:
- Gestión de Turnos
- Gestión de Afiliados
- Gestión de Odontólogos
- Gestión de Pagos
- Gestión de Tratamientos
- Administración de Sedes

---

## 🧠 Principios SOLID aplicados

1. **S - Responsabilidad Única:** Cada clase tiene una única función (Ej: `TurnoService`, `AfiliadoController`).
2. **O - Abierto/Cerrado:** Se pueden agregar nuevos tipos de planes o tratamientos sin modificar la lógica base.
3. **L - Sustitución de Liskov:** Subclases como `Afiliado` o `Odontólogo` respetan la interfaz de `Usuario`.
4. **I - Segregación de Interfaces:** Separación clara entre roles del sistema y sus responsabilidades.
5. **D - Inversión de Dependencias:** La lógica depende de abstracciones (interfaces), no implementaciones concretas.

---

## 🧩 Patrones de diseño utilizados

- **Singleton:** Para clases de configuración global (ej. acceso a base de datos).
- **Factory Method:** Creación flexible de usuarios, tratamientos, pagos.
- **Adapter:** Integración futura con sistemas de facturación o portales de obras sociales.
- **Composite:** Para estructuras jerárquicas como sedes y consultorios.
- **Observer:** Para notificar a pacientes sobre turnos y recordatorios.

---

## ⚙️ Módulos del sistema

| Módulo                   | Funcionalidad principal                                   |
|--------------------------|-----------------------------------------------------------|
| Turnos                   | Alta, modificación, cancelación, y control de asistencia  |
| Afiliados                | Registro, afiliación, gestión de planes                   |
| Odontólogos              | Registro y disponibilidad por sede                        |
| Pagos                    | Administración de pagos, planes y facturación             | 
| Tratamientos             | Alta de tratamientos y aplicación en turnos               |
| Administración de Sedes | Alta de sedes, consultorios y agendas                      |

---

## 🔐 Seguridad

- Accesos diferenciados por tipo de usuario (Admin, Afiliado, Odontólogo).
- Validación de datos, control de sesiones, y encriptación de contraseñas.
- Restricción de operaciones sensibles según permisos.

---

## 🧪 Casos de uso destacados

- Solicitar y agendar un turno.
- Cancelar un turno con restricciones por tiempo.
- Registrar un nuevo afiliado y asignarlo a un plan.
- Consultar historial de tratamientos y turnos.
- Registrar odontólogos y controlar sus agendas.

---

## 🧠 Optimización del diseño

- Se evitó la **deuda técnica** utilizando principios SOLID desde el diseño inicial.
- Refactorizaciones tempranas para evitar **antipatrones** como *God Object* o *Spaghetti Code*.
- Modularización para facilitar el mantenimiento y futuras extensiones del sistema.

---

## 👥 Integrantes del equipo

- Agustín Agüero
- Dante Pratt
- Daniel Fernández
- Fernando Blanco
- Tomás Roma
- Juan Cruz Vidal

**Materia:** Diseño de Sistemas  


---

## 📌 Notas

- Este sistema fue planteado con enfoque educativo, respetando estándares de ingeniería de software.
- El diseño contempla mejoras progresivas como integración con facturación electrónica o historial clínico interoperable.

