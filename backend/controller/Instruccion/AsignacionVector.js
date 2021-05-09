const Operacion = require("../Operacion/Operacion");
const TIPO_DATO = require("../Enums/TipoDato");
function AsignacionVector(_instruccion, _ambito){
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    var posicion=Operacion(_instruccion.posicion, _ambito).valor
    var posicionDato=Operacion(_instruccion.posicion, _ambito)
    if(existe){
        var valor = Operacion(_instruccion.valor,_ambito)
        var valorviejo;
        var simbolo = _ambito.getSimbolo(id)
        var valores=simbolo.valor
        var tam=valores.length;
        if(posicion<tam && posicion>=0){
            if(posicionDato.tipo===TIPO_DATO.ENTERO){
                valorviejo=valores[posicion];
            }else{
                /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`La posición ingresada: ${posicion} es de tipo  ${_instruccion.posicion.tipo}, solo se aceptan de tipo: ${TIPO_DATO.ENTERO}`,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)*/
                return `Error Semantico: La posición ingresada: ${posicion} es de tipo  ${_instruccion.posicion.tipo}, solo se aceptan de tipo: ${TIPO_DATO.ENTERO}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
            }
            
        }else{
            /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`La posición ingresada: ${posicion} no cumple con la longitud del vector`,_instruccion.linea, _instruccion.columna);
            _Error.addErrores(nuevo)*/
            return `Error Semantico: La posición ingresada: ${posicion} no cumple con la longitud del vector... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
                
        }

        var tipos = {
            tipoSimbolo: valorviejo.tipo,
            tipoNuevoValor: valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor){
            valores[posicion]=valor
            simbolo.valor = valores
            _ambito.actualizar(id,simbolo)
            return null
        }
        /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`No es posible asignar un valor de tipo ${tipos.tipoNuevoValor} al vector  ${id}  que es de tipo ${tipos.tipoSimbolo}.`,_instruccion.linea, _instruccion.columna);
        _Error.addErrores(nuevo)*/
        return valor.valor+" Error Semantico: No es posible asignar un valor de tipo "+tipos.tipoNuevoValor+" al vector'"+ id +"' que es de tipo "+tipos.tipoSimbolo+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`el vector '${String(id)}' no existe.`,_instruccion.linea, _instruccion.columna);
        _Error.addErrores(nuevo)*/
    return `Error Semantico: el vector '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = AsignacionVector