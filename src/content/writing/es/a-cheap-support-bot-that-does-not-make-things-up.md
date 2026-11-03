---
title: Un bot de soporte barato que no se inventa las respuestas
description: Lo que aprendí construyendo el asistente de Discord de Pet Defense, desde modelos pequeños que se saltan las herramientas hasta generar lo que sabe el bot a partir de la configuración del juego.
date: 2026-11-03
tags: [Agentes de IA, LLMs, Arquitectura]
---

Un juego con jugadores necesita a alguien respondiendo dudas en Discord. Cuando el estudio son dos personas, ese alguien suele ser el que esté despierto. Así que construí un asistente para la comunidad de Pet Defense y, alrededor, algunos agentes más para moderación, tickets de soporte y publicaciones en redes. Todo corre sobre una pequeña plataforma que escribí en TypeScript.

Lleva tiempo en producción. Estas son las decisiones que han aguantado.

## Dos modelos, y el barato hace casi todo el trabajo

La mayoría de mensajes en la comunidad de un juego son las mismas preguntas dichas de otra forma. Cómo consigo esta mascota, cómo desbloqueo ese bioma, qué incluye este pase. Pagar un modelo de primer nivel para responder eso es tirar el dinero.

La plataforma tiene dos niveles. Un modelo barato responde las preguntas habituales y Claude Sonnet se encarga de las difíciles. Cada llamada se guarda en SQLite con el modelo, los tokens, el coste estimado y la latencia, y un pequeño dashboard lo enseña todo. Sin ese registro estaría adivinando.

El nivel barato empezó con Gemini Flash. Ahora funciona con Llama 4 Scout a través de Groq, que es rápido y tiene una cuota diaria gratuita.

## Los modelos pequeños y las herramientas no siempre se llevan bien

El diseño original le daba al bot una herramienta de búsqueda sobre la base de conocimiento. Con el modelo barato funcionaba casi siempre. El problema era el resto de veces. A veces se saltaba la herramienta y respondía de memoria, y en un juego con criaturas inventadas eso significa inventarse las respuestas.

La solución fue menos ingeniosa que la idea original. El nivel barato no tiene herramientas. El conocimiento que necesita va directamente en el prompt de sistema. La guía del jugador y las preguntas frecuentes son lo bastante pequeñas para eso, y una respuesta que siempre se apoya en datos reales vale más que una arquitectura elegante que de vez en cuando falla.

## Lo que sabe el bot sale del juego, no de un documento

Un bot de soporte vale lo que vale lo que sabe, y la documentación se queda vieja en cuanto alguien publica una actualización. Por eso el bot no lee un documento. Lee el juego.

Un paso de sincronización analiza los ficheros de configuración Luau de Pet Defense (mascotas, biomas, artículos de la tienda, pases y monedas) y genera a partir de ellos la guía y las preguntas frecuentes. Un manifiesto indica qué campos pueden ver los jugadores, y los biomas que aún no han salido se excluyen automáticamente junto a sus mascotas, así que el bot no puede hacer spoilers. Cuando el juego cambia, la siguiente sincronización actualiza lo que sabe el bot. Nadie tiene que acordarse de editar un documento.

## No todo necesita un modelo

La moderación funciona con expresiones regulares. Los enlaces de estafa y los patrones tóxicos de siempre se detectan antes de que ningún modelo vea el mensaje, sin coste de API. Un modelo sería más lento, más caro y no mucho mejor para esto.

## Tickets que acaban en pull requests

Los tickets de soporte llegan por Ticket Tool, un bot que la comunidad ya usaba. El mío escucha cuando se crea un canal de ticket, lee el formulario y deja que la IA decida qué tipo de problema es. Los bugs se convierten en issues de GitHub automáticamente.

A partir de ahí, una investigación en dos pasos con Claude lee el código relevante y deja sus conclusiones en un comentario del issue. No toca nada. Si estamos de acuerdo con el diagnóstico, al añadir la etiqueta `claude-fix` un agente crea una rama, escribe el arreglo y abre una pull request. Esa pull request la revisa Claude y después uno de nosotros, como cualquier otra.

## Pensado para reutilizarse

El núcleo no sabe que está hablando con Discord. Los mensajes que entran pasan por un adaptador que los convierte a un formato común, y el orquestador solo ve eso. Cada proyecto tiene su carpeta con su configuración, sus prompts, su conocimiento y sus reglas de sincronización, y una sola instancia del bot reparte los mensajes según el servidor. Pet Defense fue el primer proyecto. No será el último.

## Lo que me diría al empezar

Mide el coste de cada llamada desde el primer día. No le des herramientas a un modelo que no las usa de forma fiable. Genera el conocimiento desde la fuente de verdad en vez de copiarlo. Y usa una expresión regular cuando con una expresión regular basta.
