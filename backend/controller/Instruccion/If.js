const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIf(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var hayBreak=false
    var hayContinue = false
    var hayReturn = false
    var valorRetorno = null
    //console.log(operacion)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instrucciones,nuevoAmbito)
            hayBreak= ejec.hayBreak;
            hayContinue=ejec.hayContinue;
            hayReturn = ejec.hayReturn;
            valorRetorno = ejec.valorRetorno
            mensaje+=ejec.cadena
            //mensaje += Bloque(_instruccion.instrucciones,nuevoAmbito)
        }
        return {
            hayBreak: hayBreak,
            hayContinue: hayContinue,
            cadena: mensaje,
            hayReturn: hayReturn,
            valorRetorno: valorRetorno
        }
    }
    return {
        hayBreak: hayBreak,
        hayContinue: hayContinue,
        hayReturn: hayReturn,
        valorRetorno: valorRetorno,
        cadena:  `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = SentenciaIf