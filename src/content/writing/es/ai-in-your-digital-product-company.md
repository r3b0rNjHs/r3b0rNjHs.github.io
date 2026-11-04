---
title: Hacia dónde nos lleva la IA y cómo usarla en una empresa de producto digital
description: Casi todas las empresas usan IA y pocas ven resultados. Qué separa a unas de otras, y un mapa práctico de dónde compensa hoy en un equipo de producto.
date: 2026-11-05
draft: true
tags: [IA, Producto, Estrategia]
---

Hay dos cifras a las que vuelvo siempre que me preguntan por la IA en una empresa.

La primera es del informe State of AI de McKinsey, publicado en noviembre de 2025: el 88% de las organizaciones ya usa IA en al menos un área de negocio, diez puntos más que el año anterior. La segunda es del mismo informe: solo el 39% puede señalar algún efecto en sus beneficios, y en la mayoría de los casos es inferior al 5%.

Casi todo el mundo la usa. Muy pocos le sacan mucho partido. Así que la pregunta interesante es qué hacen distinto las empresas de ese grupo pequeño.

## La trampa del piloto

Un informe del MIT de mediados de 2025 lo dijo de forma más directa. Según sus datos, alrededor del 95% de los pilotos de IA generativa que analizó no producían un retorno medible. La muestra era pequeña y la cifra se citó mucho más allá de lo que puede sostener, pero la explicación de los autores me parece acertada. El problema normalmente no era el modelo. Era cómo intentaban usarlo las empresas.

He visto el patrón. Alguien consigue acceso a un chatbot, monta una demo que impresiona a todo el mundo en una reunión y después no cambia nada. La demo no está conectada a un flujo de trabajo real, nadie se hace responsable y no hay forma de saber si sus respuestas son correctas. Seis meses después es una diapositiva en una presentación.

La investigación DORA de Google encontró algo parecido en equipos de software. La IA amplifica lo que ya existe. Los equipos con una arquitectura clara y feedback rápido van más rápido. Los que tienen sistemas desordenados se desordenan más. La IA no arregla tu forma de trabajar. La hace más visible.

## Dónde compensa en una empresa de producto

Estos son los sitios donde he visto que la IA se gana el sueldo en equipos de producto pequeños, la mayoría en proyectos que he construido yo.

**Dentro de ingeniería.** Los agentes de código son la ganancia más evidente, pero solo con una estructura alrededor. En el juego de Roblox que construí con otra persona, Claude Code trabajaba a diario con reglas del proyecto, comandos propios, hooks que bloquean pushes peligrosos y revisiones con IA en cada pull request. Sin esas protecciones habría sido un caos muy rápido.

**Soporte y comunidad.** Un asistente en Discord que responde a los jugadores con conocimiento generado a partir de los propios ficheros de configuración del juego. Dos niveles de modelo lo mantienen barato: uno pequeño para las preguntas habituales y otro más potente para las difíciles. La moderación la hacen expresiones regulares, gratis. Un estudio de dos personas no puede dedicar a nadie al soporte, y esto cubrió la mayor parte.

**Operaciones.** Tickets de soporte clasificados por IA y convertidos en issues de GitHub, investigados por un agente que deja sus conclusiones en un comentario y, si estamos de acuerdo, abre una pull request con el arreglo. Una persona sigue revisando cada cambio.

**Funcionalidades con comprobación.** Una API que lee extractos bancarios con un LLM y verifica cada resultado con aritmética normal. Esta es la parte en la que más insistiría. Las funcionalidades con IA funcionan cuando tienes una forma barata y fiable de saber si la respuesta es correcta.

**Contenido.** Borradores para redes sociales generados a partir de lo que de verdad se ha publicado esa semana. Alguien los sigue editando, pero nadie empieza con la página en blanco.

## Una lista antes de empezar

Si tuviera que ayudar a una empresa de producto a elegir su primer proyecto serio de IA, buscaría algo que cumpla todo esto.

1. **Un flujo de trabajo real y con volumen.** Algo que la gente ya hace muchas veces por semana, no una idea nueva que además de IA necesite que alguien la adopte.
2. **Un resultado que se pueda comprobar.** Un test, un total que tiene que cuadrar, un paso de aprobación humana. Si no puedes medir si está bien, no puedes mejorarlo.
3. **Una persona responsable.** Alguien que responda de que funcione dentro de seis meses, no un comité.
4. **Un coste por tarea.** Registra tokens, coste y latencia desde el primer día. Es la única forma de elegir modelos con criterio y de saber cuándo el barato es suficiente.
5. **Una persona en el circuito donde los errores salen caros.** Los borradores, las sugerencias y las pull requests son un buen sitio para empezar, porque alguien decide antes de que nada llegue a un cliente.

## Hacia dónde nos lleva

No sé dónde acaba esto, y desconfío de quien dice saberlo. Pero hay algunas cosas que ya me parecen claras.

Los agentes asumirán cadenas de trabajo cada vez más largas. El mismo informe de McKinsey dice que el 62% de las organizaciones al menos está experimentando con ellos y que el 23% ya los está escalando en alguna parte. Estándares abiertos como MCP hacen más fácil conectarlos con tus propias herramientas y datos.

Los equipos pequeños seguirán haciendo lo que antes necesitaba equipos grandes. Lo he vivido con un juego hecho por dos personas. Cambia lo que una startup necesita contratar y lo que una empresa más grande debería esperar de cada equipo.

Y el cuello de botella cambia de sitio. Cuando construir sale barato, lo escaso pasa a ser el criterio, el gusto, conocer a tu cliente y saber qué problemas merece la pena resolver. Es una buena noticia para las empresas de producto que ya cuidan esas cosas, y una mala para las que esperan que la IA piense por ellas.

## Fuentes

- [McKinsey: The state of AI in 2025: Agents, innovation, and transformation](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- [Fortune: el informe del MIT según el cual el 95% de los pilotos de IA generativa fracasan](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/)
- [Google: cómo usan la IA los desarrolladores, informe DORA 2025](https://blog.google/technology/developers/dora-report-2025/)
