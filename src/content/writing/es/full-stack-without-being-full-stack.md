---
title: Qué significa ser full stack y por qué lo eres sin serlo
description: Nadie domina todas las capas, y nunca fue esa la idea. Qué debería significar la etiqueta, qué añade a "senior" y por qué la IA la hace más importante.
date: 2026-11-06
tags: [Ingeniería, Full stack, Carrera]
---

Cuando este mes añadí "full stack" a mi CV, dudé. Es verdad, pero la palabra significa cosas muy distintas según a quién preguntes. Para muchos reclutadores es React más Node. Para algunas empresas es una sola persona que hace diseño, backend, base de datos y el clúster de Kubernetes, a ser posible con sueldo de junior.

Así que te cuento qué quiero decir yo con ella, a partir de lo más full stack que he publicado este año.

## Una app, todas las capas

Aion 2 Companion es una app de Windows para jugadores de un juego online. Para sacarla escribí el código en Python que decodifica en tiempo real el tráfico de red del juego, la interfaz en Preact que corre dentro de WebView2, un lanzador en C de unas sesenta líneas para que Windows muestre la app con su propio nombre e icono, el instalador, un actualizador que comprueba un hash SHA-256 y un pipeline de CI que instala una versión antigua en un Windows real, la actualiza y comprueba que el progreso del jugador sigue ahí.

En la mayoría de esas capas no soy experto. Tengo mucha profundidad en arquitectura, backend e infraestructura. En frontend me defiendo bien, sin ser brillante. Nunca había escrito un lanzador para Windows. Y aun así la app funciona, porque podía seguir cada problema desde la captura de red hasta el píxel en pantalla y decidir qué hacer con él.

Esa es mi definición: **un ingeniero full stack es capaz de seguir un problema por todas las capas de un sistema y está dispuesto a publicar el arreglo en una capa que no es su especialidad.**

## Qué añade la etiqueta a "senior"

La objeción razonable es que "seguir un problema por todo el sistema" es simplemente lo que hace un buen senior. La mitad, sí. Muchos seniors son capaces de diagnosticar un fallo en otra capa y después pasárselo a otra persona.

Lo que añade la etiqueta es la segunda mitad: publicarlo tú. Escribir el CSS, la migración de SQL o el cambio de Terraform tú mismo, con un nivel decente, y responder de ello después. En un equipo pequeño, eso suele marcar la diferencia entre que algo salga esta semana o el mes que viene.

También reconozco que el mercado no usa la palabra así. La mayoría de ofertas quieren decir "frontend y backend en JavaScript". Cuando la uso yo, me refiero a la versión amplia, e intento dejarlo claro.

## Un poco de historia

El término se suele atribuir a Carlos Bueno, que entonces trabajaba en Facebook y escribió en 2010 sobre el "programador full stack": un generalista que entiende cada capa lo suficiente para ver cómo un cambio en una afecta a las demás. La idea se parece mucho al perfil "en forma de T", que viene como mínimo de finales de los años setenta y que más tarde popularizó Tim Brown en IDEO. Profundidad en una o dos áreas y amplitud suficiente para trabajar en el resto.

Lo que ha cambiado desde 2010 es el tamaño del stack. Hoy incluye además contenedores, infraestructura como código, CI, observabilidad, un proveedor cloud con cientos de servicios y, cada vez más, un modelo de lenguaje con sus propios costes y formas de fallar. Ser experto en todo eso no es realista. Ser capaz de trabajar en todo eso sigue siéndolo.

## Por qué la IA lo hace más importante

Esta web la he construido con un agente de código, y una parte es una escena WebGL escrita con shaders GLSL, una capa en la que nunca había trabajado. El agente la dejó bonita en una tarde. Luego pasé Lighthouse con un perfil de móvil y el rendimiento salió en 54. En dispositivos sin GPU de verdad, la escena bloqueaba el navegador unos cuatro segundos y medio.

El agente no lo vio, y mis ojos en un portátil rápido tampoco. Lo vio la medición. El arreglo tocó tres capas: una pequeña comprobación de la GPU antes de cargar siquiera la librería 3D, una versión estática de la escena en SVG generada al compilar y pasar la animación del titular a CSS puro para que no esperara a JavaScript. La puntuación subió a 97.

Ese es el patrón que veo ahora. Los agentes amplían tu alcance a capas que no conoces bien. Que ese alcance sea útil depende de entender cómo se conectan las capas, para darte cuenta de cuándo algo que funciona por separado rompe el sistema que tiene alrededor.

## Cómo respondo en una entrevista

Si alguien me pregunta si soy full stack, no le enumero frameworks. Le digo que donde más fuerte soy es en arquitectura, backend e infraestructura, que me siento cómodo publicando trabajo de frontend y que puedo seguir cualquier problema desde el navegador hasta la base de datos y el cloud, y arreglarlo o saber exactamente quién debe hacerlo. Y después le cuento lo del lanzador.

## Fuentes

- [Perfiles en forma de T (T-shaped skills), Wikipedia](https://en.wikipedia.org/wiki/T-shaped_skills)
