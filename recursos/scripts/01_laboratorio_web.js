// Estos id conectan el selector, la ficha de ejemplo y la salida donde se explican sus relaciones.
const selector = document.querySelector('#elemento-dom');
const parentesco = document.querySelector('#parentesco');
const ficha = document.querySelector('#ficha');

// Construye una etiqueta legible a partir del nombre de la etiqueta y su id.
function etiqueta(elemento) {
  if (!elemento) return '—';
  return elemento.tagName.toLowerCase() + (elemento.id ? '#' + elemento.id : '');
}

// Lee el DOM real. parentElement da el padre y children recoge sus hijos directos.
function mostrarParentesco() {
  ficha.classList.remove('nodo-inspeccionado');
  ficha.querySelector('.nodo-inspeccionado')?.classList.remove('nodo-inspeccionado');
  const nodo = document.getElementById(selector.value);
  const padre = nodo.parentElement;
  // Los hermanos comparten padre. filter descarta el elemento seleccionado de esa lista.
  const hermanos = [...padre.children].filter(elemento => elemento !== nodo);
  nodo.classList.add('nodo-inspeccionado');
  parentesco.textContent = [
    'Seleccionado · ' + etiqueta(nodo),
    'Padre · ' + etiqueta(padre),
    'Hijos directos · ' + ([...nodo.children].map(etiqueta).join(', ') || '—'),
    'Hermanos · ' + (hermanos.map(etiqueta).join(', ') || '—')
  ].join('\n');
}

// El segundo ejercicio conecta las casillas de herencia con el bloque que se va a inspeccionar.
const marco = document.querySelector('#ejemplo-cascada');
const casillaPadre = document.querySelector('#cambiar-padre');
const casillaHerencia = document.querySelector('#forzar-herencia');
const salida = document.querySelector('#valores-css');

// Modifica las clases y consulta el resultado calculado por el navegador después de la cascada.
function mostrarEstilos() {
  marco.classList.toggle('padre-alternativo', casillaPadre.checked);
  marco.classList.toggle('forzar-herencia', casillaHerencia.checked);
  const caja = getComputedStyle(marco);
  const parrafo = getComputedStyle(document.querySelector('#texto-padre'));
  const span = getComputedStyle(document.querySelector('#texto-hijo'));
  salida.textContent = [
    'color · párrafo ' + parrafo.color + ' / span ' + span.color,
    'padding · caja ' + caja.paddingTop + ' / span ' + span.paddingTop,
    'border · caja ' + caja.borderTopWidth + ' / span ' + span.borderTopWidth
  ].join('\n');
}
// Vincula los controles mediante eventos y ejecuta al final ambas demostraciones con sus valores iniciales.
selector.addEventListener('change', mostrarParentesco);
casillaPadre.addEventListener('change', mostrarEstilos);
casillaHerencia.addEventListener('change', mostrarEstilos);
mostrarParentesco();
mostrarEstilos();
