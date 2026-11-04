---
title: Por qué sigo escribiendo los tests primero aunque el código lo escriba un agente
description: Parecía que el TDD iba a ser una víctima de la IA. En mi experiencia es al revés. Los tests son cómo le dices a un agente lo que quieres, y cómo sabes que lo ha hecho.
date: 2026-11-05
draft: true
tags: [TDD, Claude Code, Ingeniería]
---

Este portfolio tiene un test unitario que falla si algún texto de la web contiene una raya. Parece una broma, pero lo escribí por un motivo real. Quería que los textos sonaran a mí, y yo no escribo rayas. Los modelos de lenguaje las usan constantemente. Decirle a un agente "por favor, no uses rayas" funciona un tiempo y luego deja de funcionar sin avisar. Un test que pone el CI en rojo no deja de funcionar.

Ese test pequeño resume cómo uso el TDD ahora que un agente escribe la mayor parte de mi código.

## Un test es menos ambiguo que una frase

Aprendí TDD en mi primer trabajo, en 2018. Cuando los agentes de código empezaron a ser buenos, oí más de una vez que el TDD ya no tenía sentido: si el código lo escribe el agente, ¿para qué escribir los tests primero?

Porque cuando describo una funcionalidad con palabras, obtengo la lectura que hace el agente de lo que he dicho. A menudo es justo lo que quería. A veces es una lectura razonable de una frase ambigua, y me entero más tarde.

Un test que falla es mucho menos ambiguo que una frase. Con esta entrada espero esta salida, y ahora mismo no funciona. Cuando le doy a un agente un test en rojo y le pido que lo haga pasar, casi toda la discusión sobre qué significa "terminado" ya está resuelta.

Kent Beck, que desarrolló y popularizó el TDD, escribió sobre esto en 2025. Distingue el vibe coding, en el que dejas de preocuparte por el código y aceptas lo que salga, del augmented coding, en el que sigues preocupándote por el código, su complejidad, los tests y su cobertura. Así es como quiero trabajar, y los tests son lo que lo hace posible.

## Cómo trabajo con un agente

Mi ciclo se parece mucho al TDD clásico, con el agente tecleando casi todo.

1. **Primero, el test que falla.** Lo escribo yo, o le pido al agente que lo escriba y lo leo con calma antes de seguir. Es el paso que nunca me salto, porque es donde decido cuál debe ser el comportamiento.
2. **El agente lo hace pasar.** En esta fase me importa poco cómo.
3. **Leo el diff.** Con el test en verde, dedico casi toda la revisión al diseño y a ver si el test cubre lo suficiente. Un test que pasa solo demuestra lo que comprueba.
4. **Refactorizamos con los tests como red.** Aquí los agentes son muy buenos. Reestructuran código rápido, y los tests nos avisan a los dos si algo se ha roto.

## La trampa que hay que vigilar

Un agente quiere terminar la tarea. Cuando un test cuesta de pasar, a veces lo más fácil es cambiar el test: una aserción más débil, un caso que se salta, un valor esperado que se actualiza para que coincida con la salida incorrecta.

Por eso leo los cambios en los tests aparte de los cambios en el código. Cuando un diff toca un test, miro esas líneas primero. Si el valor esperado ha cambiado, tiene que ser porque ha cambiado el requisito, no porque el código no funcionaba.

## Tests para cosas que no son código

La idea va más allá de los tests unitarios de funciones. La mayoría de los tests de este portfolio comprueban cosas que me importan y que no son lógica:

- que cada texto existe en inglés y en español;
- que nunca acaba un número de teléfono en los datos publicados;
- que cada enlace interno, imagen y ancla de la web generada lleva a algún sitio;
- que las páginas principales pasan un análisis automático de accesibilidad sin fallos graves;
- y el de las rayas.

Ninguno es difícil de escribir. Cada uno convierte algo que tendría que recordar en algo que una máquina comprueba en cada push. Eso me ayuda a mí, y ayuda todavía más al agente, porque el agente no recuerda nada entre una sesión y otra.

## Las instrucciones más baratas que puedo dar

Cuando empiezo una sesión hoy, no escribo instrucciones largas sobre lo que quiero. Escribo, o pido, el test que fallará hasta que exista la funcionalidad. Después el agente trabaja hasta que pasa y yo reviso lo que ha hecho. El test se queda en el repositorio, así que la siguiente sesión empieza con la misma regla ya puesta.

## Fuentes

- [Kent Beck: Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)
