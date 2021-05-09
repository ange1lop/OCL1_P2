const Operacion = require("../Operacion/Operacion")
const Ambito = require("../Ambito/Ambito")
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
function SwitchE(instruccion, _ambito) {
    var mensaje = ""
    var hayBreak = false;
    var hayReturn=false;
    var valorRetorno=null;
    var hayContinue=false;
    const valorExpresion = Operacion(instruccion.expresion, _ambito);
    const nuevoAmbito = new Ambito(_ambito);
    instruccion.casos.forEach(caso => {
        const Bloque = require('./Bloque')
        if (caso.tipo == TIPO_INSTRUCCION.CASE){
            const expresionCaso= Operacion(caso.expresion, nuevoAmbito);
            if (expresionCaso.valor == valorExpresion.valor && !haybreak){
                var ejec=Bloque(caso.instrucciones, nuevoAmbito);
                mensaje+=ejec.cadena
                hayBreak=ejec.hayBreak
                hayReturn=ejec.hayReturn
                valorRetorno=ejec.valorRetorno
                hayContinue=ejec.hayContinue
            }
        }
        else if (caso.tipo == TIPO_INSTRUCCION.DEFAULT){
            if (!haybreak){
                var ejec=Bloque(caso.instrucciones, nuevoAmbito);
                mensaje+=ejec.cadena
                hayBreak=ejec.hayBreak
                hayReturn=ejec.hayReturn
                valorRetorno=ejec.valorRetorno
                hayContinue=ejec.hayContinue
            }
                //console.log("CASO: "+mensaje)
        }
        if(hayreturn){
            return {
                cadena: mensaje,
                hayReturn: hayReturn,
                valorRetorno:valorRetorno
            }
        }
    });
    return {
        cadena: mensaje,
        hayReturn: hayReturn,
        valorRetorno:valorRetorno
    }
}
module.exports = SwitchE