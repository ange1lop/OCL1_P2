const Operacion = require("../Operacion/Operacion");
const TIPO_DATO = require("../Enums/TipoDato");
function AddLista(_instruccion, _ambito){
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        var valor = Operacion(_instruccion.valor)
        var simbolo = _ambito.getSimbolo(id)
        var valores=simbolo.valor
        if (simbolo.tipo.search("LISTA") ==-1){
            return `Error Semantico: El tipo de dato no es una lista: ${simbolo.tipo},... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }
        let tipoag = simbolo.tipo.replace('LISTA -> ','')

        if(tipoag===valor.tipo){
            valores.push(valor)
        }else{
            /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`La posición ingresada: ${posicion} es de tipo  ${_instruccion.posicion.tipo}, solo se aceptan de tipo: ${TIPO_DATO.ENTERO}`,_instruccion.linea, _instruccion.columna);
            _Error.addErrores(nuevo)*/
            return `Error Semantico: La agregacion ingresada: es de tipo  ${valor.tipo}, solo se aceptan de tipo: ${tipoag}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }
        simbolo.valor = valores
        _ambito.actualizar(id,simbolo)
        return null
    }
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`el vector '${String(id)}' no existe.`,_instruccion.linea, _instruccion.columna);
        _Error.addErrores(nuevo)*/
    return `Error Semantico: La lista '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = AddLista