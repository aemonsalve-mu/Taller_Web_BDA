// Conservamos las posiciones originales al preparar los nodos para la simulación.
const equipos = redColaboraciones.equipos.map(equipo => ({ ...equipo }));
const { entrenamiento } = redColaboraciones;

// Estas colaboraciones se revelan al final. Solo se usan para evaluar.
const prueba = ['AD', 'CF', 'EG'];
// Lista de adyacencia. Cada nodo apunta a un conjunto de sus vecinos y cada arista se registra en ambos sentidos.
const vecinos = new Map(equipos.map(({ id }) => [id, new Set()]));
for (const [a, b] of entrenamiento) {
  vecinos.get(a).add(b);
  vecinos.get(b).add(a);
}

// Solo se puntúan pares sin arista de entrenamiento. La puntuación cuenta cuántos vecinos comparten.
const predicciones = [];
for (const [i, { id: a }] of equipos.entries()) {
  for (const { id: b } of equipos.slice(i + 1)) {
    if (vecinos.get(a).has(b)) continue;
    const comunes = [...vecinos.get(a)].filter(id => vecinos.get(b).has(id)).sort();
    predicciones.push({ par: a + b, comunes, puntos: comunes.length });
  }
}
predicciones.sort((a, b) => b.puntos - a.puntos || a.par.localeCompare(b.par, 'es'));

// Referencias al SVG y a los controles definidos en el HTML.
const svg = document.querySelector('#red');
const selector = document.querySelector('#equipo');
const mostrar = document.querySelector('#candidatos');
const selectorTop = document.querySelector('#top');
const ranking = document.querySelector('#ranking');
const revelar = document.querySelector('#revelar');
const resultado = document.querySelector('#resultado');
const detalle = document.querySelector('#vecinos');
const retirar = document.querySelector('#quitar-nfkb1');
const idRetirado = equipos.find(nodo => nodo.nombre === 'NFKB1').id;
const posiciones = new Map(equipos.map(nodo => [nodo.id, nodo]));

// SVG tiene su propio espacio de nombres. createElementNS crea elementos que el navegador interpreta como marcas gráficas.
function elementoSVG(nombre, atributos, padre) {
  const elemento = document.createElementNS('http://www.w3.org/2000/svg', nombre);
  for (const [clave, valor] of Object.entries(atributos)) elemento.setAttribute(clave, valor);
  padre.append(elemento);
  return elemento;
}

// Cada grupo SVG contiene un tipo de marca. Se dibujan primero los enlaces y al final los nodos.
const capaObservada = elementoSVG('g', { 'aria-hidden': 'true' }, svg);
const capaCandidatos = elementoSVG('g', { 'aria-hidden': 'true' }, svg);
const capaNodos = elementoSVG('g', {}, svg);
const aristas = entrenamiento.map(par => ({
  par, marca: elementoSVG('line', { class: 'edge' }, capaObservada)
}));
let candidatos = [];

// Cada nodo comparte la misma selección con el desplegable y puede activarse con el ratón o el teclado.
for (const nodo of equipos) {
  selector.add(new Option(nodo.nombre, nodo.id));
  nodo.marca = elementoSVG('g', {
    class: 'node', tabindex: '0', role: 'button', 'aria-label': 'Proteína ' + nodo.nombre,
    'aria-pressed': 'false'
  }, capaNodos);
  elementoSVG('circle', { r: 23 }, nodo.marca);
  elementoSVG('text', { y: 1 }, nodo.marca).textContent = nodo.nombre;
  function seleccionar() {
    selector.value = selector.value === nodo.id ? '' : nodo.id;
    resaltar();
  }
  nodo.marca.addEventListener('click', seleccionar);
  nodo.marca.addEventListener('keydown', evento => {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      seleccionar();
    }
  });
}

// Traslada las posiciones de los objetos JavaScript a coordenadas SVG para dibujar aristas y nodos.
function actualizarGeometria() {
  for (const { par, marca } of [...aristas, ...candidatos]) {
    const a = posiciones.get(par[0]);
    const b = posiciones.get(par[1]);
    marca.setAttribute('x1', a.x);
    marca.setAttribute('y1', a.y);
    marca.setAttribute('x2', b.x);
    marca.setAttribute('y2', b.y);
  }
  for (const { x, y, marca } of equipos) {
    marca.setAttribute('transform', 'translate(' + x + ',' + y + ')');
  }
}

