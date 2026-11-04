---
title: MCP explicado para quien construye producto
description: Qué es el Model Context Protocol, por qué lo adoptaron todas las grandes empresas de IA en un año y cómo empezar a usarlo sin abrir un agujero de seguridad.
date: 2026-11-05
draft: true
tags: [MCP, Agentes de IA, Producto]
---

Buena parte de mi trabajo en Trenddi consistió en meter las integraciones MCP en la forma de trabajar del equipo de ingeniería. Desde entonces, la gente de producto me hace a menudo la misma pregunta: ¿qué es MCP de verdad y debería importarnos?

La respuesta corta es que sí. Esta es la algo más larga.

## El problema que resuelve

Un modelo de lenguaje por sí solo solo sabe lo que había en sus datos de entrenamiento y lo que le pones en el prompt. Para ser útil dentro de una empresa necesita llegar a cosas: el gestor de tickets, la base de datos, la documentación, el pipeline de despliegue, el CRM.

Antes de MCP, cada producto de IA se conectaba a cada herramienta a su manera. Si querías tu documentación interna disponible en tres asistentes distintos, montabas tres integraciones distintas. Si salía un asistente nuevo, vuelta a empezar.

## Qué es MCP

El Model Context Protocol es un estándar abierto para conectar aplicaciones de IA con herramientas y datos. Lo publicó Anthropic en noviembre de 2024.

Tiene dos lados. Un **servidor MCP** expone algo: un conjunto de herramientas que el modelo puede usar (buscar tickets, lanzar una consulta, crear un borrador), recursos que puede leer (ficheros, registros) y prompts reutilizables. Un **cliente MCP** es la aplicación de IA que se conecta a esos servidores, como un asistente de chat, un IDE o un agente de código.

El servidor lo escribes una vez. Cualquier cliente que hable MCP puede usarlo.

## Por qué se impuso tan rápido

Lo que me sorprendió fue la velocidad con la que lo adoptó el resto del sector. En marzo de 2025, OpenAI anunció que daría soporte a MCP, empezando por su Agents SDK y siguiendo por su app de escritorio y su API. Google, Microsoft y otros siguieron el mismo camino. En diciembre de 2025, Anthropic donó MCP a la nueva Agentic AI Foundation, dentro de la Linux Foundation y cofundada con OpenAI y Block, así que ya no lo controla una sola empresa.

Para un equipo de producto eso importa más que cualquier detalle técnico. Significa que una integración que construyas hoy no queda atada al asistente de un único proveedor. Si el año que viene cambias de modelo o de herramienta, tus servidores MCP se vienen contigo.

## Dónde es útil en una empresa de producto

Los mejores primeros usos que he visto son aburridos, en el buen sentido.

**Conocimiento interno.** Un servidor de solo lectura sobre tu documentación, tus ADRs y tus runbooks, para que la gente pregunte y reciba respuestas que citan la fuente real.

**Flujos de ingeniería.** Dejar que un agente de código lea tickets, logs o el estado del CI, para que trabaje con el mismo contexto que tendría un desarrollador.

**Soporte.** Darle a un asistente un acceso seguro y acotado al estado de los pedidos o a los datos de la cuenta, en lugar de pegar capturas en un chat.

**Tu propio producto.** Si tus clientes usan asistentes de IA, un servidor MCP puede convertirse en una forma nueva de usar tu producto desde donde ya trabajan.

## Con qué tener cuidado

MCP hace muy fácil darle a un modelo acceso a cosas. Esa es la gracia y también el riesgo.

**Empieza en solo lectura.** Es mucho más fácil hacer seguro leer datos que modificarlos. Añade herramientas de escritura después, una a una.

**Pon a una persona delante de las escrituras.** Para cualquier cosa que cambie datos, envíe un mensaje o gaste dinero, exige un paso de aprobación humana. Primero borradores y sugerencias, las acciones después.

**Acota el acceso.** Un servidor debe ver lo que necesita la tarea y nada más. Trátalo como cualquier otra cuenta de servicio.

**Registra cada llamada.** Qué herramienta, con qué datos y para qué usuario. Lo necesitarás para depurar, y lo necesitarás la primera vez que algo salga mal.

**Comprueba qué hace de verdad el modelo con las herramientas.** En uno de mis proyectos, un modelo pequeño y barato a veces se saltaba la herramienta y respondía de memoria. Acabé dejando a ese modelo sin herramientas y metiendo el conocimiento directamente en su prompt. Las herramientas son tan fiables como el modelo que las usa, así que prueba con el modelo que vayas a usar de verdad.

## ¿Debería importarte?

Si tu empresa construye o usa funcionalidades con IA, sí. MCP convierte las integraciones en algo que construyes una vez y reutilizas, y todo el sector se ha puesto de acuerdo en él. Eso no pasa a menudo y merece la pena aprovecharlo.

## Fuentes

- [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [TechCrunch: OpenAI adopta el estándar de Anthropic para conectar modelos de IA con datos](https://techcrunch.com/2025/03/26/openai-adopts-rival-anthropics-standard-for-connecting-ai-models-to-data/)
- [Anthropic: donación del Model Context Protocol y creación de la Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
