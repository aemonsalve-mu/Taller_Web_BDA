# Taller Web BDA · Reto 10

Taller para Business Data Analytics. 
Incluye:
1. El ciclo HTML5 → CSS3 → Bootstrap, 
2. La exploración de un grafo de aula con D3, Plotly.js y NVD3 y 
3. Un caso de rediseño de la web de ProtoQSAR.

## Abrir el proyecto

Descarga(Clona) el repositorio y abre [index.html](index.html) con Chrome o Edge. El sitio es estático y funciona con las bibliotecas incluidas en el repositorio. Las referencias externas y la web oficial de ProtoQSAR requieren conexión.

## Estructura

| Ruta | Contenido |
| --- | --- |
| [index.html](index.html) | Laboratorio web y entrada al taller. |
| [paginas/laboratorio/](paginas/laboratorio/) | Cuatro etapas del panel de seguimiento y práctica del DOM con JavaScript. |
| [paginas/grafos/](paginas/grafos/) | Red sintética del Reto 10 y comparativa de bibliotecas. |
| [paginas/casos/](paginas/casos/) | Fase final de UX de ProtoQSAR, con auditoría, propuesta navegable y protocolo de validación. |
| [recursos/estilos/](recursos/estilos/) | Hojas de estilos propias. |
| [recursos/scripts/](recursos/scripts/) | Comportamiento de las prácticas y datos sintéticos del grafo. |
| [recursos/imagenes/](recursos/imagenes/) | Ilustración local del banner de la edición bilingüe. |
| [recursos/bibliotecas/](recursos/bibliotecas/) | Bootstrap, Bootstrap Icons, D3, Plotly.js, NVD3 y QRCodeJS, con sus licencias. |
| [documentacion/](documentacion/) | Guía docente, manual de HTML/CSS/Bootstrap y guía del ciclo web. |

## Publicar en GitHub Pages

1. Crea el repositorio y sube el contenido extraído del ZIP. Deja `index.html` y `.nojekyll` en la raíz del repositorio, junto a `paginas/`, `recursos/` y `documentacion/`.
2. En **Settings → Pages**, selecciona **Deploy from a branch**, la rama `main` y la carpeta **/(root)**. Guarda la configuración.
3. Abre la URL que muestra Pages y prueba los enlaces desde el índice. Revisa en móvil las cuatro etapas del ciclo y prueba el menú y el selector de idioma de la edición bilingüe.

Los enlaces a páginas y recursos son relativos para que el sitio pueda publicarse en una ruta como `/nombre-del-repositorio/`. [Configurar la fuente de publicación de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

### Compartir la web por QR

Pulsa **Compartir por QR** desde el laboratorio o la edición bilingüe. En GitHub Pages, con dominio `github.io`, se genera un código para la portada del taller. Desde una copia local o un dominio personalizado, pega la dirección HTTPS publicada que aparece en **Settings → Pages** y pulsa **Generar QR**. El cuadro muestra la dirección codificada y permite descargar el PNG. La imagen se genera en el navegador con QRCodeJS.

## Guías

- [Guía docente](documentacion/Guia_docente.md)
- [Manual de HTML, CSS y Bootstrap](documentacion/Manual_HTML_CSS_Bootstrap.md)
- [Guía del ciclo de evolución web](documentacion/Guia_Ciclo_Web.md)
