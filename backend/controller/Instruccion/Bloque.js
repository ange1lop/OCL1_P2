const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const AddLista = require("./AddLista");
const Asignacion = require("./Asignacion");
const AsignacionVector = require("./AsignacionVector");
const Cout = require("./Cout");
const Declaracion = require("./Declaracion");
const SentenciaIf = require("./If");
const SentenciaIfElse = require("./IfElse");
const SentenciaIfElseIf = require("./IfElseIf");
const CicloWhile = require("./While");
const CicloDoWhile = require("./DoWhile");
const CicloFor = require("./For");
const EjecutarSwitch = require("./Switch");

function Bloque(_instrucciones, _ambito){
    var cadena = ""
    var hayBreak = false;
    var hayContinue = false;
    var hayReturn = false;
    var valorRetorno = null;
    _instrucciones.forEach(instruccion => {
        if(hayBreak){
            return{
                hayBreak: hayBreak,
                hayContinue: hayContinue,
                cadena: cadena,
                hayReturn:hayReturn,
                valorRetorno:valorRetorno
            }
        }
        if(hayContinue){
            return{
                hayBreak: hayBreak,
                hayContinue: hayContinue,
                cadena: cadena,
                hayReturn:hayReturn,
                valorRetorno:valorRetorno
            }
        }
        if(hayReturn){
            return{
                hayBreak: hayBreak,
                hayContinue: hayContinue,
                cadena: cadena,
                hayReturn:hayReturn,
                valorRetorno:valorRetorno
            }
        }
        if(instruccion.tipo === TIPO_INSTRUCCION.COUT){
            cadena+=Cout(instruccion, _ambito)+'\n'
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            var ejec = CicloFor(instruccion, _ambito)
            var mensaje=ejec.cadena
            haybreak=false
            haycontinue=false
            hayReturn=ejec.hayReturn
            valorRetorno=ejec.valorRetorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var mensaje = CicloWhile(instruccion, _ambito)
            hayBreak= false
            hayContinue=false
            hayReturn=ejec.hayReturn
            valorRetorno=ejec.valorRetorno
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }else if(instruccion.tipo === TIPO_INSTRUCCION.DO_WHILE){
            var mensaje = CicloDoWhile(instruccion, _ambito)
            hayBreak= false
            hayContinue=false
            hayReturn=ejec.hayReturn
            valorRetorno=ejec.valorRetorno
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
            const Exec = require("./Exec");
            var mensaje = Exec(instruccion, _ambito)
            hayReturn=false;
            valorRetorno=null;
            if(mensaje!=null){
                cadena+=mensaje.cadena
                
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            var ejec = SentenciaIf(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak=ejec.hayBreak
            hayContinue=false
            hayReturn=ejec.hayReturn
            valorRetorno=ejec.valorRetorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.SWITCH) {
            var ejec = EjecutarSwitch(instruccion, _ambito);
            var mensaje=ejec.cadena
            haybreak=false
            haycontinue=false
            hayReturn=ejec.hayReturn
            valorRetorno=ejec.valorRetorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo===TIPO_OPERACION.TERNARIO){
            const Ternario = require("../Operacion/Ternario")
            var mensaje = Ternario(instruccion, _ambito,_Error,Simbol);
            if(mensaje!=null && mensaje.tipo===null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IFCE){
            var ejec = SentenciaIfElse(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak=ejec.hayBreak
            hayContinue=false
            hayReturn=ejec.hayReturn
            valorRetorno=ejec.valorRetorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IFCEIF){
            //console.log(instruccion)
            var ejec = SentenciaIfElseIf(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak=ejec.hayBreak
            hayContinue=false
            hayReturn=ejec.hayReturn
            valorRetorno=ejec.valorRetorno
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.BREAK){
            hayBreak = true
            return{
                hayBreak: hayBreak,
                hayContinue: hayContinue,
                cadena: cadena,
                hayReturn:hayReturn,
                valorRetorno:valorRetorno
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.CONTINUE){
            hayContinue = true
            return{
                hayBreak: hayBreak,
                hayContinue: hayContinue,
                cadena: cadena,
                hayReturn:hayReturn,
                valorRetorno:valorRetorno
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN){
            //console.log(_instrucciones)
            hayReturn=true;
            valorRetorno=instruccion.valor
            if(valorRetorno!=null){
                const Operacion = require("../Operacion/Operacion");
                valorRetorno=Operacion(valorRetorno, _ambito)
            }
            return{
                hayBreak: hayBreak,
                hayContinue: hayContinue,
                cadena: cadena,
                hayReturn:hayReturn,
                valorRetorno:valorRetorno
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.MODIFICAR_VECTOR){
            var inst=instruccion
            var mensaje = AsignacionVector(inst, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }else if(instruccion.tipo === TIPO_INSTRUCCION.AGREGAR_LISTA){
            var inst=instruccion
            var mensaje = AddLista(inst, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
    });
    return{
        hayBreak: hayBreak,
        hayContinue: hayContinue,
        cadena: cadena,
        hayReturn:hayReturn,
        valorRetorno:valorRetorno
    }
    //return cadena
}

module.exports = Bloque