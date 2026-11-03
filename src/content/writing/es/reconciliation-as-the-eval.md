---
title: La mejor evaluación para leer extractos bancarios es que cuadren
description: Cómo elegí el modelo para una API que convierte extractos bancarios en PDF a JSON, y por qué la conciliación resultó ser mejor métrica que contar movimientos.
date: 2026-11-03
tags: [LLMs, Evaluaciones, Producto]
---

Llevo un tiempo construyendo una API que recibe un extracto bancario en PDF y devuelve los movimientos en JSON. Está pensada para bancos de España y Latinoamérica, lo que significa fechas como `03/11`, importes como `1.234,56` y meses escritos en castellano. Un modelo de lenguaje lee el documento. Todo lo que viene después es código normal.

Lo interesante no fue la extracción en sí. Fue decidir qué modelo usar y saber si lo estaba haciendo bien.

## Contar movimientos no sirve

Mi primer impulso fue comparar cuántos movimientos encontraba cada modelo. Eso dice muy poco. Un modelo puede devolver el número correcto de filas con un importe mal, y ese extracto ya no le sirve a nadie que tenga que cuadrar cuentas.

Los extractos bancarios tienen algo que la mayoría de documentos no tiene: se supone que cuadran. El saldo inicial más todos los movimientos debería dar el saldo final, y el saldo acumulado debería avanzar bien de una fila a la siguiente. Si la extracción cuadra, la probabilidad de que esté mal es mínima. Los números no cierran por casualidad.

Así que esa pasó a ser la métrica: en extractos reales, ¿con qué frecuencia cuadra el resultado?

Además es el corazón del producto. El modelo devuelve datos estructurados y después un paso de conciliación comprueba las cuentas con aritmética normal y devuelve el resultado junto a los datos. Nadie tiene que fiarse del modelo a ciegas.

## Probar con documentos reales

Monté un conjunto de prueba con documentos públicos: extractos de ejemplo publicados por los propios bancos, extractos reales que aparecen en portales de transparencia y algunos escaneados para probar el camino de imagen.

La primera lección vino de las etiquetas. Muchos de esos ficheros no eran extractos. Había fichas de producto, certificados o una sola página con un resumen. Para esos casos, "cero movimientos" es la respuesta correcta, y mi primera clasificación los mezclaba con fallos de verdad. Antes de culpar al modelo, conviene revisar qué estás midiendo.

La segunda regla que me puse: los extractos sintéticos valen para entrenar, nunca para evaluar. Que un modelo lea bien los extractos que he generado yo no dice nada de cómo lee los que genera un banco.

## Haiku, Sonnet y Opus

Lancé el mismo prompt con tres modelos de Claude y medí el coste real por extracto a partir de los tokens consumidos.

Opus igualó a Sonnet en todos los documentos de muestra y costaba unas 1,8 veces más. Haiku salía unas tres veces más barato que Sonnet y muchas veces acertaba, pero en los extractos más difíciles se quedaba atrás. De seis documentos que Sonnet conseguía cuadrar, Haiku cuadró cuatro. Los otros dos tenían movimientos que no sumaban.

Sonnet es el modelo por defecto. Si el volumen crece, el siguiente paso lógico es empezar con Haiku y pasar a Sonnet solo cuando la conciliación falle. La misma comprobación que protege la calidad sirve también para repartir el coste.

## Detalles pequeños que cuestan dinero

Hubo dos problemas que solo aparecieron al procesar documentos reales.

El modo de salida estructurada rechazaba mi esquema por ser demasiado complejo. Lo cambié por forzar una única llamada a una herramienta con el esquema como entrada. La garantía es la misma y la validación es más permisiva.

Los extractos muy largos o escaneados a veces llegaban al límite de tokens de salida y devolvían medio JSON. Eso es lento, caro y el resultado no sirve. Ahora, si la respuesta se corta por el límite de tokens, la petición falla, la capa de reintentos vuelve a probar y al cliente no se le cobra. Los créditos solo se gastan cuando la extracción sale bien.

## Con qué me quedo

Busca la comprobación que te diga que la respuesta es correcta sin que una persona tenga que mirarla. En finanzas es la conciliación. En otros campos puede ser un esquema, un total o un viaje de ida y vuelta. Una vez la tienes, elegir modelo, repartir trabajo entre modelos y decidir cuándo reintentar pasan a ser preguntas mucho más fáciles.
