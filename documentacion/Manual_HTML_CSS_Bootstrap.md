# HTML, CSS y Bootstrap para modificar una web existente

Material de consulta y práctica · Business Data Analytics · Reto 10

Abre `index.html` en Chrome o Edge y en un editor. Las prácticas 1–3 corresponden a la primera hora. Las prácticas 4–6 permiten profundizar después. Trabaja sobre una copia y usa la vista de dispositivos en DevTools.

Para comparar el mismo sitio en cuatro etapas, abre «Ciclo de evolución web» en el laboratorio y sigue la [guía del panel de seguimiento](Guia_Ciclo_Web.md).

## 1. HTML y DOM

El HTML declara la estructura. El navegador analiza el archivo y construye el DOM. Además de los elementos, el DOM contiene nodos de texto y comentarios. `element.children` devuelve elementos hijos y `element.childNodes` incluye otros nodos, como saltos de línea del archivo. El navegador puede insertar elementos como `tbody` al analizar una tabla, y JavaScript puede modificar el DOM después de la carga.

| Elemento o atributo | Cuándo usarlo | Ejemplo del reto |
| --- | --- | --- |
| `<!doctype html>`, `html lang="es"` | Activar el modo estándar moderno e indicar el idioma. | Mejorar la interpretación del documento y su lectura asistida. |
| `head`, `meta charset`, `meta viewport`, `title` | Codificación, configuración del ancho y título de pestaña. | Conservar tildes y usar el ancho del dispositivo para el diseño responsive. |
| `header`, `nav`, `main`, `footer` | Introducción, navegación principal o local, contenido central y cierre. | Cabecera del proyecto, secciones del análisis y fuentes al pie. |
| `h1`, `h2`, `h3`, `h4` | Establecer la jerarquía de encabezados. En esta práctica hay un `h1` de página. | Red de TLR2 → Resultados → Caminos → Camino alternativo. |
| `section` | Agrupar un tema con encabezado propio. | Metodología, resultados o limitaciones. |
| `article` | Contenido con sentido propio que podría reutilizarse como unidad. | Ficha de una pregunta del cliente. |
| `div`, `span` | Contenedores genéricos para aplicar estilos o seleccionar con JS. | Una columna del panel y una etiqueta de estado dentro de una frase. |
| `p`, `strong`, `em` | Párrafo, importancia y énfasis. | Una limitación metodológica dentro de una explicación. |
| `ul`, `ol`, `li` | Listas sin orden significativo o pasos ordenados. | Fuentes y procedimiento de validación. Para anidar una lista, colócala dentro del `li` correspondiente. |
| `dl`, `dt`, `dd` | Términos acompañados de descripciones. | Glosario de nodo, arista y grado. |
| `a`, `button` | Navegar y ejecutar acciones, respectivamente. | Ir a los servicios con un enlace. Abrir un panel con un botón. |
| `figure`, `figcaption` | Agrupar un gráfico reutilizable con su pie explicativo. | Grafo acompañado de alcance, fuente y tipo de arista. |
| `table`, `caption`, `thead`, `tbody`, `th scope` | Datos tabulares y encabezados asociados a filas o columnas. | Ranking con proteína, grado y evidencia. |
| `label for`, `input id` | Asociar una etiqueta al control. | Selector o filtro con nombre legible por tecnologías de asistencia. |
| `id`, `class`, `data-*` | Identificador único, agrupación reutilizable y datos de la interfaz. | `id="rutas"`, `class="card"` y `data-area="retencion"`. |

### Leer el árbol

~~~html
<section id="resultados">
  <h2>Resultados</h2>
  <article class="ficha">
    <h3>Fuentes examinadas</h3>
    <div class="detalle">
      <ul>
        <li>Asociaciones</li>
        <li>Evidencias</li>
      </ul>
      <p>Alcance de la red</p>
    </div>
  </article>
</section>
~~~

- `section` es padre directo de `h2` y `article`, que son hermanos.
- El primer `li` es hijo de `ul` y descendiente de `div`, `article` y `section`. El segundo `li` es su hermano siguiente.
- El `p` y el `ul` tienen el mismo padre. Son hermanos pese a usar etiquetas distintas.
- Una relación DOM se deduce del árbol. Heredar una propiedad CSS es una operación que se evalúa después, propiedad por propiedad.

**Práctica 1.** Selecciona la primera entrada de la ficha en el laboratorio. Anticipa un padre, un hermano y un ancestro. En Elementos, inspecciona la entrada y usa `$0.parentElement`, `$0.nextElementSibling` y `$0.closest('article')` en la consola de Chrome. `$0` es el elemento que seleccionaste en DevTools. Si editas en DevTools, guarda después el cambio en el archivo fuente para que persista.

