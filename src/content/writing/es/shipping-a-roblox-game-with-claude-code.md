---
title: Cómo sacamos un juego de Roblox entre dos personas con Claude Code
description: La configuración del repositorio que nos permitió construir Pet Defense con un agente de IA trabajando a diario, sin que el código se nos fuera de las manos.
date: 2026-11-03
tags: [Claude Code, Videojuegos, Flujo de trabajo]
---

Entre enero y agosto de 2026 construimos [Pet Defense](https://www.roblox.com/games/127844763631870/PET-DEFENSE), un juego de rescate de mascotas para Roblox. Éramos dos. El juego tiene biomas, huevos, cuatro etapas de evolución, raids, expediciones, un modo roguelike, pase de temporada y una zona AFK que funciona como un place aparte. Al final el repo tenía unos 280 ficheros de Luau y 138.000 líneas de código.

A veces la gente da por hecho que el juego lo hizo la IA. No es así, o al menos no como suena. Lo que de verdad marcó la diferencia fue el trabajo que le dedicamos al repositorio para que Claude Code se comportara como un compañero razonable: que conociera las reglas, que siguiera la misma rutina en cada sesión y que no pudiera subir nada peligroso sin querer.

Esto es lo que montamos.

## Un repo que se explica solo

Lo primero que lee Claude es el `CLAUDE.md`. El nuestro describe la arquitectura, las convenciones de nombres y dónde está cada cosa. Ese fichero te lleva sorprendentemente lejos, pero tiene un problema: crece. Cuando ya habla del servidor, del cliente, de la GUI y de las configuraciones, la mayor parte es ruido para cualquier tarea concreta.

Así que dividimos las reglas por carpetas. Claude Code permite ficheros de reglas que solo se aplican a ciertas rutas, y tenemos uno para el código de servidor, otro para la GUI y otro para los ficheros de configuración. Las reglas de servidor solo se cargan cuando el cambio toca `src/server`. Son cortas y muy directas:

```md
- All state changes MUST happen on the server (anti-cheat). Never trust client data.
- Validate all inputs from client remotes: type check, range check, ownership check.
- Config-driven: game content lives in src/shared/Game/*Config.luau, logic lives in services.
```

Al lado de las reglas hay una carpeta `templates` con las tareas que repetimos constantemente: añadir una mascota, añadir una zona, añadir una funcionalidad o reequilibrar la economía. La plantilla de mascotas incluye los rangos de estadísticas por rareza y el formato del id (`{bioma}_{nombre}`). Añadir una especie nueva pasó de "a ver cómo hicimos la anterior" a rellenar cinco campos.

## Todas las sesiones empiezan y acaban igual

Escribimos dos comandos propios, `/project:start` y `/project:done`.

El de inicio lee el `TODO.md`, mira el estado de git y propone la tarea más prioritaria. Nuestro TODO tiene una pequeña convención: lo que está haciendo Claude va marcado con `@claude`, y la marca se quita al terminar. Con dos personas y un agente compartiendo la misma lista, es la forma más sencilla de saber quién está con qué.

El de cierre es la lista de comprobaciones que nadie quiere pasar a mano. Actualiza el TODO, pasa StyLua y Selene por los ficheros modificados y corrige lo que salga, revisa el flag de debug, guarda lo que merezca la pena recordar para la siguiente sesión y enseña el estado final de git. Ese último paso importa. El agente lo deja todo preparado, pero el commit lo decide uno de nosotros.

## Hooks para lo que no se puede olvidar

Nuestro panel de debug es estupendo en Studio y bastante vergonzoso en producción. Se controla con un único flag en `DebugConfig.luau`. En vez de fiarnos de la memoria de nadie, hay un hook que se ejecuta antes de cada `git push` y lo bloquea si el flag sigue activado:

```json
"PreToolUse": [{
  "matcher": "Bash(git push*)",
  "hooks": [{
    "type": "command",
    "command": "grep -q 'ENABLED = false' src/shared/Game/DebugConfig.luau || (echo 'BLOCKED: DebugConfig.ENABLED is not false' && exit 1)"
  }]
}]
```

También hay un hook al empezar la sesión que muestra el estado de git y el principio del TODO, así el contexto ya está ahí antes de escribir nada.

## Una arquitectura difícil de romper

Un agente sigue los patrones que ve, buenos o malos. Por eso dedicamos tiempo al principio a que los buenos fueran evidentes.

El código está dividido en `Core` y `Game`. En Core están las piezas que queremos reutilizar en el siguiente juego (datos, moneda, inventario, progresión, tienda y red). En Game, todo lo que es propio de Pet Defense. El servidor es el dueño de todo el estado. El contenido vive en ficheros de configuración, así que un bioma o un artículo nuevo es un cambio de datos, no de código. Los módulos están estrictamente tipados, con más de 90 tipos compartidos.

Cada una de esas decisiones está escrita en un ADR. Acabamos con nueve. Cuando una propuesta va en contra de alguno, normalmente basta con señalar el ADR. Sin ellos, la misma discusión volvería una y otra vez.

## Revisiones y la parte aburrida

Cada pull request pasa por una revisión de Claude mediante una GitHub Action antes de que la mire uno de nosotros. Detecta lo evidente y deja la revisión humana para las preguntas importantes.

Cuando algo se mergea en main, un workflow llama a nuestra propia plataforma de agentes y genera borradores para redes sociales a partir de los cambios. Los seguimos editando, pero partir de un borrador que sabe qué se ha publicado es mucho más rápido que empezar de cero.

El equilibrado del juego se hizo fuera de Roblox, con pequeños simuladores en Python para las curvas de poder y experiencia, junto a unos cuantos scripts para Roblox Open Cloud y un pipeline que genera las miniaturas de las mascotas.

## Con qué me quedo

Si mañana empezara otro juego, haría tres cosas desde el primer día. Escribir las decisiones, incluso las pequeñas. Convertir cada "que no se te olvide" en una comprobación que se ejecute sola. Y que el commit lo decida siempre una persona.

Las campañas previas al lanzamiento llegaron a 32.000 jugadores, algo que para un equipo de dos todavía nos parece un poco irreal. La mayor parte del mérito es del juego, pero estoy bastante seguro de que sin esta forma de trabajar no lo habríamos sacado en ocho meses.
