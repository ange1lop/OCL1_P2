const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")

function CicloDoWhile(_instruccion, _ambito){
    var hayReturn = false
    var valorRetorno=null
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)
    let unaVez = true
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor || unaVez){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejec =Bloque(_instruccion.instrucciones, nuevoAmbito)
            //mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje+=ejec.cadena
            if(ejec.hayBreak){
                return {
                    cadena: mensaje,
                    hayReturn: hayReturn,
                    valorRetorno: valorRetorno,
                }
            }
            unaVez = false
            //actualizamos
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
         return {
            cadena: mensaje,
            hayReturn: hayReturn,
            valorRetorno: valorRetorno,
        }
    }
    return {cadena:`Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
    hayReturn: hayReturn,
    valorRetorno: valorRetorno
}
}

module.exports = CicloDoWhile