**Práctica 4.** Estructura una sección «Fuentes» con un `h2`, un `article` con `h3`, una lista de fuentes, una lista ordenada de comprobaciones y un glosario. Incluye un enlace interno `href="#fuentes"` y un destino `id="fuentes"`. Verifica los niveles usando el árbol de accesibilidad y comprueba el enlace con Tab y Enter.

## 2. CSS

Una regla tiene un selector y un bloque con declaraciones. En `article.ficha { padding: 1rem; }`, el selector combina etiqueta y clase en el mismo elemento. Usa clases reutilizables para los estilos y deja los ID para anclas, controles o identificadores cuando corresponda.

| Selector | Qué selecciona |
| --- | --- |
| `li`, `.ficha`, `#resultados` | Etiqueta, clase e ID. |
| `article.ficha` | Un `article` que tiene la clase `ficha`. |
| `[data-area="retencion"]` | Elementos cuyo atributo coincide exactamente. |
| `.ficha li` | Cualquier `li` descendiente de `.ficha`. |
| `.ficha > ul` | Un `ul` hijo directo de `.ficha`. Con el `div` intermedio del ejemplo, no hay coincidencia. |
| `h2 + article` | El `article` inmediatamente posterior a un `h2` del mismo padre. |
| `ul ~ p` | Los `p` hermanos posteriores a un `ul`. |
| `a:hover`, `button:focus-visible` | Elementos en un estado concreto. |
| `h2, h3` | Dos selectores agrupados que aplican las mismas declaraciones. |

### Herencia y cascada

1. **Cascada.** Entre las declaraciones aplicables a una propiedad del mismo elemento, el navegador resuelve origen, importancia y capas. Cuando esos factores coinciden, considera la especificidad. Si se mantiene el empate dentro de los ejemplos del taller, gana la regla escrita más tarde.
2. **Especificidad básica.** Cuenta primero IDs, luego clases, atributos y pseudoclases y finalmente etiquetas y pseudoelementos. `.ficha p` tiene `(0,1,1)`, `.ficha .nota` tiene `(0,2,0)` y `#resultados p` tiene `(1,0,1)`. Los combinadores como `>` no añaden especificidad.
3. **Herencia.** Si el elemento no recibe un valor propio para una propiedad heredable, recibe el valor calculado del padre. Ejemplos habituales: `color`, `font-family` y `line-height`. Entre las que normalmente no se heredan están `padding`, `margin`, `width`, `border` y `background-color`. Un fondo transparente deja ver el fondo del antecesor.
4. **Valores globales.** `inherit` pide el valor calculado del padre. `initial` pide el valor inicial definido en CSS. `unset` actúa como `inherit` en propiedades heredables y como `initial` en las demás.
5. **Modelo de caja.** Contenido, padding, borde y margen. Con `box-sizing: border-box`, el ancho declarado incluye padding y borde, y el margen queda fuera. Comprueba el diagrama de caja en la pestaña Calculado.

