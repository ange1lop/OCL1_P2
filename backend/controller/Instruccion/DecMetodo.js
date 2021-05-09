const Metodo = require("../Ambito/Metodo")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
function DecMetodo(_instruccion, _ambito){
    //console.log(_instruccion)
    var nuevoMetodo ;
    if (_instruccion.tipo === TIPO_INSTRUCCION.DEC_METODO){
        nuevoMetodo= new Metodo(_instruccion.nombre, _instruccion.lista_parametros,_instruccion.instrucciones,"void", _instruccion.linea, _instruccion.columna)
    }else{
        nuevoMetodo= new Metodo(_instruccion.nombre, _instruccion.lista_parametros,_instruccion.instrucciones,_instruccion.devuelve, _instruccion.linea, _instruccion.columna)
    }
    //verificamos si el nombre ya existe como simbolo
    if(_ambito.existeSimbolo(nuevoMetodo.id)!=false){
        return `Error: No se puede declarar un metodo con el mismo nombre \n de una variable '${nuevoMetodo.id}'... Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
    }
    //verificamos si el metodo ya existe
    else if(_ambito.existeMetodo(nuevoMetodo.id)!=false){
        return `Error: El método '${nuevoMetodo.id}' ya existe... Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
    }
    //de lo contrario vamos a guardarlo
    _ambito.addMetodo(nuevoMetodo.id, nuevoMetodo)
    return null
}

module.exports = DecMetodo