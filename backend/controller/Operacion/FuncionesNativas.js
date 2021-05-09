const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const ValorExpresion = require("./ValorExpresion")
/*const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")*/

function FuncionesNativas(_expresion, _ambito){
    
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.ENTERO 
        || _expresion.tipo === TIPO_VALOR.BANDERA || _expresion.tipo === TIPO_VALOR.CARACTER
        || _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR
        ){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LENGTH){
        return _LENGTH(_expresion.opIzq, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LOWER){
        return _LOWER(_expresion.opIzq, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.UPPER){
        return _UPPER(_expresion.opIzq, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TRUNCATE){
        return _TRUNCATE(_expresion.opIzq, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.ROUND){
        return _ROUND(_expresion.opIzq, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TYPEOF){
        return _TYPEOF(_expresion.opIzq, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.TOCHARARRAY){
        return _TOCHAR(_expresion.opIzq, _ambito)
    }
    else{
        const llamada = require("./Operacion");
        return llamada(_expresion,_ambito)
    }
}

function _TOCHAR(_opIzq,_ambito){
    const valor = FuncionesNativas(_opIzq,_ambito)
    if(valor.tipo!=null && valor.tipo === TIPO_DATO.CADENA) {
        var resultado = valor.valor.split('')
        let res = []
        resultado.forEach(car => {
            const av = require("../Instruccion/Instruccion");
            res.push(av.nuevoValor(car, TIPO_DATO.CARACTER, valor.linea, valor.columna))
        });
            return{
                valor: res,
                tipo: TIPO_DATO.LISTA+" -> "+TIPO_DATO.CARACTER,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función TYPEOF porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)*/
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TOCHARARRAY porque el tipo es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function _TYPEOF(_opIzq, _ambito){
    const valor = FuncionesNativas(_opIzq,_ambito)
    if(valor.tipo!=null) {
        var resultado
        if (valor.tipo===TIPO_DATO.ENTERO){
            resultado="int"
        }else if (valor.tipo===TIPO_DATO.DECIMAL){
            resultado="double"
        }else if (valor.tipo===TIPO_DATO.CADENA){
            resultado="string"
        }else if (valor.tipo===TIPO_DATO.CARACTER){
            resultado="char"
        }else if (valor.tipo===TIPO_DATO.BANDERA){
            resultado="boolean"
        }else if (valor.tipo.search("VECTOR") !==-1){
            resultado="vector"
        }else if (valor.tipo.search("LISTA") !==-1){
            resultado="list"
        }
            return{
                valor: "\""+resultado+"\"",
                tipo: TIPO_DATO.CADENA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función TYPEOF porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)*/
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TYPEOF porque el tipo es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function _ROUND(_opIzq, _ambito){
    const valor = FuncionesNativas(_opIzq,_ambito)
    if(valor.tipo===TIPO_DATO.ENTERO || valor.tipo===TIPO_DATO.DECIMAL) {
        var resultado = Math.round(valor.valor);
            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función ROUND porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)*/
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función ROUND porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function _TRUNCATE(_opIzq, _ambito){
    const valor = FuncionesNativas(_opIzq,_ambito)
    if(valor.tipo===TIPO_DATO.ENTERO || valor.tipo===TIPO_DATO.DECIMAL) {
        var resultado = Math.trunc(valor.valor);
            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función TRUNCATE porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)*/
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TRUNCATE porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function _LOWER(_opIzq, _ambito){
    const valor = FuncionesNativas(_opIzq,_ambito)
    if(valor.tipo===TIPO_DATO.CADENA) {
        var cadena=valor.valor;
            var resultado = cadena.toLowerCase();
            return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función TO LOWER porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)*/
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TO LOWER porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function _UPPER(_opIzq, _ambito){
    const valor = FuncionesNativas(_opIzq,_ambito)
    if(valor.tipo===TIPO_DATO.CADENA) {
        var cadena=valor.valor;
            var resultado = cadena.toUpperCase();
            return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función UPPER porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)*/
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función TO UPPER porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function _LENGTH(_opIzq, _ambito){
    const valor = FuncionesNativas(_opIzq,_ambito)
    if(valor.tipo===TIPO_DATO.CADENA || valor.tipo.search("LISTA") !==-1 || valor.tipo.search("VECTOR") !==-1) {//falta agregar lista y vector
        var str=valor.valor;
            var resultado = str.length;
            return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
    }
    var respuesta = (valor.tipo===null ? valor.valor: "")
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`no se puede realizar la función LENGTH porque el valor es: ${valor.tipo}`,_opIzq.linea, _opIzq.columna);
    _Error.addErrores(nuevo)*/
    return{
        valor: respuesta+`Error Semantico: no se puede realizar la función LENGTH porque el valor es: ${valor.tipo}... Linea: ${_opIzq.linea} Columna: ${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = FuncionesNativas