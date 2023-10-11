let equipos = ["Cruz Azul", "Toluca", "Santos"]
/**
 * Necesito que tenga un indice entre 0-2
 * Posibles soluciones (Cruz azul, Toluca y Santos)
 * @param {*} indice  Numero de 0-2
 * @returns Equipo
 */
function obtenerEquipo(indice) {
    return equipos[indice];
}

module.exports.obtenerEquipo = obtenerEquipo;