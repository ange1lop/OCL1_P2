const procesarCadena = require("../Operacion/procesarCadena")

function Cout(_instruccion, _ambito,_Error,Simbol){
    const cadena = procesarCadena(_instruccion.expresion, _ambito).valor
    return cadena
}

module.exports = Cout