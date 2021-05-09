const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIfElse(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var hayContinue = false
    var hayBreak=false
    var hayReturn = false
    var valorRetorno = null
    //console.log(operacion)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        //console.log(operacion)
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesIf,nuevoAmbito)
            hayBreak= ejec.hayBreak;
            hayContinue = ejec.hayContinue;
            mensaje+=ejec.cadena
            hayReturn = ejec.hayReturn
            valorRetorno = eje.valorRetorno
            //mensaje += Bloque(_instruccion.instrucciones,nuevoAmbito)
        }
        else{
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesElse,nuevoAmbito)
            hayBreak= ejec.hayBreak;
            hayContinue = ejec.hayContinue;
            mensaje+=ejec.cadena
            hayReturn = ejec.hayReturn
            valorRetorno = eje.valorRetorno
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

module.exports = SentenciaIfElse