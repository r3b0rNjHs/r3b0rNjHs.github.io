---
title: Qué significa ser ingeniero de software en 2026
description: Casi todos los desarrolladores usan IA y la mayoría no se fía de ella. Qué queda del oficio cuando escribir código deja de ser la parte difícil.
date: 2026-11-05
draft: true
tags: [Ingeniería, IA, Carrera]
---

Cuando empecé en Lean Mind en 2018, ser un buen ingeniero era algo bastante concreto. Conocías bien tu lenguaje, escribías código limpio, lo testeabas y sabías explicarle tu diseño a otra persona. Escribir el código era una parte grande del trabajo, así que ser rápido y preciso importaba.

Ocho años después, casi todo el código que publico pasa antes por un agente. Y no soy un caso raro. En la encuesta de Stack Overflow de 2025, el 84% de los desarrolladores decía usar o tener pensado usar herramientas de IA, y alrededor de la mitad de los profesionales las usa a diario. El informe DORA de Google del mismo año sitúa el uso de IA en el trabajo en torno al 90%.

Así que la pregunta es razonable: si un modelo puede escribir el código, ¿para qué sirve exactamente un ingeniero?

## Todo el mundo la usa y casi nadie se fía

Las mismas encuestas que enseñan la adopción enseñan algo menos cómodo. En los datos de Stack Overflow, hay más desarrolladores que desconfían de la precisión de la IA (46%) que los que confían en ella (33%), y solo un 3% confía mucho. La frustración más habitual, elegida por el 66%, son las respuestas que están casi bien, pero no del todo.

Ese "casi bien" es toda la historia. El código que está claramente roto sale barato, porque falla enseguida. El código que parece correcto y tiene un fallo sutil sale caro, porque falla más tarde, en producción y delante de alguien.

También hay una diferencia entre lo rápidos que nos sentimos y lo rápidos que somos. En julio de 2025, METR hizo un ensayo aleatorizado con 16 desarrolladores open source con experiencia, trabajando en sus propios repositorios. Cuando podían usar IA, tardaron un 19% más en terminar sus tareas. Antes de empezar esperaban ir un 24% más rápido, y al terminar seguían creyendo que habían ido un 20% más rápido. Es un estudio pequeño, con límites claros, y las herramientas han mejorado desde entonces, pero lo que más se me quedó fue esa diferencia de percepción. Si no somos capaces de notarla, necesitamos algo más que nuestra sensación para medirla.

## En qué consiste ahora el trabajo

Tal como lo veo, el trabajo ha pasado de producir código a responder de lo que hace ese código. Siempre fueron el mismo trabajo, pero escribir ocupaba tanto tiempo que tapaba el resto. Ahora el resto es casi todo el día.

En la práctica eso significa varias cosas.

**Plantear bien el problema.** Un agente resuelve encantado el problema que le describes. Si describes el equivocado, obtienes una respuesta rápida y bien escrita a la pregunta equivocada. Saber qué construir, qué dejar fuera y qué significa "terminado" vale más que nunca, porque construir lo equivocado se ha abaratado y por eso lo hacemos más.

**Verificar.** Tests, evaluaciones, conciliaciones, una revisión humana. Cuando construí una API que lee extractos bancarios con un LLM, la pieza de código más importante no fue la extracción. Fue la aritmética aburrida que comprueba que las cifras cuadran, porque es lo que permite que alguien se fíe del resultado. Cualquier sistema que use IA necesita su propia versión de esa comprobación.

**Diseñar el sistema.** La conclusión principal de DORA en 2025 fue que la IA amplifica lo que ya es un equipo. Los equipos con arquitecturas poco acopladas y ciclos de feedback rápidos son los que más partido le sacan. Los que tienen sistemas enredados y procesos lentos apenas notan beneficio, o ganan inestabilidad. La arquitectura ya no es algo para más adelante. Es lo que decide si la IA ayuda o perjudica.

**Leer más de lo que escribes.** Hoy leo mucho más código que cuando era junior, y casi todo no lo he escrito yo. Saber leer un diff rápido y ver qué falla en él es ya una habilidad básica, no un extra de senior.

**Mantenerlo en marcha.** Publicar es más fácil que nunca. Mantener algo vivo, observable y barato de operar no lo es. Todo lo que aprendí como SRE importa más ahora, no menos.

## Lo que le digo a quien empieza

Me preguntan si sigue teniendo sentido aprender a programar. Creo que tiene más sentido que nunca, pero el motivo ha cambiado. Se aprende para saber cuándo el modelo se equivoca y para diseñar cosas fáciles de comprobar.

Así que aprende bien los fundamentos. Estructuras de datos, cómo viaja una petición por un sistema, cómo guarda de verdad las cosas una base de datos, cómo escribir un test que falle por el motivo correcto. Usa los agentes desde el primer día, pero oblígate a explicar cada cambio que hagan antes de aceptarlo. Si no sabes explicarlo, todavía no es tuyo.

## Mismo nombre, otro trabajo

Lo seguimos llamando ingeniería de software, y creo que el nombre encaja mejor ahora que antes. La ingeniería nunca consistió en poner ladrillos. Consiste en decidir qué construir, asegurarse de que aguanta y responder cuando no aguanta. La IA nos ha quitado buena parte de los ladrillos. El resto sigue siendo cosa nuestra.

## Fuentes

- [Encuesta de Stack Overflow 2025, sección de IA](https://survey.stackoverflow.co/2025/ai)
- [METR: impacto de la IA de principios de 2025 en la productividad de desarrolladores open source con experiencia](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [Google: cómo usan la IA los desarrolladores, informe DORA 2025](https://blog.google/technology/developers/dora-report-2025/)
