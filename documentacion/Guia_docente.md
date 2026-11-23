# Guía docente · Reto 10

**Grado:** Business Data Analytics. **Duración:** 180 minutos. **Punto de partida:** alumnado que puede editar un archivo de texto.  
**Resultado:** modificar una interfaz responsive, explicar una visualización de red y defender una propuesta de mejora para ProtoQSAR.

Descomprime el paquete completo. Abre `index.html` en Chrome o Edge y en un editor. Bootstrap, D3, Plotly.js y NVD3 ya están incluidos. La portada oficial y las referencias externas requieren conexión. Usa F12 para abrir DevTools. Conserva una copia de los archivos de partida.

## 0–60 min · HTML, CSS, Bootstrap y JavaScript

Alterna entre el navegador y el editor. Proyecta el ejercicio del laboratorio y utiliza [Manual_HTML_CSS_Bootstrap.md](Manual_HTML_CSS_Bootstrap.md) para ampliar teoría, consultas, ejemplos y prácticas.

El laboratorio enlaza el **ciclo de evolución web**, cuatro etapas del panel de seguimiento del Reto 10. Usa las tres primeras durante las demostraciones de los minutos 00–08, 20–35 y 35–48. En los minutos 55–60, puedes mostrar el filtro y el cambio de idioma de la edición bilingüe. La [Guía del ciclo](Guia_Ciclo_Web.md) propone pruebas comparables y cambios adicionales.

| Minutos | Demostración y práctica | Comprobación |
| --- | --- | --- |
| 00–08 | Abre la ficha. Ubica documento, metadatos, cabecera, navegación y contenido principal. Cambia un párrafo desde Elementos y recarga. | El alumnado identifica HTML fuente, DOM vivo y lugar donde guardar un cambio. |
| 08–20 | Recorre la jerarquía `h1 → h2 → h3`. Abre el ejemplo de listas. Pide que elijan entre `section`, `article` o `div` para tres casos. Selecciona el primer `li` y explica padre, hermanos y ancestros. | El padre es `ul`, hay un hermano `li` y la ficha `article` es un ancestro. |
| 20–35 | Usa el laboratorio de CSS para predecir el color del párrafo y del `span` en cada estado. Inspecciona la regla tachada y contrasta color, borde y padding. Prueba `.ficha li` frente a `.ficha > ul`. | Cada pareja explica una relación del DOM, una regla que compite y una propiedad que se hereda. |
| 35–48 | Compara el grid a 390, 768 y 1200 px. Prueba `col-12 col-md-6 col-lg-4`, `g-3` y `d-none d-md-block`. Abre el acordeón y rastrea el botón hasta el panel. | Una, dos y tres columnas por fila. El aviso aparece desde 768 px y `aria-expanded` cambia al abrir. |
| 48–55 | Cada pareja añade una tarjeta con lista y cambia la cuadrícula a dos columnas en escritorio. Consulta la documentación de Grid o Spacing para justificar la edición. | El encabezado conserva su nivel y las cuatro tarjetas forman dos columnas desde `md`. |
| 55–60 | Abre `paginas/laboratorio/01_dom.html`. Sigue `querySelector`, `querySelectorAll`, el evento `change`, `dataset`, `hidden` y `textContent`. Duplica la tarjeta de retención y recarga. | Todas = 4, Captación = 2 y Retención = 2. |

**Pregunta de salida.** ¿Qué tres cambios harías para convertir un listado denso en una ficha útil en móvil? Pide una modificación estructural, otra de presentación y otra de comportamiento, cada una con una comprobación.

## 60–120 min · Grafos y predicción en el Reto 10

El encargo describe una aplicación con HTML, Bootstrap y D3.js para comunicar la red y los resultados. El grafo de aula usa ocho nombres del contexto del reto y diez asociaciones sintéticas que permiten verificar cada paso a mano. El reto real debe trabajar con los datos asignados y su conjunto de prueba común. En el prototipo se enseñan caminos de un grafo no dirigido y conceptos de predicción con una heurística. El análisis de señalización dirigida y los modelos del reto requieren su propia evidencia y evaluación.

