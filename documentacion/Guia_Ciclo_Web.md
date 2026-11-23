# Ciclo de evolución web · Seguimiento del Reto 10

Abre las tres páginas en el navegador y en un editor. Usa la cabecera para cambiar de etapa. Conserva una copia inicial de la carpeta. Cada página HTML es editable por sí misma.

| Etapa | Archivos y cambios |
| --- | --- |
| [1. Solo HTML5](../paginas/laboratorio/01_ciclo_1_html.html) | Un archivo HTML con la estructura, el contenido y los controles nativos. Puedes seguir anclas, abrir `details` y enviar el formulario local. |
| [2. HTML5 + CSS3](../paginas/laboratorio/01_ciclo_2_css.html) | `recursos/estilos/01_ciclo_css.css` añade jerarquía visual, color, modelo de caja, cuadrícula y navegación responsive mediante CSS escrito para el ejemplo. |
| [3. HTML5 + CSS3 + Bootstrap](../paginas/laboratorio/01_ciclo_3_bootstrap.html) | Bootstrap 5.3.8 proporciona la cuadrícula, tarjetas, insignias, controles y menú colapsable. `recursos/estilos/01_ciclo_bootstrap.css` personaliza la apariencia y `recursos/bibliotecas/` contiene la biblioteca y los SVG de Bootstrap Icons. |
| [4. Edición moderna bilingüe](../paginas/laboratorio/01_ciclo_4_avanzado.html) | Banner con carrusel automático, navegación por versiones, selector ES/EN, filtro de fases y resumen del formulario. |

## 1. Localiza la estructura y sus relaciones

En la página de HTML5, usa F12 → Elementos. Abre la sección «Fases del trabajo» y busca la primera tarjeta. Su estructura se puede leer así.

~~~html
<section id="fases">
  <h2>Fases del trabajo</h2>
  <div class="tarjetas">
    <div class="columna">
      <article class="ficha">
        <div class="ficha-cuerpo">
          <h3>Preparación de datos</h3>
          <p>Identifica las fuentes...</p>
          <ul>
            <li>Identificadores únicos</li>
            <li>Tipos de evidencia
              <ul><li>Fuente</li><li>Fecha de revisión</li></ul>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</section>
~~~

El `h2` y el bloque de tarjetas son hermanos en el DOM. El `article` pertenece a una columna, y el `h3` está dentro del cuerpo de ese artículo. Las opciones «Fuente» y «Fecha de revisión» son descendientes del `ul` exterior y son hijas directas de la lista interior. En las otras tarjetas, una lista `ol` describe pasos y un `dl` asocia términos con descripciones.

Busca también `header`, `nav`, `main`, `aside` y `footer`. La tabla usa un `caption` y encabezados de fila y columna. La figura contiene un `progress` con etiqueta y un `figcaption`. El formulario agrupa controles con `fieldset` y `legend`. Prueba el envío sin seleccionar un apartado y luego selecciona «Exploración del grafo» y marca la casilla. La validación y el envío por GET son nativos. La segunda prueba produce `?apartado=grafo&movil=si#revision` en la URL.

## 2. Sigue el origen de las reglas de CSS

En la etapa CSS, selecciona el párrafo de «Nota de alcance». En la pestaña **Calculado**, expande `color` para localizar que su origen es la regla de `.nota`. Luego inspecciona el `span` de la frase final. Su regla propia sustituye el color heredado para ese fragmento. El borde y el relleno corresponden a la caja del `aside`.

