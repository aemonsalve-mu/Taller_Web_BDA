// Las dos bibliotecas reciben el mismo grafo. Las referencias siguientes enlazan el selector con ambas visualizaciones.
const { equipos, entrenamiento } = redColaboraciones;
const selectorEquipo = document.querySelector('#equipo-comparado');
const resumenVecinos = document.querySelector('#vecinos-comparados');
const plot = document.querySelector('#plotly-red');

// Los mapas ofrecen acceso por identificador, por posición en el arreglo y por vecindad.
const porId = new Map(equipos.map(equipo => [equipo.id, equipo]));
const porIndice = new Map(equipos.map(({ id }, indice) => [id, indice]));
const vecinos = new Map(equipos.map(({ id }) => [id, []]));
const colorBase = '#0b655b';
const colorActivo = '#a9dfcf';

for (const [a, b] of entrenamiento) {
  vecinos.get(a).push(b);
  vecinos.get(b).push(a);
}
for (const { id, nombre } of equipos) selectorEquipo.add(new Option(nombre, id));

let plotListo = false;
let nodosNVD3;
let enlacesNVD3;

// Una traza de líneas dibuja cada par. El null levanta el lápiz entre aristas.
function coordenadasEnlaces(pares) {
  return {
    x: pares.flatMap(([a, b]) => [porId.get(a).x, porId.get(b).x, null]),
    y: pares.flatMap(([a, b]) => [porId.get(a).y, porId.get(b).y, null])
  };
}

// Sincroniza el texto de la vecindad y el resaltado en Plotly y NVD3.
function mostrarSeleccion() {
  const id = selectorEquipo.value;
  const adyacentes = vecinos.get(id);
  resumenVecinos.textContent = id
    ? 'Proteína ' + nombresRed.get(id) + ' · grado ' + adyacentes.length + ' · vecinos: ' +
      adyacentes.map(vecino => nombresRed.get(vecino)).sort().join(', ') + '.'
    : equipos.length + ' proteínas · ' + entrenamiento.length + ' asociaciones de aula.';

  if (plotListo) {
    const destacadas = coordenadasEnlaces(entrenamiento.filter(par => id && par.includes(id)));
    Plotly.restyle(plot, { x: [destacadas.x], y: [destacadas.y] }, [1]);
    Plotly.restyle(plot, {
      'marker.color': [equipos.map(equipo => equipo.id === id ? colorActivo : 'white')],
      'marker.size': [equipos.map(equipo => equipo.id === id ? 34 : 28)]
    }, [2]);
  }

  if (nodosNVD3) {
    nodosNVD3.select('circle')
      .classed('seleccionado', nodo => nodo.id === id)
      .style('fill', nodo => nodo.id === id ? colorActivo : 'white');
    enlacesNVD3
      .style('stroke', enlace => enlace.par.includes(id) && id ? colorBase : '#52677c')
      .style('opacity', enlace => !id || enlace.par.includes(id) ? 1 : .27)
      .style('stroke-width', enlace => enlace.par.includes(id) && id ? 4 : 2);
  }
}

function seleccionar(id) {
  selectorEquipo.value = selectorEquipo.value === id ? '' : id;
  mostrarSeleccion();
}

// Plotly dibuja primero las líneas y después los puntos. await espera a que el gráfico exista antes de suscribir sus eventos.
async function dibujarPlotly() {
  const enlace = { type: 'scatter', mode: 'lines', hoverinfo: 'skip' };
  await Plotly.newPlot(plot, [
    { ...enlace, ...coordenadasEnlaces(entrenamiento), line: { color: '#52677c', width: 2 } },
    { ...enlace, x: [], y: [], line: { color: colorBase, width: 4 } },
    {
      type: 'scatter', mode: 'markers+text',
      x: equipos.map(equipo => equipo.x), y: equipos.map(equipo => equipo.y),
      text: equipos.map(equipo => equipo.nombre), textposition: 'middle center',
      textfont: { color: '#162742', size: 9 },
      customdata: equipos.map(equipo => vecinos.get(equipo.id).length),
      hovertemplate: '%{text}<br>Grado %{customdata}<extra></extra>',
      marker: { size: 28, color: 'white', line: { color: colorBase, width: 2.5 } }
    }
  ], {
    margin: { l: 12, r: 12, t: 28, b: 12 },
    showlegend: false, hovermode: 'closest', dragmode: 'zoom',
    paper_bgcolor: '#f0f6f7', plot_bgcolor: '#f0f6f7',
    xaxis: { visible: false, range: [0, 500], constrain: 'domain' },
    yaxis: { visible: false, range: [375, 0], scaleanchor: 'x', constrain: 'domain' }
  }, { responsive: true, displaylogo: false, modeBarButtonsToRemove: ['lasso2d', 'select2d'] });
  plotListo = true;
  // La traza 2 contiene los nodos. Se usa su índice para identificar la proteína seleccionada.
  plot.on('plotly_click', ({ points }) => {
    const nodo = points.find(punto => punto.curveNumber === 2);
    if (nodo) seleccionar(equipos[nodo.pointNumber].id);
  });
  mostrarSeleccion();
}

// El adaptador prepara los nodos y enlaces que recibe el modelo de fuerzas de NVD3.
function dibujarNVD3() {
  // D3 v3 muta las posiciones y convierte los índices en referencias a nodos.
  const datos = {
    nodes: equipos.map(equipo => ({ ...equipo })),
    links: entrenamiento.map(par => ({
      source: porIndice.get(par[0]), target: porIndice.get(par[1]), value: 1, par
    }))
  };
  const chart = nv.models.forceDirectedGraph()
    .width(500).height(375).margin({ top: 0, right: 0, bottom: 0, left: 0 })
    .radius(19).linkDist(99).linkStrength(.6).charge(-420).gravity(.2)
    .color(() => 'white')
    .nodeExtras(nodos => {
      nodosNVD3 = nodos;
      nodos.select('circle').on('mouseover', null).on('mouseout', null);
      nodos.append('title').text(nodo => nodo.nombre + ' · grado ' + vecinos.get(nodo.id).length);
      nodos.append('text')
        .attr('text-anchor', 'middle').attr('dy', '.35em').text(nodo => nodo.nombre);
      nodos.on('click.aula', nodo => {
        if (!d3.event.defaultPrevented) seleccionar(nodo.id);
      });
    })
    .linkExtras(enlaces => { enlacesNVD3 = enlaces; });
  d3.select('#nvd3-red').datum(datos).call(chart);
  mostrarSeleccion();
}

function mostrarError(id, mensaje, error) {
  const estado = document.querySelector(id);
  estado.textContent = mensaje;
  estado.hidden = false;
  console.error(error);
}

// La selección manual y los clics en los dos dibujos desembocan en el mismo estado de la interfaz.
selectorEquipo.addEventListener('change', mostrarSeleccion);
mostrarSeleccion();
dibujarPlotly().catch(error => mostrarError('#estado-plotly', 'No se pudo cargar Plotly.js.', error));
try {
  dibujarNVD3();
} catch (error) {
  mostrarError('#estado-nvd3', 'No se pudo cargar NVD3 con D3 v3.', error);
}
