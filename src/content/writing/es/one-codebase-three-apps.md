---
title: De artifact de Claude a app de escritorio y PWA con el mismo código
description: Cómo Naruto Online Companion pasó de ser un script personal a una app para Windows, Android, iPhone y Mac sin mantener tres versiones distintas.
date: 2026-11-03
tags: [Producto, Tauri, PWA]
---

Naruto Online Companion empezó como algo para mí. Quería saber qué equipos podía montar con los ninjas que tenía, y el conocimiento de la comunidad estaba repartido entre una wiki, una web de estadísticas y varios documentos compartidos. Así que escribí un pequeño script en Python que descargaba los datos públicos a SQLite y una herramienta de línea de comandos para consultarlos.

Hoy es una app que recomienda equipos para cada modo de juego, te dice qué conseguir después y en qué merece la pena invertir, y tiene fichas revisadas a mano de los 426 ninjas. Funciona en Windows como app de escritorio y en Android, iPhone y Mac como PWA instalable. Y sigue habiendo un único código.

## Primero, los datos

El pipeline es Python sin dependencias. El scraper de la web de estadísticas va a una petición por segundo, así que una actualización completa tarda unos diez minutos, y no pasa nada. Algunas páginas necesitan un navegador de verdad y para esas uso Playwright. Todo acaba en una base de datos SQLite que lee el resto del proyecto.

Algunas de las mejores fuentes son documentos escritos por la comunidad, y sus autores no quieren que se copien fuera de su Discord. La app los lee en una caché local que nunca se sube al repositorio ni se publica. Respetar eso era un requisito, no un detalle.

## Empezó como un artifact de Claude

La primera interfaz fue un artifact de Claude. Era la forma más rápida de tener una página con mis ninjas, mis equipos y mis intentos por modo, y podía guardar datos entre sesiones con el almacenamiento propio de los artifacts.

Cuando decidí convertirlo en una app de verdad, no lo reescribí. La página se carga igual en todas partes y comprueba dónde se está ejecutando. Si tiene disponible el almacenamiento de Claude, sincroniza con él. Si no, usa el almacenamiento local del navegador. Los cambios hechos en local siempre mandan hasta que se guardan, así que no se pierde nada aunque la conexión vaya y venga.

La app de escritorio inyecta un pequeño objeto `window.NOC_APP` al construirse. La página lo lee para mostrar la versión, ocultar las partes que solo tienen sentido dentro de Claude y activar las actualizaciones. Una clase CSS esconde los paneles que son solo para Claude. Ese es todo el código específico de cada plataforma.

## Tres canales y un solo proceso de publicación

El código vive en un repositorio privado. Dos repositorios públicos reciben lo que necesitan los usuarios: uno con los instaladores de Windows y otro que sirve la PWA desde GitHub Pages. El CI publica en los dos, junto con el README y las capturas, así que nunca copio ficheros a mano.

La app de Windows está hecha con Tauri 2. Se instala por usuario, sin permisos de administrador, y se actualiza sola con releases firmadas.

## Actualizar los datos sin reinstalar

La mayoría de cambios son datos, no código: un ninja nuevo, un cambio en el meta, un premio distinto esta semana. Obligar a reinstalar por eso no tendría sentido, así que el contenido se publica aparte como un paquete firmado.

La app comprueba la firma al descargar un paquete y otra vez cada vez que lo lee del disco. Un contenido que no sea nuestro nunca llega a la página. Además rechaza cualquier paquete más antiguo que el que ya tiene, aunque la firma sea buena. Si no, subir un paquete viejo por error haría retroceder todas las apps a la vez. Los paquetes se firman con la misma clave que los instaladores, y los tests comprueban que la clave pública de la app y la del actualizador coinciden.

## Tests que conocen el juego

Los tests no solo miran el código. Comprueban los datos de los equipos contra las reglas del juego y las mías: que no se repitan personajes entre los tres equipos de ranked, que cada equipo diga de dónde sale y que haya como mucho un par de ideas sin probar por modo. Las combinaciones sugeridas por IA siempre van marcadas como no probadas. También revisan la sintaxis del JavaScript de cada fichero generado y que el README público solo enlace a la página de releases.

## Lo que volvería a hacer

Empezar por los datos. Dejar que la primera versión sea lo más rápido de construir, y conservarla al crecer en vez de reescribirla. Y separar lo que cambia cada semana de lo que cambia cada mes, porque merecen procesos de publicación distintos.

Es un proyecto fan no oficial, sin relación con los editores del juego.