~~~css
.ficha { color: #155e4a; padding: 16px; }
.nota { color: #6940a5; }
.ficha .nota { color: #a13a18; }
.ficha .nota.heredada { color: inherit; }
@media (min-width: 992px) {
  .ficha { padding: 24px; }
}
~~~

**Práctica 2.** En el laboratorio, predice y después prueba las dos casillas. El párrafo empieza verde y el `span` tiene su propio color. Con la primera casilla cambia el párrafo. Con la segunda, el `span` también toma el color calculado del padre. El padding del `span` sigue siendo 0. Los controles usan `classList.toggle()` para modificar una clase en el DOM y `getComputedStyle()` para mostrar valores efectivos.

**Práctica 5.** En DevTools, desmarca la regla del `span` con mayor especificidad y explica cuál se aplica. Después desmarca su otra regla de color y observa la herencia. Añade dos reglas con idéntico selector y valores diferentes para comprobar el orden. Repite la prueba a 390 y 1200 px para ver cuándo entra la consulta de medios.

## 3. Bootstrap 5.3

La cuadrícula funciona mediante `container → row → columna`. Una fila dispone de doce unidades, por lo que `col-md-6` ocupa la mitad desde `md`. Los breakpoints se aplican desde el ancho indicado en adelante hasta que otra clase o regla los sustituye.

| Nivel | Mínimo | Ejemplo |
| --- | ---: | --- |
| Base | 0 px | `col-12` y `d-none` |
| `sm` | 576 px | `col-sm-6` |
| `md` | 768 px | `col-md-6` y `d-md-block` |
| `lg` | 992 px | `col-lg-4` |
| `xl` | 1200 px | `col-xl-3` |
| `xxl` | 1400 px | `col-xxl-3` |

~~~html
<div class="container py-4">
  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-4">
      <article class="card h-100">
        <div class="card-body">
          <h3 class="h5 card-title">Enlaces de la red</h3>
          <p class="card-text mb-0">Tipos y evidencias.</p>
        </div>
      </article>
    </div>
  </div>
</div>
~~~

| Familia | Ejemplos | Cómo comprobar |
| --- | --- | --- |
| Contenedores | `container`, `container-fluid` | Ancho máximo en los breakpoints frente a ancho fluido. |
| Separación | `mt-3`, `p-3`, `px-md-4`, `mx-auto`, `g-3` | Margen superior, relleno, margen horizontal automático y gutters. |
| Distribución | `d-flex flex-wrap gap-2 justify-content-between` | Caja flexible, salto de línea, hueco y reparto del espacio. |
| Visibilidad y tamaño | `d-none d-md-block`, `w-100`, `h-100` | Comprueba el estilo calculado. Conserva un acceso equivalente si ocultas información importante. |
| Texto y accesibilidad | `text-center`, `fw-semibold`, `visually-hidden`, `h5` | El aspecto puede variar con el HTML semántico intacto. |
| Componentes | `card`, `table`, `form-select`, `accordion` | Identifica su HTML mínimo, sus variantes y si usa JavaScript. |
| CSS propio | Una hoja cargada después de Bootstrap y variables CSS cuando están disponibles. | Inspecciona las reglas ganadoras. Algunas utilidades declaran `!important`, así que cargar la hoja al final puede ser insuficiente. Elige una utilidad adecuada o quita la clase conflictiva. |

**Práctica 3.** Abre el panel de Bootstrap. Comprueba una, dos y tres tarjetas por fila a 390, 768 y 1200 px. Duplica una columna, elimina `col-lg-4` en las cuatro y comprueba dos columnas en escritorio. Abre el acordeón y pulsa Tab y Enter. Observa `aria-expanded` y comprueba que `data-bs-target="#detalle-boots"` corresponde a un ID único.

**Práctica 6.** Crea una variante de la ficha con tarjetas y una tabla. Copia solo lo necesario del ejemplo oficial. Carga primero el CSS local de Bootstrap, después tu hoja, y añade `bootstrap.bundle.min.js` con `defer` si necesitas componentes interactivos. En DevTools, consulta Estilos para conocer el fichero de origen, Calculado para localizar el valor efectivo y el modo dispositivo para revisar el ancho. Prueba también con teclado.

## Consultas y recursos

| Si buscas… | Recurso |
| --- | --- |
| Elementos semánticos, jerarquía y estructura | [MDN · Structuring documents](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents) |
| La propiedad que se hereda y el valor que gana | [MDN · Inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Inheritance) y [Handling conflicts](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts) |
| Inspeccionar selectores, reglas y estilos calculados | [Chrome DevTools · CSS reference](https://developer.chrome.com/docs/devtools/css/reference) |
| Configuración, CSS y bundle de Bootstrap | [Getting started](https://getbootstrap.com/docs/5.3/getting-started/introduction/) |
| Saber cuándo saltan las columnas | [Grid](https://getbootstrap.com/docs/5.3/layout/grid/) y [Breakpoints](https://getbootstrap.com/docs/5.3/layout/breakpoints/) |
| Resolver espacio, orden o visibilidad | [Spacing](https://getbootstrap.com/docs/5.3/utilities/spacing/), [Display](https://getbootstrap.com/docs/5.3/utilities/display/) y [Flex](https://getbootstrap.com/docs/5.3/utilities/flex/) |
| Consultar ejemplos de componentes | [Cards](https://getbootstrap.com/docs/5.3/components/card/), [Accordion](https://getbootstrap.com/docs/5.3/components/accordion/) y [Forms](https://getbootstrap.com/docs/5.3/forms/overview/) |
| Explorar plantillas, iconos y utilidades generadas | [Examples](https://getbootstrap.com/docs/5.3/examples/), [Bootstrap Icons](https://icons.getbootstrap.com/) y [Utilities API](https://getbootstrap.com/docs/5.3/utilities/api/) |

Para buscar en la documentación de Bootstrap, fija la versión 5.3 y consulta el nombre del componente o de la familia. Prueba el ejemplo mínimo en una página aislada. Si una utilidad no surte efecto, localiza en Estilos qué regla gana y comprueba si el breakpoint y el elemento son los correctos.
