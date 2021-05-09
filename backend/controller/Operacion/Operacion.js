const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Aritmetica = require("./Aritmetica");
const Logica = require("./Logica");
const Relacional = require("./Relacional");
const OperacionTernaria = require("./OperacionTernaria");
const ValorExpresion = require("./ValorExpresion");
const FuncionesNativas = require("./FuncionesNativas");

function Operacion(_expresion, _ambito,_Error,_entorno,Simbol){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.ENTERO 
        || _expresion.tipo === TIPO_VALOR.BANDERA || _expresion.tipo === TIPO_VALOR.CARACTER
        || _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito,_Error)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA ||
        _expresion.tipo === TIPO_OPERACION.MULTIPLICACION ||_expresion.tipo === TIPO_OPERACION.DIVISION ||
        _expresion.tipo === TIPO_OPERACION.MODULO || _expresion.tipo === TIPO_OPERACION.POTENCIA ||
        _expresion.tipo === TIPO_OPERACION.NEGACION){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MAYOR ||
        _expresion.tipo === TIPO_OPERACION.MENORIGUAL || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return Relacional(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo == TIPO_OPERACION.NOT){
        return Logica(_expresion, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.CASTEO){
        const castear = require('../Operacion/Casteo')
        return castear(_expresion, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.ACCESO_VECTOR){
        const av = require("./AccesoVector");
        return av(_expresion, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.ACCESO_LISTA){
        const av = require("./AccesoLista");
        return av(_expresion, _ambito)
    }else if(_expresion.tipo===TIPO_OPERACION.TERNARIO){
        return OperacionTernaria(_expresion, _ambito)
    }else if(_expresion.tipo===TIPO_OPERACION.LENGTH || _expresion.tipo===TIPO_OPERACION.UPPER || _expresion.tipo===TIPO_OPERACION.LOWER
        ||_expresion.tipo===TIPO_OPERACION.TRUNCATE || _expresion.tipo===TIPO_OPERACION.ROUND || _expresion.tipo===TIPO_OPERACION.TYPEOF || _expresion.tipo===TIPO_OPERACION.TOCHARARRAY ){
        return FuncionesNativas(_expresion,_ambito)
    }else if(_expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
        const Exec = require("../Instruccion/Exec");
        var mensaje = Exec(_expresion, _ambito)
        console.log(mensaje)
        return {
            cadena: mensaje.cadena,
            valorRetorno: mensaje.valorRetorno
        }
    }
}

module.exports = Operacion
