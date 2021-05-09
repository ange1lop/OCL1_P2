const Ambito = require("../Ambito/Ambito")
const TIPO_DATO= require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function castear(_instruccion, _ambito){
    let enviar = false;
    const cambio=_instruccion.tipodedato;
    const dato=Operacion(_instruccion.valor,_ambito)
    const dato_cambio=dato.valor;
    const tipo_cambio=dato.tipo;
    let val_final
    if (cambio===TIPO_DATO.CARACTER && tipo_cambio===TIPO_DATO.ENTERO){
        val_final= String.fromCharCode(dato_cambio);
        enviar=true
    }
    else if (cambio===TIPO_DATO.ENTERO && tipo_cambio===TIPO_DATO.CARACTER){
        val_final= dato_cambio.charCodeAt(0);
        enviar=true
    }
    else if (cambio===TIPO_DATO.ENTERO && tipo_cambio===TIPO_DATO.DECIMAL){
        val_final= Math.trunc(dato_cambio);
        enviar=true
    }
    else if (cambio===TIPO_DATO.DECIMAL && tipo_cambio===TIPO_DATO.ENTERO){
        var volviendo=dato_cambio+".0";
        val_final= volviendo
        enviar=true
    }
    else if (cambio===TIPO_DATO.DECIMAL && tipo_cambio===TIPO_DATO.CARACTER){
        var volviendo=dato_cambio.charCodeAt(0)+".0";
        val_final= volviendo
        enviar=true
    }
    else if (cambio===TIPO_DATO.CADENA && (tipo_cambio===TIPO_DATO.BANDERA 
        ||tipo_cambio===TIPO_DATO.DECIMAL ||tipo_cambio===TIPO_DATO.ENTERO)
        ){
        let tempo = "\""+dato_cambio+"\"";
        val_final= tempo.substring(1, tempo.length-1)
        enviar=true
    }
    if(enviar){
        return{
            valor: val_final,
            tipo: cambio,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
    }
    return{
        valor: `Error Semantico: No se puede convertir un ${tipo_cambio} a un ${cambio}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
        tipo: tipo_a_cambair,
        linea: _instruccion.linea,
        columna: _instruccion.columna
    }
}

module.exports = castear