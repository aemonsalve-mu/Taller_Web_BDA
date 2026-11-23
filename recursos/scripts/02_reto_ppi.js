// Estas respuestas describen la topología de los datos sintéticos del aula.
// El mapa relaciona los nombres de las preguntas con los identificadores internos de la red.
const idClave = new Map(equipos.map(({ id, nombre }) => [nombre, id]));
const tlr2 = idClave.get('TLR2');
const nfkb1 = idClave.get('NFKB1');
const il10 = idClave.get('IL10');

// La cola recorre caminos por longitud. Las opciones permiten exigir un nodo intermedio o excluirlo.
function encontrarCamino(inicio, destino, { pasarPor, excluir } = {}) {
  // Enumeramos caminos simples por longitud en esta red pequeña.
  const cola = [[inicio]];
  for (const camino of cola) {
    const ultimo = camino.at(-1);
    if (ultimo === destino && (!pasarPor || camino.includes(pasarPor))) return camino;
    if (ultimo === destino) continue;
    for (const vecino of vecinos.get(ultimo)) {
      if (vecino !== excluir && !camino.includes(vecino)) cola.push([...camino, vecino]);
    }
  }
  return [];
}

function textoCamino(camino) {
  return camino.map(id => nombresRed.get(id)).join(' — ') || 'sin camino';
}

// Compara tres recorridos. El más corto, uno que pasa por NFKB1 y otro tras retirar ese nodo.
const caminoCorto = encontrarCamino(tlr2, il10);
const caminoConNfkb1 = encontrarCamino(tlr2, il10, { pasarPor: nfkb1 });
const caminoRestante = encontrarCamino(tlr2, il10, { excluir: nfkb1 });
const ordenGrado = [...vecinos].sort(([, a], [, b]) => b.size - a.size);
const candidatosIL10 = [...vecinos.get(il10)].map(id => nombresRed.get(id)).sort();

// Cada clave p1 a p5 coincide con el id del lugar donde se escribe la respuesta.
const respuestas = {
  p1: 'IL10 figura como nodo y tiene grado ' + vecinos.get(il10).size + ' en la red de aula.',
  p2: 'Camino más corto: ' + textoCamino(caminoCorto) + '. Camino que pasa por NFKB1: ' +
    textoCamino(caminoConNfkb1) + '. Son caminos de asociaciones; una ruta de señalización requiere relaciones dirigidas y evidencia.',
  p3: 'El grafo pierde el nodo NFKB1 y sus ' + vecinos.get(nfkb1).size +
    ' aristas incidentes. TLR2 e IL10 siguen conectadas: ' + textoCamino(caminoRestante) +
    '. Esta prueba mide conectividad de la red de aula.',
  p4: ordenGrado.slice(0, 4).map(([id, adyacentes]) => nombresRed.get(id) + ' (' + adyacentes.size + ')').join(', ') +
    '. El grado cuantifica conexiones, y depende del alcance y la cobertura de la red.',
  p5: 'Si el nodo nuevo solo se une a IL10, sus vecinos comunes con cualquier candidata se limitan a IL10. En el ejemplo empatan ' +
    candidatosIL10.join(', ') + ' con un punto. Ese empate refleja la escasez de información, y las sugerencias requieren evaluación en el conjunto de prueba del reto.'
};
// Inserta las respuestas como texto en los bloques ya definidos en el HTML.
for (const [id, respuesta] of Object.entries(respuestas)) {
  document.getElementById(id).textContent = respuesta;
}
