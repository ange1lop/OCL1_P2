const Operacion = require("../Operacion/Operacion");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
function Asignacion(_instruccion, _ambito){
    var mensaje = null
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        var valor2 = Operacion(_instruccion.expresion, _ambito)
        var valor = null
        if (_instruccion.expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
            valor = valor2.valorRetorno
            mensaje= valor2.cadena
        }else{
            valor = valor2
        }
        var simbolo = _ambito.getSimbolo(id)
        var tipos = {
            tipoSimbolo: simbolo.tipo,
            tipoNuevoValor: valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor){
            simbolo.valor = valor.valor
            _ambito.actualizar(id,simbolo)
            return mensaje
        }
        return "Error: No es posible asignar un valor de tipo "+tipos.tipoNuevoValor+" a la variable \n'"+ id +"' que es de tipo "+tipos.tipoSimbolo+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Asignacion