// Destaca la vecindad del nodo elegido y representa la retirada de NFKB1 ocultando sus marcas incidentes.
function resaltar() {
  const elegido = selector.value;
  const excluir = retirar.checked ? idRetirado : '';
  for (const { id, marca } of equipos) {
    marca.toggleAttribute('hidden', id === excluir);
    marca.classList.toggle('active', id === elegido);
    marca.classList.toggle('dim', Boolean(elegido) && id !== elegido && !vecinos.get(elegido).has(id));
    marca.setAttribute('aria-pressed', String(id === elegido));
  }
  for (const { par, marca } of [...aristas, ...candidatos]) {
    marca.toggleAttribute('hidden', Boolean(excluir) && par.includes(excluir));
    marca.classList.toggle('dim', Boolean(elegido) && !par.includes(elegido));
  }
  detalle.textContent = elegido
    ? 'Proteína ' + nombresRed.get(elegido) + ' · vecinos de aula: ' +
      [...vecinos.get(elegido)].filter(id => id !== excluir).map(id => nombresRed.get(id)).sort().join(', ') + '.'
    : excluir
      ? (equipos.length - 1) + ' proteínas · ' + entrenamiento.filter(par => !par.includes(excluir)).length + ' aristas tras retirar NFKB1.'
      : equipos.length + ' proteínas · ' + entrenamiento.length + ' asociaciones de aula.';
}

// Recorta el ranking a los k primeros, reconstruye las filas y dibuja las candidatas cuando se activa esa opción.
function actualizarCandidatos() {
  const k = Number(selectorTop.value);
  const seleccion = predicciones.slice(0, k);
  ranking.replaceChildren();
  capaCandidatos.replaceChildren();
  candidatos = [];
  for (const { par, comunes, puntos } of seleccion) {
    const fila = ranking.insertRow();
    for (const valor of [nombrarPar(par), comunes.map(id => nombresRed.get(id)).join(', ') || '—', puntos]) {
      fila.insertCell().textContent = valor;
    }
    if (mostrar.checked && !retirar.checked) {
      candidatos.push({ par, marca: elementoSVG('line', { class: 'candidate' }, capaCandidatos) });
    }
  }
  actualizarGeometria();
  resaltar();
  // Evalúa contra la prueba reservada. Precisión divide los aciertos entre k y recall los divide entre los positivos de prueba.
  const aciertos = seleccion.filter(({ par }) => prueba.includes(par)).length;
  resultado.textContent = 'Prueba sintética: ' + prueba.map(nombrarPar).join(', ')
    + '. Aciertos: ' + aciertos + '. Precisión@' + k + ': ' + aciertos + '/' + k
    + '. Recall@' + k + ': ' + aciertos + '/' + prueba.length + '.';
}

// D3 calcula las posiciones. En cada tick se limita la geometría al área visible y se actualiza el dibujo.
function iniciarFuerzas() {
  if (!window.d3) return;
  // forceLink muta source y target. Usamos objetos separados del conjunto de entrenamiento.
  const enlaces = entrenamiento.map(([source, target]) => ({ source, target }));
  d3.forceSimulation(equipos)
    .force('enlaces', d3.forceLink(enlaces).id(nodo => nodo.id).distance(92))
    .force('repulsion', d3.forceManyBody().strength(-260))
    .force('centro', d3.forceCenter(250, 187))
    .force('colision', d3.forceCollide(33))
    .on('tick', () => {
      for (const nodo of equipos) {
        nodo.x = Math.max(32, Math.min(468, nodo.x));
        nodo.y = Math.max(32, Math.min(343, nodo.y));
      }
      actualizarGeometria();
    });
  document.querySelector('#disposicion').textContent = 'Posiciones calculadas con las fuerzas de D3.';
}

// Conecta los controles con la actualización de la selección, el ranking y el conjunto de prueba.
selector.addEventListener('change', resaltar);
selectorTop.addEventListener('change', actualizarCandidatos);
mostrar.addEventListener('change', actualizarCandidatos);
retirar.addEventListener('change', () => {
  const retirado = [...selector.options].find(opcion => opcion.value === idRetirado);
  retirado.disabled = retirar.checked;
  if (retirar.checked && selector.value === idRetirado) selector.value = '';
  mostrar.disabled = retirar.checked;
  actualizarCandidatos();
});
revelar.addEventListener('click', () => {
  resultado.hidden = !resultado.hidden;
  revelar.setAttribute('aria-expanded', String(!resultado.hidden));
  revelar.textContent = resultado.hidden ? 'Revelar periodo de prueba' : 'Ocultar periodo de prueba';
});
actualizarCandidatos();
iniciarFuerzas();
