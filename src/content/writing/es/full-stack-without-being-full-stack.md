---
title: Qué significa ser full stack y por qué lo eres sin serlo
description: Ya nadie domina todas las capas, y nunca fue esa la idea. Una definición más útil de full stack, y por qué la IA la hace más importante.
date: 2026-11-05
draft: true
tags: [Ingeniería, Full stack, Carrera]
---

Hace poco puse "full stack" en mi CV y dudé antes de hacerlo. Es verdad, pero la palabra se ha estirado tanto que puede significar casi cualquier cosa. Para algunos reclutadores significa React y Node. Para otros, alguien que además hace el diseño, la base de datos y el clúster de Kubernetes, a ser posible con sueldo de junior.

Así que quiero explicar qué quiero decir cuando la uso, y por qué creo que la mayoría de buenos ingenieros son full stack de una forma que no tiene nada que ver con saberlo todo.

## De dónde viene la palabra

El término se suele atribuir a Carlos Bueno, ingeniero de Facebook, que escribió alrededor de 2010 un texto bastante conocido sobre "el full stack". La idea era sencilla. Facebook quería ingenieros capaces de trabajar en cualquier nivel del sistema, desde la interfaz hasta los servidores, y que entendieran cómo un cambio en una capa afectaba a las demás.

En aquel momento el stack era algo que se podía visualizar. Un navegador, un servidor web, una aplicación, una base de datos y una máquina. Conocerlo todo bien era difícil, pero posible.

## El stack no paró de crecer

Hoy, el stack con el que trabajo en un proyecto normal incluye el framework de frontend, una API, una o dos bases de datos, una cola, contenedores, infraestructura como código, pipelines de CI, observabilidad, un proveedor cloud con doscientos servicios y, cada vez más a menudo, un modelo de lenguaje con sus propios costes, latencias y formas de fallar.

Nadie es experto en todo eso. He diseñado y operado plataformas en AWS y Kubernetes, he construido frontends en React y backends en Node.js, he trabajado como SRE y he liderado equipos como CTO. Tengo mucha profundidad en arquitectura, backend e infraestructura. En frontend me defiendo bien, y no soy la persona que quieres eligiendo la tipografía. Si full stack significa "experto en todas las capas", no lo soy. Nadie lo es.

## Una definición más útil

La definición que me ha servido es esta: un ingeniero full stack es capaz de seguir un problema por todas las capas del sistema y hacerse cargo del resultado.

Cuando algo se rompe, no se para en el borde de su propio código. Sabe abrir la pestaña de red del navegador, leer los logs de la API, mirar el plan de una consulta, revisar el despliegue y encontrar dónde se ha roto de verdad. Puede que no arregle cada capa de la mejor forma posible, pero sabe lo suficiente para hacerle la pregunta correcta a la persona correcta, o para aplicar un arreglo sensato y avisar.

Se parece mucho a la vieja idea de los perfiles en forma de T, que viene como mínimo de 1991 y que popularizó después Tim Brown en IDEO. Profundidad en una o dos áreas y la amplitud suficiente para trabajar con todos los demás. Ser full stack es la forma de T aplicada a un sistema de software.

## Por qué lo eres sin serlo

De ahí sale el título de este artículo. La mayoría de ingenieros con experiencia que conozco dirían "yo no soy realmente full stack, soy más de backend". Y luego los ves depurar una incidencia en producción y pasan por CSS, SQL, DNS y un plan de Terraform sin pestañear.

Son full stack. Lo que pasa es que se miden con la vara equivocada. Se comparan con el especialista de cada capa y, claro, pierden esa comparación en todas las capas menos en la suya. Pero el valor nunca estuvo en ganarle al especialista. Está en ser quien ve el camino completo que recorre una petición y detecta dónde se tuerce.

Si sabes hacer eso, eres full stack, aunque nunca lo pongas en tu CV.

## La IA lo hace más importante

Los agentes de código cambian la ecuación de una forma curiosa. Hacen mucho más fácil trabajar en una capa que no conoces bien. Puedo pedirle a un agente una animación en CSS o una función en Rust y tener algo decente en minutos.

Lo que no te dan es el criterio para saber si está bien. Un agente amplía tu alcance. Tu comprensión del sistema decide si ese alcance es útil o peligroso. Los ingenieros que más partido le sacan a la IA son los que ya entienden cómo encajan las capas, porque detectan cuándo la respuesta del agente funciona por separado pero rompe algo dos capas más allá.

Por eso creo que ser full stack vale cada vez más. Menos como una lista de frameworks que conoces y más como entender el sistema completo lo bastante bien para dirigir el trabajo, lo escriba una persona o un agente.

## Cómo lo contaría en una entrevista

Si alguien me pregunta si soy full stack, no le enumero tecnologías. Le digo algo así: donde más fuerte soy es en arquitectura, backend e infraestructura, me siento cómodo construyendo y publicando frontends, y puedo seguir cualquier problema desde el navegador hasta la base de datos y el cloud, y arreglarlo o encontrar a quien deba hacerlo. Es una respuesta honesta y, en mi experiencia, es lo que de verdad te están preguntando.

## Fuentes

- [Perfiles en forma de T (T-shaped skills), Wikipedia](https://en.wikipedia.org/wiki/T-shaped_skills)
- [Encuesta de Stack Overflow 2025](https://survey.stackoverflow.co/2025/)
