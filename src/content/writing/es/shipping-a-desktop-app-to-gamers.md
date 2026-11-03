---
title: Publicar una app de Windows para jugadores que solo quieren que funcione
description: El empaquetado, las actualizaciones y los tests detrás de Aion 2 Companion, una app de escritorio para gente que no quiere saber cómo funciona, y no tiene por qué.
date: 2026-11-03
tags: [Escritorio, Python, CI/CD]
---

Aion 2 Companion es una app de Windows para jugadores de Aion 2. Sigue las almas de mascotas en un mapa, muestra lo que vende el mercader de la Nube Negra, avisa antes de que aparezcan los jefes de campo y tiene un medidor de DPS en vivo. Funciona leyendo el tráfico que el juego ya envía a tu PC, igual que los medidores de DPS, y nunca toca el juego.

Es un proyecto fan no oficial y nació a partir del trabajo de otras personas. El overlay de mascotas del que salió lo hizo mytzuo, el medidor de DPS es una adaptación de A2Tools y la decodificación de paquetes parte de un rastreador de mascotas open source. Todo está acreditado en la app y en el repo, y el proyecto entero es GPL.

Programar las funcionalidades fue la parte divertida. Conseguir que llegara a los PCs de gente que nunca ha oído hablar de Python, y que siguiera funcionando con cada actualización, me hizo pensar bastante más.

## Sin Python, sin administrador y sin consola

Quien usa esta app quiere farmear mascotas, no instalar un runtime. Así que la app lleva dentro de su propia carpeta el Python embebido oficial para Windows. No se instala nada a nivel de sistema y el instalador se ejecuta solo para el usuario actual, sin permisos de administrador.

En el proyecto hay un pequeño trozo de C. Arrancar la app con `pythonw.exe` funcionaba, pero Windows la mostraba como Python en la barra de tareas y en el administrador de tareas, con el icono de Python. Un lanzador mínimo en C carga la DLL de Python dentro de su propio proceso, así Windows ve "Aion 2 Companion" con su propio icono. Son unas sesenta líneas y se compila en Linux con mingw-w64.

La interfaz es HTML, CSS y Preact sobre WebView2, que ya viene en cualquier Windows reciente. La interfaz no tiene paso de build. Python publica topics y cada página escucha los que necesita.

## Builds que se pueden reproducir

El repositorio solo guarda código. El Python embebido y cada librería se descargan al construir y se comprueban contra un SHA-256 fijo. Si una descarga no coincide, el build se para. El mismo script funciona en Windows, Linux o macOS y genera un ZIP portable con un manifiesto de hashes de todos los ficheros.

Publicar una versión nueva consiste en cambiar el número en `version.py` y hacer merge en main. El CI ve que esa versión aún no tiene release, lo construye todo y lo publica.

## Actualizaciones que no rompen nada

Cuando sale una versión nueva aparece un botón de actualizar en la barra de título. Con un clic descarga el instalador, comprueba su SHA-256, lo instala y vuelve a abrir la app. El progreso vive en una carpeta de datos aparte que las actualizaciones, e incluso las desinstalaciones, no tocan.

Eso último es fácil de prometer y fácil de romper, así que el CI lo prueba en un Windows real antes de publicar nada. Instala una versión antigua, la 3.1, instala la nueva encima en modo silencioso, abre la app desde el acceso directo del menú Inicio, ejecuta un autotest, comprueba que el progreso guardado sigue ahí después de actualizar y desinstala conservando ese progreso. Si falla cualquiera de esos pasos, no se publica nada.

## Cada pantalla, probada y fotografiada

Los tests de interfaz abren cada página en Chromium con Playwright, con datos de prueba de personajes inventados, y la recorren. Con un parámetro, la misma ejecución guarda una captura de cada página. Esas son las capturas del README público y de esta web. Nunca están desactualizadas porque salen del mismo código que se publica.

## Leer datos que no controlas

El protocolo del juego no está documentado y cambia. La decodificación es conservadora a propósito. Los campos que la app no entiende se guardan tal cual, sin adivinar qué significan, y los mensajes que no encajan con lo esperado se descartan en vez de leerse a medias. Cada cambio en el decodificador se contrasta con capturas reales antes de publicarse.

Cuando los números de la app y los del juego no coinciden, la guía de problemas lo dice sin rodeos: vuelve a entrar al mundo, el juego siempre tiene razón. Es una frase pequeña, pero pone las expectativas en su sitio y ahorra muchos mensajes de soporte.

## Con qué me quedo para cualquier app de escritorio

Lleva tu propio runtime. Fija cada descarga con un hash. Haz que publicar sea cambiar una línea. Y prueba la actualización, no solo la instalación limpia, porque ahí es donde están los usuarios de verdad.
