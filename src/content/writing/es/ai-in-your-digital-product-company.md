---
title: Hacia dónde nos lleva la IA y cómo usarla en una empresa de producto digital
description: Lo que un estudio de dos personas le dejó a la IA este año, lo que hizo falta para que funcionara y una lista para empresas de producto que quieren resultados y no demos.
date: 2026-11-05
draft: true
tags: [IA, Producto, Estrategia]
---

Este año cofundé un estudio de videojuegos pequeño. Dos personas construimos y lanzamos un juego de Roblox, Pet Defense, cuyas campañas previas al lanzamiento llegaron a 32.000 jugadores. Un equipo de ese tamaño no puede contratar soporte, comunidad, QA ni marketing, así que dejamos en manos de la IA todo lo que pudimos. Parte funcionó muy bien. Otra parte necesitó mucha más estructura de la que esperaba.

Esa experiencia marca lo que respondo cuando una empresa de producto me pregunta por dónde empezar con la IA. Este es el mapa, con lo que hizo funcionar cada pieza.

## Lo que le dejamos a la IA

**Escribir código, con reglas.** Claude Code trabajaba en el juego a diario, pero nunca sin estructura. El repositorio tiene reglas que se cargan por carpeta, así que el código de servidor siempre sigue las normas anti-trampas. Hay comandos propios para empezar y cerrar cada sesión siempre igual, un hook que bloquea cualquier push mientras el modo debug está activo y una revisión con IA en cada pull request antes de que la mire uno de nosotros. Sin eso, un agente en un código de 138.000 líneas habría sido rápido y peligroso.

**Responder a los jugadores.** Un asistente en Discord responde preguntas con conocimiento generado a partir de los propios ficheros de configuración del juego, así que siempre está al día de lo que hay publicado y no puede desvelar contenido que aún no ha salido. Dos niveles de modelo lo mantienen barato: uno pequeño y rápido para las preguntas habituales y Claude Sonnet para las difíciles. Cada llamada se registra con tokens, coste y latencia.

**Moderación, sin IA.** Los enlaces de estafa y los patrones tóxicos de siempre se detectan con expresiones regulares, sin coste de API. Merece la pena decirlo, porque a veces la mejor decisión sobre IA es no usarla.

**Triaje y arreglos.** Los tickets de soporte se clasifican y se convierten en issues de GitHub. Claude investiga cada issue y deja sus conclusiones en un comentario, sin tocar el código. Si estamos de acuerdo, al añadir una etiqueta un agente crea una rama, escribe el arreglo y abre una pull request, que revisa una persona como cualquier otra.

**Borradores de contenido.** Cada merge en main genera borradores de publicaciones sobre lo que ha cambiado. Una persona los edita antes de que salga nada.

## Qué hizo que funcionara

Mirando atrás, las piezas que funcionaron tenían tres cosas en común. Estaban pegadas a trabajo que ya hacíamos muchas veces por semana. Cada una tenía una forma de comprobar el resultado: una batería de tests, una revisión humana, una etiqueta que alguien tenía que añadir. Y cada una tenía un responsable claro, algo fácil en un equipo de dos pero que en una empresa más grande es lo primero que se pierde.

Coincide con lo que muestran los estudios grandes. El informe State of AI de McKinsey de noviembre de 2025 dice que el 88% de las organizaciones usa IA en al menos un área, pero solo el 39% nota algún efecto en los beneficios a nivel de empresa, y en la mayoría es inferior al 5%. Un informe del MIT muy citado, de mediados de 2025, afirmaba que el 95% de los pilotos de IA generativa no tenía un retorno medible. Su método era endeble y el titular fue mucho más allá de los datos, pero su diagnóstico me parece acertado: el problema rara vez era el modelo y casi siempre la forma de ponerlo a trabajar. La investigación DORA de Google describe la IA como un amplificador de lo que ya es un equipo, y es exactamente lo que vi. Nuestra arquitectura clara hizo útiles a los agentes. Una desordenada los habría convertido en un riesgo.

## Una lista antes de empezar

Si tuviera que ayudar a una empresa de producto a elegir su primer proyecto serio de IA, buscaría uno que cumpla estas cinco cosas.

1. **Un flujo de trabajo con volumen.** Algo que la gente ya hace muchas veces por semana. Una idea nueva necesita que alguien la adopte además de la IA, y eso son dos problemas a la vez.
2. **Un resultado que se pueda comprobar.** Un test, un total que tiene que cuadrar, un paso de aprobación. Si no sabes si está bien, no puedes mejorarlo.
3. **Un responsable.** Una persona que responda de ello dentro de seis meses, no un comité.
4. **Un coste por tarea.** Registra tokens, coste y latencia desde el primer día. Es lo que te permite elegir modelos con datos. En uno de mis proyectos, medir mostró que el modelo más caro no mejoraba nada a casi el doble de precio, así que no lo usamos.
5. **Una persona antes de cualquier cosa cara.** Los borradores, las sugerencias y las pull requests son buenos primeros objetivos, porque alguien decide antes de que un cliente vea nada.

## Hacia dónde va esto

Desconfío de las predicciones, así que me quedo con lo que ya he visto pasar.

Los agentes están asumiendo cadenas de trabajo más largas. Nuestro flujo de tickets va desde el mensaje de un jugador hasta una pull request revisada con solo dos decisiones humanas por medio. Hace un año no me habría fiado de algo así. Los datos de McKinsey dicen que el 62% de las organizaciones al menos está experimentando con agentes y que el 23% ya los está escalando en alguna parte.

Las conexiones se están estandarizando. Protocolos como MCP hacen que una integración que construyes para un asistente funcione con otros, y eso abarata mucho darles a los agentes acceso a tus propias herramientas.

Y el cuello de botella está cambiando de sitio. En nuestro estudio, escribir el código rara vez era lo que nos frenaba. Lo que nos frenaba era decidir qué necesitaba el juego y probar esas decisiones con jugadores reales. Espero que más empresas de producto descubran lo mismo: cuando construir sale barato, la ventaja es para los equipos que saben qué merece la pena construir.

## Fuentes

- [McKinsey: The state of AI in 2025: Agents, innovation, and transformation](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- [Fortune: el informe del MIT según el cual el 95% de los pilotos de IA generativa fracasan](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)
- [Google Cloud: presentación del informe DORA 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
