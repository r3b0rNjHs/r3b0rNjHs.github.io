---
title: Por qué sigo escribiendo los tests primero aunque el código lo escriba un agente
description: Parecía que el TDD iba a ser una víctima de la IA. En mi experiencia es al revés. Los tests son cómo le dices a un agente lo que quieres, y cómo sabes que lo ha hecho.
date: 2026-11-05
draft: true
tags: [TDD, Claude Code, Ingeniería]
---

Aprendí TDD en mi primer trabajo, en 2018, y lo he usado desde entonces. Cuando los agentes de código empezaron a ser buenos, se repetía bastante la idea de que el TDD ya había cumplido su ciclo. Si el código lo escribe el agente, ¿para qué dedicar tiempo a escribir los tests primero?

Hoy escribo más tests que antes. Te cuento por qué.

## Un test es el prompt más claro que puedes escribir

Cuando le pido a un agente una funcionalidad en lenguaje normal, recibo su interpretación de lo que he dicho. A veces es exactamente lo que quería. Muchas veces es una lectura razonable de una frase ambigua.

Un test que falla no tiene ambigüedad. Dice: con esta entrada espero esta salida, y todavía no funciona. Cuando le doy a un agente un test en rojo y le pido que lo ponga en verde, la conversación sobre qué significa "terminado" ya está cerrada. El test es la especificación.

Kent Beck, el creador del TDD, escribió sobre esto en 2025. Distingue el "vibe coding", en el que dejas de preocuparte por el código y aceptas lo que salga, de lo que él llama augmented coding, en el que sigues preocupándote por el código, su complejidad, los tests y su cobertura. Yo estoy claramente en el segundo grupo, y son los tests los que lo hacen posible.

## La sensación es una mala métrica

En 2025, METR hizo un estudio con desarrolladores open source con experiencia. Con herramientas de IA tardaron un 19% más en sus tareas y, al terminar, creían que habían ido un 20% más rápido. Pienses lo que pienses de ese estudio en concreto, enseña lo poco fiable que es nuestra sensación de avance cuando un agente produce mucho código muy rápido.

A una batería de tests le da igual lo productivo que te sientas. Está en verde o no lo está.

La investigación DORA de Google encontró algo relacionado a nivel de equipo: los equipos con ciclos de feedback rápidos son los que más partido le sacan a la IA. Una batería de tests rápida y fiable es el ciclo de feedback más básico que existe.

## Cómo trabajo con un agente

Mi ciclo se parece mucho al TDD clásico, con el agente escribiendo casi todo.

1. **Escribo el test que falla**, o le pido al agente que lo escriba y lo leo con calma antes de seguir. Es el paso que nunca me salto, porque es donde decido cuál debe ser el comportamiento.
2. **El agente lo pone en verde.** En esta fase no me preocupa mucho cómo.
3. **Leo el diff.** No todo el código, solo lo que ha cambiado. Con el test en verde, reviso el diseño, no si funciona.
4. **Refactorizamos con los tests como red de seguridad.** Aquí los agentes son buenísimos. Pueden reestructurar código muy rápido y los tests nos avisan a los dos si algo se rompe.

## La trampa que hay que vigilar

Los agentes quieren terminar la tarea. Si un test es difícil de pasar, a veces el camino más fácil es cambiar el test. Una aserción más floja, un caso que se salta, un valor esperado que se actualiza discretamente para que coincida con el resultado incorrecto.

Por eso trato los cambios en los tests de forma distinta a los cambios en el código. Cuando un diff toca tests, leo esas líneas primero y por separado. Si el agente ha cambiado lo que espera un test, tiene que ser porque cambió el requisito, no porque el código no funcionaba.

## Tests más allá del código

La idea va más allá de los tests unitarios. En la API de extractos bancarios que construí, el "test" más importante se ejecuta en producción en cada petición: comprueba que el saldo inicial más todos los movimientos da el saldo final. En este portfolio hay tests que comprueban que cada texto existe en los dos idiomas, que todos los enlaces internos funcionan y que cada página pasa un análisis de accesibilidad. Uno incluso rompe el build si escribo una raya.

Todos hacen el mismo trabajo. Convierten algo que me importa en algo que una máquina puede comprobar, para que no tenga que acordarme yo, ni tampoco el agente.

## Entonces, ¿sigue mereciendo la pena?

Más que nunca. Cuando escribir código sale barato, lo caro es saber que el código está bien. Escribir los tests primero es la forma más barata que conozco de conseguirlo, y además son las mejores instrucciones que le puedes dar a un agente.

## Fuentes

- [Kent Beck: Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)
- [METR: impacto de la IA de principios de 2025 en la productividad de desarrolladores open source con experiencia](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [Google: cómo usan la IA los desarrolladores, informe DORA 2025](https://blog.google/technology/developers/dora-report-2025/)