| Minutos | Demostración y práctica | Comprobación |
| --- | --- | --- |
| 60–70 | Abre `paginas/grafos/02_grafo.html`. Explica nodo, arista, grado, camino y vecindad. Localiza TLR2, NFKB1 e IL10. Abre P1. | IL10 aparece y tiene tres vecinos en el ejemplo. |
| 70–82 | Lee la representación en `recursos/scripts/02_datos_red.js` e inspecciona el SVG en DevTools. Abre P2, sigue dos caminos y explica por qué un camino de asociaciones requiere evidencia dirigida para interpretarse como señalización. | Encuentra TLR2–IRAK4–RELA–IL10 y TLR2–MYD88–NFKB1–RELA–IL10. |
| 82–92 | Selecciona IL10 con teclado. Compara Plotly.js y NVD3 con IL10 seleccionado. Arrastra el nodo y comprueba qué cambia. | El dibujo se reajusta y la vecindad conserva IL10RA, IL10RB y RELA. |
| 92–103 | Activa la retirada de NFKB1. Cuenta las aristas que desaparecen y comprueba un camino restante. Discute P3 y P4. | Salen tres aristas. TLR2 e IL10 siguen conectadas. IRAK4 tiene el mayor grado inicial, cuatro. |
| 103–114 | Usa el ranking por vecinos comunes. Calcula a mano los ejemplos indicados abajo y revela después las tres aristas de prueba sintética. | En el top 3 hay un acierto. Precisión@3 = 1/3 y recall@3 = 1/3. |
| 114–120 | Abre P5 y plantea el nodo nuevo conectado solo a IL10. Pide explicar el empate y qué datos harían falta para evaluar una recomendación del proyecto. | Distingue sugerencia por topología, predicción evaluada y evidencia experimental. |

### Qué representa cada fuente en el encargo

| Fuente | Interpretación para el diseño de la interfaz |
| --- | --- |
| STRING | Asociación con una puntuación de confianza. Al mostrarla, declara el tipo de red y el umbral usado. |
| BioGRID | Evidencia anotada con tipo de interacción, método y referencia. Distingue pares únicos de registros de evidencia y comprueba qué tipo de interacción se conserva. |
| SIGNOR | Relaciones causales curadas, con dirección, efecto y contexto según el registro. Mantén una capa dirigida independiente para explorar rutas. |
| UniProt / Human Protein Atlas | Atributos de nodos para caracterizar o contextualizar proteínas. La expresión en un tejido es evidencia contextual. |

Propuesta de interfaz para el trabajo de los alumnos: acompañar cada arista de su tipo, procedencia y, cuando corresponda, referencia. En una ruta dirigida, especificar qué filtros se aplicaron y qué justifica el sentido de las flechas.

### Vecinos comunes y evaluación

- **Modelo de aula.** Puntúa cada par sin arista de entrenamiento con `|N(u) ∩ N(v)|`. TLR2 y NFKB1 comparten MYD88 e IRAK4. MYD88 y RELA comparten IRAK4 y NFKB1. IRAK4 e IL10 comparten RELA.
- **Orden y empate.** Se ordena por puntuación decreciente y, en caso de empate, por ID de pareja. El top 3 es TLR2–NFKB1, MYD88–RELA y TLR2–RELA. Top 5 también incluye IRAK4–IL10 y NFKB1–IL10.
- **Prueba sintética.** Los pares reservados son TLR2–NFKB1, IRAK4–IL10 y RELA–IL10RA. Precisión@5 = 2/5 y recall@5 = 2/3. El ejemplo reserva pares explícitamente para la prueba. En el proyecto se sigue la partición común que corresponda y se documentan los pares sin evidencia conocida y el protocolo de evaluación.
- **Proteína nueva.** Si solo se conoce su enlace con IL10, la candidata comparte ese único vecino cuando está conectada con IL10. IL10RA, IL10RB y RELA empatan en el ejemplo. El ranking de aula permite explicar por qué una línea base topológica es limitada en este escenario. El proyecto requiere evaluación comparativa sobre sus datos.

### D3, Plotly.js y NVD3

Las tres vistas comparten `recursos/scripts/02_datos_red.js`. D3 v7 crea marcas SVG y actualiza coordenadas con una simulación. Plotly.js dibuja líneas y puntos a partir de coordenadas fijas y usa trazas `scatter`. NVD3 crea un grafo de fuerzas con `forceDirectedGraph()` y D3 v3. Las dos versiones de D3 están en documentos separados. Para ampliar, mueve la coordenada de IL10 y prueba un cambio de `.linkDist(99)` en NVD3. Describe qué cambia en la geometría y qué se conserva en los datos.

