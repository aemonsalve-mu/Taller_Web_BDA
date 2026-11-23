// Busca el selector, las tarjetas que tienen data-area y el lugar donde aparece el recuento.
const filtro = document.querySelector('#area');
const tarjetas = document.querySelectorAll('[data-area]');
const resumen = document.querySelector('#resumen');

function aplicarFiltro() {
  let visibles = 0;
  for (const tarjeta of tarjetas) {
    // dataset.area lee data-area en JavaScript. «Todas» admite cualquier categoría.
    const coincide = filtro.value === 'todas' || tarjeta.dataset.area === filtro.value;
    tarjeta.hidden = !coincide;
    if (coincide) visibles += 1;
  }
  // Muestra el recuento como texto y distingue singular de plural.
  resumen.textContent = visibles === 1
    ? '1 indicador visible.'
    : `${visibles} indicadores visibles.`;
}

// change se dispara al elegir una opción. La llamada siguiente aplica el filtro inicial.
filtro.addEventListener('change', aplicarFiltro);
aplicarFiltro();