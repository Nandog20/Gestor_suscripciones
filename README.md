# 📱 Gestor de Suscripciones

> 🚧 **Proyecto en construcción**

Aplicación web para gestionar y llevar un control de **suscripciones compartidas**, permitiendo registrar personas, servicios y realizar un seguimiento de los pagos de cada integrante.

El proyecto está siendo desarrollado como una aplicación frontend utilizando **React, TypeScript y Tailwind CSS**.

## ✨ Objetivo

La idea del proyecto surge de una situación cotidiana: compartir servicios como Netflix, Spotify, Disney+, etc., con otras personas y necesitar una forma sencilla de saber:

* 👤 Qué personas participan en cada suscripción.
* 📋 Cuántas suscripciones tiene cada persona.
* 💰 Quién ya realizó su pago.
* 📅 Cuándo corresponde realizar el siguiente pago.
* ⏳ Qué pagos están pendientes.

El objetivo es crear una interfaz sencilla que permita consultar y actualizar esta información rápidamente.

## 🚧 Estado del proyecto

Actualmente el proyecto se encuentra **en desarrollo**.

### Implementado

* [x] Configuración inicial con React + TypeScript + Vite
* [x] Estructura inicial de componentes
* [x] Registro de personas
* [x] Gestión inicial de suscripciones
* [x] Manejo de estado con React
* [x] Formularios mediante componentes reutilizables

### En desarrollo

* [ ] Sistema completo de suscripciones
* [ ] Relación entre personas y suscripciones
* [ ] Seguimiento de pagos
* [ ] Cálculo de pagos pendientes
* [ ] Actualización automática según fechas
* [ ] Persistencia de información con `localStorage`
* [ ] Mejoras de interfaz y experiencia de usuario
* [ ] Diseño responsive

### Futuras mejoras

* [ ] Estadísticas de pagos
* [ ] Historial de pagos
* [ ] Mejor organización de la información
* [ ] Posible persistencia mediante backend

## 🛠️ Tecnologías

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **HTML `<dialog>`**
* **LocalStorage** *(en desarrollo)*

## 📂 Estructura del proyecto

```text
Gestor_suscripciones/
├── public/
├── src/
│   ├── components/
│   ├── types/
│   └── ...
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

> La estructura puede cambiar conforme avance el desarrollo del proyecto.

## 🚀 Instalación

Clona el repositorio:

```bash
git clone https://github.com/Nandog20/Gestor_suscripciones.git
```

Entra al proyecto:

```bash
cd Gestor_suscripciones
```

Instala las dependencias:

```bash
pnpm install
```

Inicia el servidor de desarrollo:

```bash
pnpm dev
```

Después abre la dirección indicada por Vite en tu navegador.

## 🎯 Aprendizajes

Este proyecto forma parte de mi práctica con React y TypeScript y está enfocado especialmente en trabajar conceptos como:

* Manejo de estado en React.
* Comunicación entre componentes.
* Props y tipado con TypeScript.
* Creación de componentes reutilizables.
* Manejo de formularios.
* Uso de elementos nativos como `<dialog>`.
* Organización de tipos y lógica de la aplicación.
* Persistencia de información en el navegador.

## 📌 Nota

Este proyecto continúa en desarrollo. Algunas funcionalidades, estructuras y decisiones de diseño pueden cambiar conforme avance su implementación.

```

Yo **sí dejaría el "🚧 Proyecto en construcción" arriba**. Para un repo de portafolio es mejor que alguien que lo vea entienda inmediatamente que no está viendo un producto terminado, en lugar de encontrarse con funcionalidades que todavía no existen.

Además, conforme vayas terminándolo, podemos ir cambiando el README para que pase de **"proyecto en construcción" → "proyecto terminado"**, añadiendo screenshots, funcionalidades reales, decisiones técnicas y quizá un diagrama sencillo de cómo manejas `Person`, `Subscription` y los pagos.
```