## 120–180 min · ProtoQSAR y el cliente digital

Este bloque es la fase final y el segundo eje del Reto 10, después del análisis del grafo. El encargo prioriza encaminar al público adecuado hacia ProtoPRED y captar contactos para servicios a medida. La [página del caso](../paginas/casos/03_protoqsar.html) reúne una auditoría basada en contenido y enlaces, una comparación por pestañas y un prototipo navegable con dos recorridos. La validación en aula distingue evidencia observada, hipótesis y resultados de las tareas.

| Minutos | Actividad | Evidencia |
| --- | --- | --- |
| 120–132 | Abre la portada oficial y localiza el acceso a la plataforma, el menú de servicios y el contacto. Compara 390 y 1200 px. | Anota el camino y el número de pasos para dos perfiles B2B. |
| 132–144 | Inspecciona un encabezado y un enlace. Cambia temporalmente un texto ambiguo por uno descriptivo. Comprueba el destino real. | Identifica el nodo, el selector de CSS y el destino. |
| 144-156 | Abre `paginas/casos/03_protoqsar.html`. Alterna **Recorrido actual** y **Propuesta**. Explica las llamadas a la acción, el ancla interna y el acceso a la plataforma. | Localiza ambos recorridos con teclado y en móvil. |
| 156–171 | Cada pareja modifica el prototipo. Formula una hipótesis vinculada a la tarea de un público B2B. | Reproduce el cambio y define una medida, por ejemplo éxito en encontrar una acción o primer clic correcto. |
| 171–180 | Intercambia el prototipo y prueba una tarea. Registra primer clic, éxito y tiempo. Expón qué evento de GA4 permitiría seguir el cambio. | Dos capturas a anchos distintos, una observación de uso y una propuesta de medición. |

**Ejemplo de hipótesis.** «Una consultora con una necesidad definida tarda menos en encontrar ProtoPRED si el acceso está en el primer bloque.» En una prueba con dos diseños, alterna el orden o reparte participantes entre variantes. Como plan de GA4, comprueba qué evento ya existe antes de plantear medir los clics salientes a ProtoPRED o los clics de contacto. Distingue un clic hacia la plataforma de una contratación efectiva. El paquete incluye un prototipo de aula y la actividad se puede hacer con una prueba de usuario sin acceso a la exportación de GA4.

**Extensión para el proyecto.** Aplica la misma ficha de auditoría a los cinco referentes del encargo. Contrasta los hallazgos con el extracto de GA4 del equipo y documenta qué eventos, parámetros y segmentos configurarías en GTM antes de evaluar el rediseño.

## Evaluación del taller

| Criterio | Puntos |
| --- | ---: |
| Estructura semántica y parentescos del DOM correctamente explicados | 2 |
| Herencia y cuadrícula justificadas mediante DevTools y varios anchos | 3 |
| Interpretación del grafo y evaluación correctas dentro del alcance del ejemplo | 3 |
| Propuesta para ProtoQSAR vinculada a una tarea con una comprobación reproducible | 2 |

## Referencias

- [Documentación del Reto 10, PPI TLR2 y cliente digital](https://chatgpt.com/library?file_id=libfile_67f97e504eac819190484441f9637e98&account_id=personal), pp. 3, 8–10 y 17–20.
- [MDN · DOM scripting](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting).
- [Bootstrap 5.3 · Grid](https://getbootstrap.com/docs/5.3/layout/grid/).
- [D3 · Simulación de fuerzas](https://d3js.org/d3-force/simulation).
- [Plotly.js · Referencia de atributos de scatter](https://plotly.github.io/schema-viewer/).
- [NVD3 · Catálogo de ejemplos, incluido forceDirected](https://nvd3-community.github.io/nvd3/examples/site.html).
- Liben-Nowell, D. y Kleinberg, J. (2007). *The link-prediction problem for social networks*. JASIST, 58(7), 1019–1031. [DOI 10.1002/asi.20591](https://doi.org/10.1002/asi.20591).
- [ProtoQSAR · Portada oficial](https://protoqsar.com/en/).
