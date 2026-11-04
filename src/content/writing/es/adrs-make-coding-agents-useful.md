---
title: El hábito más barato para que los agentes de código sirvan de verdad
description: Los registros de decisiones de arquitectura son una idea de 2011 que con la IA vale más que nunca. Por qué los agentes necesitan el "porqué" de tu código y cómo escribir ADRs que ayuden.
date: 2026-11-05
draft: true
tags: [Arquitectura, Claude Code, Flujo de trabajo]
---

Si miras los repositorios en los que he trabajado este año, encontrarás la misma carpeta en casi todos: `docs/adr`. Nueve registros en el juego de Roblox, ocho en la API de extractos bancarios y cinco en este portfolio. Es el hábito que recomendaría primero a cualquier equipo que empiece a trabajar con agentes de código, y no cuesta casi nada.

## Qué es un ADR

Un registro de decisión de arquitectura (ADR, por sus siglas en inglés) es un documento corto que recoge una decisión: qué se decidió, por qué y qué te cuesta. La idea es de Michael Nygard, que la propuso en un artículo de su blog en noviembre de 2011. Su formato sigue siendo el que usa casi todo el mundo.

- **Título**, con un número. "ADR 3. El servidor es el dueño de todo el estado del juego."
- **Estado**. Propuesto, aceptado o sustituido por otro.
- **Contexto**. La situación y las fuerzas en juego.
- **Decisión**. Qué vamos a hacer, en una o dos frases.
- **Consecuencias**. Qué se vuelve más fácil, qué se vuelve más difícil y qué estamos aceptando.

Viven en el repositorio, junto al código que describen, como ficheros Markdown normales. Ese detalle resultó importar mucho.

## Por qué los agentes los necesitan

Un agente de código puede leer todo tu código en segundos. Lo que no puede leer es el razonamiento que hay detrás. El código te dice qué hace el sistema. Casi nunca te dice por qué lo hace así, ni qué alternativas alguien ya probó y descartó.

Sin eso, un agente hace lo mismo que haría una persona nueva y muy lista. Ve algo que parece raro y lo "arregla". Ve un patrón y da por hecho que es casualidad. Propone la solución obvia que descartasteis hace seis meses por un buen motivo que nadie dejó por escrito.

Con los ADRs en el repo, el razonamiento está ahí mismo. En el juego, nuestro primer ADR separó el código en un núcleo reutilizable y una capa de juego. El segundo hizo al servidor dueño de todo el estado, para evitar trampas. Si un agente propone dejar que el cliente actualice directamente las monedas de un jugador, porque es más sencillo, la respuesta cabe en una línea: lee el ADR 2. Sin debate, y sin volver a explicar lo mismo en cada sesión.

Además, enlazo la carpeta de ADRs desde el `CLAUDE.md` del proyecto, el fichero que Claude Code lee primero. Así el agente sabe dónde están las decisiones antes de empezar a tocar nada.

## Cómo escribir ADRs que ayuden de verdad

Después de un año escribiéndolos con agentes y para agentes, hay algunas cosas que marcan la diferencia.

**Que sean cortos.** Una página como mucho. Si necesita más, probablemente son dos decisiones.

**Escribe las consecuencias con honestidad.** También las malas. "Esto hace más lento el desarrollo en local" es justo el tipo de frase que evita que alguien deshaga la decisión sin pensarlo.

**Una decisión por registro.** Tienta escribir "el documento de arquitectura". No lo hagas. Los registros pequeños son más fáciles de encontrar, enlazar y sustituir.

**Sustituye en vez de editar.** Cuando una decisión cambia, escribe un ADR nuevo que reemplace al anterior y marca el viejo como sustituido. La historia de por qué cambiaste de idea también es útil.

**Escríbelos cuando decides, no después.** El después nunca llega. El mejor momento es la misma pull request que introduce el cambio, y un agente puede redactarte la primera versión a partir de la discusión.

## Más allá de los agentes

Todo lo que acabo de contar ya era verdad antes de la IA. Los ADRs ayudan a que la gente nueva se incorpore a un equipo, a recordar por qué hiciste algo hace un año y a que las revisiones de arquitectura sean más rápidas. Los agentes solo han hecho muy visible, muy deprisa, lo que cuesta no tenerlos, porque un agente pregunta "por qué" cien veces al día sin decirlo.

Es el hábito más barato que conozco con este retorno. Una carpeta, una plantilla y cinco minutos por decisión.

## Fuentes

- [Michael Nygard: Documenting Architecture Decisions (2011)](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Martin Fowler: Architecture Decision Record](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html)