~~~css
.nota { padding: 1rem; border-left: 4px solid var(--acento); color: #36546b; }
.nota .excepcion { color: #7b361a; }
~~~

Prueba a desactivar el `color` de `.nota .excepcion` y comprueba qué hereda el fragmento. Después compara un selector de hijo directo, `.ficha-cuerpo > h3`, con el de descendientes, `.lista-ficha li`. El segundo también alcanza los elementos de listas anidadas.

Activa la barra de dispositivos y prueba la cuadrícula a 390, 768 y 1200 px. Abre `recursos/estilos/01_ciclo_css.css` y busca `grid-template-columns`. La regla inicial crea una columna, la consulta de 768 px crea dos y la de 992 px crea tres. Comprueba qué regla está activa al cambiar de ancho.

## 3. Distingue clases de Bootstrap y CSS propio

La etapa de Bootstrap conserva el significado HTML. Un `h3` con clase `h5` mantiene su nivel estructural y adopta la escala visual de Bootstrap. El menú y los paneles relacionan cada botón con su destino mediante `data-bs-target` e `id`. El bundle de Bootstrap ejecuta ese comportamiento. Compara el `details` nativo de la etapa 2 con el Accordion de indicadores y el Collapse independiente de los criterios de revisión en las etapas 3 y 4.

| Elemento | CSS propio en la etapa 2 | Clases en la etapa 3 |
| --- | --- | --- |
| Cuadrícula | `display: grid` y consultas de ancho mínimo | `row g-3` con `col-12 col-md-6 col-lg-4` |
| Tarjeta | `.ficha` para fondo, borde y altura | `card h-100` y `card-body` |
| Énfasis | `.estado` y `.pendiente` | `badge text-bg-success` y `badge text-bg-warning` |
| Lista | `.lista-ficha li` para el espaciado | `list-group list-group-flush` y `list-group-item` en la lista de evidencias |
| Tabla | Borde, relleno y fondo en `.tabla` | `table table-striped` dentro de `table-responsive` |
| Controles | Reglas propias para formulario y acciones | `form-select`, `form-check`, `btn btn-primary`, `btn-outline-primary` |
| Nota de herencia | Color en `.nota`, excepción en el `span` | Dos reglas equivalentes en la hoja propia cargada después de Bootstrap |

### Ediciones y comprobación

1. **Jerarquía.** En Bootstrap, cambia la clase `display-4` del `h1` por `display-5`. Comprueba en Elementos que sigue siendo un `h1`. [Tipografía](https://getbootstrap.com/docs/5.3/content/typography/)
2. **Cuadrícula.** Cambia `col-lg-4` por `col-lg-6` en las tres tarjetas. Deben verse una, dos y dos columnas a 390, 768 y 1200 px, respectivamente. Compara también `g-3` con `g-4`. [Grid](https://getbootstrap.com/docs/5.3/layout/grid/) · [Breakpoints](https://getbootstrap.com/docs/5.3/layout/breakpoints/) · [Espaciado](https://getbootstrap.com/docs/5.3/utilities/spacing/)
3. **Navegación.** En móvil, abre «Secciones» con el teclado y observa el cambio de `aria-expanded`. Modifica `navbar-expand-md` a `navbar-expand-lg` para trasladar el umbral de expansión de 768 a 992 px. [Navbar](https://getbootstrap.com/docs/5.3/components/navbar/)
4. **Componentes.** Prueba `table-hover` en la tabla, cambia un estilo de insignia y experimenta con la variante de una tarjeta. Conserva los encabezados, los textos de estado y los nombres accesibles al editar. [Tablas](https://getbootstrap.com/docs/5.3/content/tables/) · [Badges](https://getbootstrap.com/docs/5.3/components/badge/) · [Cards](https://getbootstrap.com/docs/5.3/components/card/)
5. **Iconos.** Explora el catálogo, descarga otro SVG y guárdalo en `recursos/bibliotecas/`. Sustituye el `src` de una tarjeta. En este ejemplo los iconos son decorativos y se mantienen con `alt=""` porque el encabezado identifica la tarjeta. [Bootstrap Icons](https://icons.getbootstrap.com/)
6. **Paneles.** Abre dos encabezados del acordeón por turnos y comprueba que solo queda uno abierto. Despliega después los criterios de revisión y verifica que no afectan al acordeón. Localiza `data-bs-parent` en los primeros paneles y su ausencia en el Collapse independiente. [Accordion](https://getbootstrap.com/docs/5.3/components/accordion/) · [Collapse](https://getbootstrap.com/docs/5.3/components/collapse/)

## 4. Atribuye cada mejora a su tecnología

| Qué se observa | Dónde buscarlo | Qué probar |
| --- | --- | --- |
| Encabezados, secciones, imagen y controles | `paginas/laboratorio/01_ciclo_4_avanzado.html` | Sigue la jerarquía de títulos y encuentra el `img` del banner. Los iconos decorativos tienen `alt=""` porque los textos identifican cada tecnología. |
| Composición, contraste y recorte del banner | `recursos/estilos/01_ciclo_avanzado.css` | Cambia `object-position` y compara 390 y 1200 px. Observa qué parte de la foto permanece visible. |
| Cuadrícula, menú de versiones y navegación móvil | HTML del ejemplo y `recursos/bibliotecas/bootstrap-5.3.8.bundle.min.js` | Busca `data-bs-toggle="dropdown"` y `data-bs-toggle="collapse"`. El HTML declara los controles y Bootstrap abre y cierra los menús. [Dropdown](https://getbootstrap.com/docs/5.3/components/dropdowns/) |
| Traducción, filtrado y resumen | `recursos/scripts/01_ciclo_avanzado.js` | Selecciona Pendientes, cambia a EN y comprueba que se conserva el filtro. Envía el formulario y cambia de idioma mientras el resumen está visible. |

El HTML contiene los textos en español. El script usa las claves `data-i18n` para aplicar sus traducciones, actualiza el atributo `lang` del documento y traduce las etiquetas accesibles de los controles. Abre la URL con `?lang=en` para empezar en inglés. La elección también se intenta conservar en el navegador.

**Actividad de cierre.** Escoge una fase y localiza su marcado HTML, las reglas de apariencia y las clases de Bootstrap. Después sigue el evento que la oculta al filtrar con JavaScript. Distingue el JavaScript de Bootstrap, que mueve los menús, del script del proyecto, que cambia idioma, tarjetas y resumen. Verifica la navegación con Tab y el menú con Enter y Escape.

**Práctica con el carrusel.** En el HTML, localiza los dos bloques `carousel-item` y cambia `data-bs-interval="6000"` a `3000` para pasar de seis a tres segundos. Comprueba que la altura del banner se mantiene al alternar las imágenes. En el script propio, sigue las llamadas a `cycle()` y `pause()` cuando pulsas el control de reproducción. Si el sistema indica una preferencia de movimiento reducido, el carrusel empieza en pausa y permite avanzar con las flechas. [Carousel de Bootstrap](https://getbootstrap.com/docs/5.3/components/carousel/)

**Navegación entre páginas.** Pulsa **Abrir el grafo de aula** en el banner y selecciona un nodo en la vista del Reto 10. En el código, compara el enlace relativo a `../grafos/02_grafo.html` con `#revision`, que salta a otra sección del mismo documento.

## Fase final · Experiencia de usuario de ProtoQSAR

Desde la edición bilingüe, abre [UX de ProtoQSAR](../paginas/casos/03_protoqsar.html). Lee la tabla de hallazgos, alterna entre el recorrido actual y la propuesta, y registra el primer clic, el éxito y el tiempo de cada tarea. El caso usa Tabs para comparar las vistas y Accordion para organizar la validación. [Tabs](https://getbootstrap.com/docs/5.3/components/navs-tabs/)
