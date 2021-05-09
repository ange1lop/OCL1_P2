const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Declaracion = require("./Declaracion");
const Asignacion = require("./Asignacion");

function CicloFor(_instruccion, _ambito,_Error,Simbol){
    var mensaje = ""
    var hayReturn=false;
    var valorRetorno=null;
    var nuevoAmbito = new Ambito(_ambito)
    let id = _instruccion.variable.id
    if(_instruccion.variable.tipo===TIPO_INSTRUCCION.DECLARACION){ //declara valor
        var mensajed = Declaracion(_instruccion.variable, nuevoAmbito)
            if(mensajed!=null){
                mensaje+=mensajed+'\n'
                id = _instruccion.variable.id
            }
    }else{ //asigna valor
        var mensajed = Asignacion(_instruccion.variable, nuevoAmbito)
            if(mensajed!=null){
                mensaje+=mensajed+'\n'
                id = _instruccion.variable.id
            }
    }
    var operacion = Operacion(_instruccion.expresionLogica, nuevoAmbito)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor){
            
            const Bloque = require('./Bloque')
            var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje+=ejec.cadena
            hayReturn=ejec.hayReturn
            valorRetorno=ejec.valorRetorno
            
            if(ejec.hayBreak || hayreturn ||ejec.hayContinue  ){
                return {
                    cadena: mensaje,
                    hayReturn: hayReturn,
                    valorRetorno:valorRetorno
                }
            }
            //actualizamos
            Asignacion(_instruccion.aumento,nuevoAmbito)

            operacion = Operacion(_instruccion.expresionLogica,nuevoAmbito)
            let ss = nuevoAmbito.getSimbolo(id)
            nuevoAmbito = new Ambito(_ambito)
            nuevoAmbito.addSimbolo(ss.id,ss)
        }
        return {
            cadena: mensaje,
            hayReturn: hayReturn,
            valorRetorno:valorRetorno
        }
    }
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es una expresion de tipo BANDERA en la condicion",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)*/
                return {
                    cadena: `Error Semantico: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
                    ,hayReturn: hayReturn,
                    valorRetorno:valorRetorno
                } 

}

module.exports = CicloFor