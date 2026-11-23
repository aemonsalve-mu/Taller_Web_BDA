// Nombres del encargo, asociaciones inventadas para la práctica. Los IDs internos son abreviados.
// equipos contiene los nodos y sus posiciones iniciales. Cada cadena de entrenamiento identifica los dos extremos de una arista.
const redColaboraciones = {
  equipos: [
    { id: 'A', nombre: 'TLR2', x: 76, y: 85 }, { id: 'B', nombre: 'MYD88', x: 139, y: 219 },
    { id: 'C', nombre: 'IRAK4', x: 202, y: 104 }, { id: 'D', nombre: 'NFKB1', x: 251, y: 243 },
    { id: 'E', nombre: 'RELA', x: 323, y: 125 }, { id: 'F', nombre: 'IL10', x: 402, y: 242 },
    { id: 'G', nombre: 'IL10RA', x: 448, y: 322 }, { id: 'H', nombre: 'IL10RB', x: 453, y: 151 }
  ],
  entrenamiento: ['AB', 'AC', 'BC', 'BD', 'CD', 'CE', 'DE', 'EF', 'FG', 'FH']
};
// El mapa permite pasar de un identificador abreviado al nombre mostrado en la interfaz.
const nombresRed = new Map(redColaboraciones.equipos.map(({ id, nombre }) => [id, nombre]));

// Convierte una clave de arista en los nombres de sus dos extremos.
function nombrarPar(par) {
  return [...par].map(id => nombresRed.get(id)).join('–');
}
