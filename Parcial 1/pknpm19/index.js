let equipos = ["Cruz Azul", "Toluca", "Santos"]
/**
 * Recibe un numero para obtener Cruz Azul", "Toluca" o "Santos
 * @param {*} indice Numero de 0-2
 * @returns Regresa el equipo
 */
function obtenerEquipo(indice) {
    return equipos[indice];
}

module.exports.obtenerEquipo = obtenerEquipo;