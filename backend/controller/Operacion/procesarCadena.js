const Operacion = require("./Operacion")

function procesarCadena(_expresion, _ambito,_Error,_entorno,Simbol){
    return Operacion(_expresion, _ambito)
}

module.exports = procesarCadena