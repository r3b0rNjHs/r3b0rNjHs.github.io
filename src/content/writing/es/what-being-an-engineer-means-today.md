---
title: Qué significa ser ingeniero de software en 2026
description: Escribir código se ha abaratado. Saber que está bien, no. Lo que creo que es hoy este trabajo, después de construir con agentes a diario.
date: 2026-11-05
tags: [Ingeniería, IA, Carrera]
---

Este año hice una evaluación para una API que estoy construyendo y que lee extractos bancarios con un modelo de lenguaje. Comparé tres modelos de Claude con los mismos documentos. El más barato devolvía un JSON limpio y bien estructurado para cada extracto, y parecía perfecto. Sin embargo, en dos de los seis extractos que el modelo más potente resolvía bien, los movimientos del barato sencillamente no cuadraban.

Nada en la respuesta parecía incorrecto. Las fechas eran válidas, los importes eran razonables y el formato era justo el que había pedido. Si me di cuenta fue por unas pocas líneas de aritmética que comprueban que el saldo inicial más todos los movimientos da el saldo final.

Eso cambió cómo describo mi trabajo. Escribir código, o conseguir que un modelo lo escriba, ahora es barato. Lo caro es saber que el resultado está bien, y creo que ahí es donde un ingeniero se gana el sueldo en 2026.

## Los datos apuntan en la misma dirección

No soy el único que lo nota. En la encuesta de Stack Overflow de 2025, el 84% de los desarrolladores decía usar o tener pensado usar herramientas de IA, y alrededor de la mitad de los profesionales las usa a diario. En la misma encuesta hay más gente que desconfía de su precisión (46%) que gente que confía en ella (33%). La queja más habitual, elegida por dos de cada tres, son las respuestas que están casi bien, pero no del todo.

Nuestra sensación de velocidad tampoco es buena guía. En 2025, METR hizo un estudio aleatorizado con 16 desarrolladores open source con experiencia. Cuando podían usar IA tardaban un 19% más en sus tareas y, al terminar, creían haber ido un 20% más rápido. METR ha marcado después esos resultados como desactualizados y cree que con las herramientas actuales los desarrolladores probablemente van más rápido, algo que coincide con mi experiencia. Lo que se me quedó es lo lejos que pueden estar la sensación de ir rápido y la velocidad real. Hace falta algo distinto de la sensación para medirla.

## En qué consiste ahora el trabajo

Yo lo diría así: el trabajo ha pasado de producir código a responder de lo que hace ese código. Siempre fueron las dos cosas. Lo que pasa es que escribir ocupaba tanto tiempo que tapaba la segunda mitad.

En mi trabajo, esa segunda mitad tiene cuatro partes.

**Decidir qué construir.** Un agente resuelve el problema que le describes, rápido y con seguridad. Si describes el problema equivocado, obtienes una respuesta pulida a la pregunta equivocada. Construir se ha abaratado, así que casi todo el coste de construir lo que no toca está ahora en la decisión.

**Hacerlo comprobable.** En la API de extractos es la conciliación. En otros sistemas son tests, evaluaciones o una persona que aprueba el cambio. Mi regla es que cualquier cosa que produzca una IA necesita una comprobación que no dependa de la IA.

**Diseñar para que los cambios sean seguros.** En Pet Defense, el juego de Roblox que construí con otra persona, el servidor es el dueño de todo el estado del juego y el contenido vive en ficheros de configuración. Lo decidimos para evitar trampas. Además sirvió para que los cambios de los agentes no se extendieran, porque un error en una funcionalidad no podía corromper en silencio los datos de un jugador desde el cliente. El informe DORA de Google de 2025 vio lo mismo en muchos equipos: los sistemas poco acoplados y con feedback rápido sacan beneficios reales de la IA, y los muy acoplados y con procesos lentos sacan poco o nada.

**Mantenerlo en marcha.** Un año como SRE me enseñó que publicar es donde empieza el trabajo. Los agentes hacen que publicar sea más rápido, así que la parte del trabajo que consiste en operar, observar y pagar lo que has publicado no para de crecer.

## Si estás empezando

Aprende a programar bien. No escribirás la mayor parte del código, pero serás quien diga si está bien, y eso no se puede hacer con algo que no entiendes. Aprende cómo viaja una petición por un sistema, cómo guarda los datos una base de datos y cómo escribir un test que falle por el motivo correcto.

Usa agentes desde el primer día, con una regla: antes de aceptar un cambio, explícatelo a ti mismo. Si no puedes, sigue tirando del hilo hasta que puedas.

## Entonces, ¿a qué me dedico?

Cuando alguien me pregunta a qué me dedico ahora, mi respuesta sincera es que decido qué debe existir, me aseguro de que haya una forma de saber que funciona y respondo cuando no funciona. Buena parte del código que hay entre medias lo escribo con un agente.

## Fuentes

- [Encuesta de Stack Overflow 2025, sección de IA](https://survey.stackoverflow.co/2025/ai)
- [METR: impacto de la IA de principios de 2025 en desarrolladores open source con experiencia](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), y [la actualización de METR de febrero de 2026](https://metr.org/blog/2026-02-24-uplift-update/)
- [Google Cloud: presentación del informe DORA 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
