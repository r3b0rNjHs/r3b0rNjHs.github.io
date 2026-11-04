---
title: MCP explicado para quien construye producto
description: Qué es el Model Context Protocol, por qué se extendió tan rápido, dónde lo usaría primero en una empresa de producto y qué hay que cerrar antes.
date: 2026-11-05
draft: true
tags: [MCP, Agentes de IA, Producto]
---

En Trenddi parte de mi trabajo fue meter integraciones MCP en la forma de trabajar del equipo de ingeniería. Desde entonces, la gente de producto me hace siempre la misma pregunta: ¿qué es MCP de verdad y debería importarnos?

Mi respuesta es que sí, con algunas condiciones. Te cuento por qué y cuáles son.

## El problema que resuelve

Un modelo de lenguaje, por sí solo, solo sabe lo que había en sus datos de entrenamiento y lo que le pones en el prompt. Para ser útil dentro de una empresa tiene que llegar a cosas: el gestor de tickets, la base de datos, la documentación, el estado del CI.

Hasta hace poco no había una forma común de hacerlo. Cada producto de IA se conectaba a cada herramienta a su manera. Si querías tu documentación interna en tres asistentes, construías tres integraciones, y cuando salía un asistente nuevo empezabas otra vez.

## Qué es MCP

El Model Context Protocol es un estándar abierto para conectar aplicaciones de IA con herramientas y datos. Anthropic lo publicó en noviembre de 2024.

Tiene dos lados. Un **servidor MCP** expone algo: herramientas que el modelo puede llamar (buscar tickets, lanzar una consulta, crear un borrador), recursos que puede leer (ficheros, registros) y prompts reutilizables. Un **cliente MCP** es la aplicación de IA que se conecta a esos servidores, como un asistente de chat, un IDE o un agente de código.

El servidor lo escribes una vez y cualquier cliente que hable MCP puede usarlo.

## Por qué se extendió tan rápido

En marzo de 2025 OpenAI anunció que soportaría MCP, empezando por su Agents SDK. Hoy lo soportan la mayoría de los grandes proveedores de IA y de herramientas para desarrolladores. En diciembre de 2025 Anthropic donó el protocolo a la Agentic AI Foundation, dentro de la Linux Foundation, así que ya no pertenece a una sola empresa.

Para un equipo de producto eso importa más que cualquier detalle técnico. Una integración que construyes hoy no queda atada a un proveedor. Si el año que viene cambias de modelo o de asistente, tus servidores se vienen contigo.

## Por dónde empezaría

Estos son los primeros usos que recomendaría a una empresa de producto, más o menos ordenados por lo fácil que es hacerlos seguros.

**Conocimiento interno.** Un servidor de solo lectura sobre tu documentación, tus registros de decisiones y tus runbooks, para que la gente obtenga respuestas que apuntan a la fuente real.

**Contexto de ingeniería.** Dejar que un agente de código lea tickets, logs y resultados del CI, para que trabaje con la misma información que buscaría un desarrollador.

**Soporte.** Acceso acotado y de solo lectura a cosas como el estado de un pedido, en lugar de que la gente pegue capturas en un chat.

**Tu propio producto.** Si tus clientes ya trabajan dentro de asistentes de IA, un servidor MCP puede ser una forma nueva de usar tu producto desde ahí. Es el que más cuidado necesita, porque ahora los usuarios están fuera de tu empresa.

## Qué hay que cerrar

MCP hace muy fácil darle a un modelo acceso a cosas. Esa es la idea, y también el riesgo. Estas son las reglas que pondría antes de que el primer servidor esté en marcha.

**Trata la salida de las herramientas como no fiable.** Si una herramienta devuelve texto que ha escrito otra persona, como un ticket, un correo o una página web, ese texto puede llevar instrucciones dirigidas al modelo. Es la inyección de prompts, y lo que hay que vigilar es un agente que lee un ticket malicioso y además tiene permisos de escritura.

**Instala solo servidores de confianza.** Las descripciones de las herramientas de un servidor van directas al contexto del modelo. Uno malicioso o descuidado puede dirigir al modelo igual de fácil que un ticket malicioso. Revisa los servidores de terceros como cualquier otra dependencia y fija sus versiones.

**Actúa como el usuario, no como administrador.** Cuando el servidor habla con un sistema real, usa las credenciales de cada persona, por ejemplo con OAuth, para que el agente nunca pueda ver más que quien pregunta.

**Empieza en solo lectura y pon a una persona delante de las escrituras.** Leer es mucho más fácil de hacer seguro que cambiar. Cuando añadas herramientas que cambian datos, envían mensajes o gastan dinero, exige un paso de aprobación.

**Registra cada llamada.** Qué herramienta, con qué entrada y para qué usuario. Lo necesitarás para depurar, y lo necesitarás la primera vez que algo salga mal.

## Prueba con el modelo que vas a usar

Esto no es exclusivo de MCP, pero es la lección que más tiempo me costó. En el asistente de Discord de nuestro juego, el nivel barato tenía que llamar a herramientas para consultar datos. Era function calling normal con el Vercel AI SDK, no MCP, pero el problema es el mismo. Gemini Flash a menudo se saltaba la herramienta y respondía de memoria. Llama 4 Scout la llamaba, pero con argumentos mal formados. Al final el nivel barato se quedó sin herramientas. Le puse el conocimiento que necesitaba directamente en el prompt, y solo el modelo más potente usa herramientas.

Una herramienta es tan fiable como el modelo que la llama. Antes de construir un servidor, comprueba que el modelo por el que vas a pagar sabe usarlo bien.

## Cuándo sobra

Si una aplicación necesita hablar con una API interna, una llamada a función normal en tu propio código es más sencilla y más fácil de asegurar. MCP compensa cuando varios clientes necesitan la misma capacidad, o cuando quieres que la gente use su propio asistente. Por debajo de eso, es una pieza más que se puede romper.

## Fuentes

- [Anthropic: presentación del Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [TechCrunch: OpenAI adopta el estándar de Anthropic para conectar modelos de IA con datos](https://techcrunch.com/2025/03/26/openai-adopts-rival-anthropics-standard-for-connecting-ai-models-to-data/)
- [Anthropic: donación del Model Context Protocol y creación de la Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
