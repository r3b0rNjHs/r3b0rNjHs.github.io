---
title: El hábito más barato para que los agentes de código sirvan de verdad
description: Los registros de decisiones de arquitectura son una idea de 2011 que con la IA vale más que nunca. Por qué los agentes necesitan el "porqué" de tu código y cómo escribo ADRs que ayuden.
date: 2026-11-05
draft: true
tags: [Arquitectura, Claude Code, Flujo de trabajo]
---

La mayoría de los repositorios en los que he trabajado este año tienen una carpeta de registros de decisiones de arquitectura. Nueve en el juego de Roblox, ocho en la API de extractos bancarios que estoy construyendo (en `docs/decisions`), siete en un ejercicio de backend y cinco en este portfolio. Si un equipo me pidiera un solo hábito antes de empezar a trabajar con agentes de código, sería este.

## Qué es un ADR

Un registro de decisión de arquitectura es un documento corto sobre una decisión: qué decidiste, por qué y qué te cuesta. El formato ligero que usan la mayoría de equipos viene de Michael Nygard, que lo describió en un post de noviembre de 2011. Sus apartados son:

- **Título**, con número. "ADR 2. Estado del juego controlado por el servidor."
- **Contexto**. La situación y las fuerzas en juego.
- **Decisión**. Qué vamos a hacer.
- **Estado**. Propuesto, aceptado o sustituido por uno posterior.
- **Consecuencias**. Qué se vuelve más fácil, qué más difícil y qué aceptamos.

Viven en el repositorio, junto al código que describen, en Markdown normal. Ese detalle resultó importar más de lo que esperaba.

## Por qué los agentes los necesitan

Un agente de código puede leerse un repositorio entero en segundos. Lo que no puede leer es el razonamiento que hay detrás. El código dice qué hace el sistema. Casi nunca dice por qué lo hace así, ni qué alternativas ya se probaron y se descartaron.

Sin eso, un agente se comporta como alguien listo en su primer día. Ve algo raro y lo ordena. Ve una restricción que parece accidental y la quita. Propone la solución obvia que se descartó hace meses por un motivo que nadie dejó escrito.

En el juego, el ADR 2 hace que el servidor sea el dueño de todo el estado, para que un cliente modificado no pueda darse monedas ni objetos. Es el tipo de regla que parece un estorbo cuando solo ves el código, porque dejar que el cliente actualice un valor directamente siempre es más sencillo. Con el registro en el repositorio, el razonamiento está a un fichero de distancia y no tengo que explicarlo otra vez al empezar cada sesión.

El `CLAUDE.md` del proyecto, el fichero que Claude Code lee primero, apunta a la carpeta de ADRs, y algunas de las reglas por carpeta del código de servidor mencionan registros concretos por su número. Así el agente encuentra las decisiones antes de cambiar nada, no después.

## Cómo los escribo

Después de un año escribiéndolos para personas y para agentes, hay unas pocas cosas que marcan la diferencia.

**Lo de cortos es relativo.** Nygard apuntaba a una o dos páginas. Los míos suelen ser más largos, el más largo del juego tiene unas 1.200 palabras, porque una decisión difícil tiene mucho contexto. Lo que sí mantengo estricto es que cada registro trate una sola decisión.

**Escribe las consecuencias con honestidad.** También las malas. "Esto hace más lentas las pruebas en local" es justo la frase que impide que alguien, o algo, deshaga la decisión sin pensar.

**Sustituye en lugar de reescribir.** Cuando una decisión cambia, escribe un registro nuevo y marca el antiguo como sustituido, para que sobreviva la historia de por qué cambiaste de opinión. Reconozco que no siempre lo hago. Cuando pasamos los datos de los jugadores a ProfileStore, marqué el ADR 5 como sustituido y añadí la actualización como una sección dentro del mismo fichero, en lugar de escribir el ADR 10. Funciona, porque el razonamiento sigue ahí, pero es más difícil de encontrar de lo que sería un registro nuevo.

**Escríbelos en la misma pull request que el cambio.** Luego nunca llega. Un agente puede redactar la primera versión a partir de la discusión, y yo la edito, porque el razonamiento tiene que ser mío.

## Más allá de los agentes

Nada de esto es nuevo. Los ADRs ayudaban a la gente a incorporarse a un equipo y a los equipos a recordar sus motivos mucho antes de la IA. Los agentes solo han hecho visible muy rápido lo que cuesta no tenerlos, porque un agente en la práctica pregunta "¿por qué está así?" cada vez que abre un fichero, aunque no lo diga.

Una carpeta, una plantilla y la disciplina de escribir uno cada vez que una decisión es difícil de deshacer. No conozco un hábito más barato con este retorno.

## Fuentes

- [Michael Nygard: Documenting Architecture Decisions (2011)](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Martin Fowler: Architecture Decision Record](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html)
