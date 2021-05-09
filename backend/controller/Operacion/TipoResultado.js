const TIPO_DATO = require("../Enums/TipoDato");

function TipoResultado(_tipo1, _tipo2,_operar){
    if( _operar==="suma"){
        if(_tipo1 === TIPO_DATO.ENTERO || _tipo2 === TIPO_DATO.ENTERO && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA && _tipo1!==TIPO_DATO.DECIMAL && _tipo2!==TIPO_DATO.DECIMAL) { return TIPO_DATO.ENTERO}
        else if(_tipo1 === TIPO_DATO.DECIMAL || _tipo2 === TIPO_DATO.DECIMAL && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA) { return TIPO_DATO.DECIMAL}
        else if(_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.CARACTER && _tipo1!==null && _tipo2!==null){ return TIPO_DATO.CADENA}
        else if ((_tipo1 === TIPO_DATO.CADENA || _tipo2 === TIPO_DATO.CADENA) && _tipo1!==null && _tipo2!==null) { return TIPO_DATO.CADENA}
    }
    else if( _operar==="resta" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA ){
        if(_tipo1 === TIPO_DATO.ENTERO || _tipo2 === TIPO_DATO.ENTERO && _tipo1!==TIPO_DATO.DECIMAL && _tipo2!==TIPO_DATO.DECIMAL) { return TIPO_DATO.ENTERO}
        else if(_tipo1 === TIPO_DATO.DECIMAL || _tipo2 === TIPO_DATO.DECIMAL) { return TIPO_DATO.DECIMAL}
    }
    else if( _operar==="multiplicacion" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA  && _tipo1!==TIPO_DATO.BANDERA && _tipo2!==TIPO_DATO.BANDERA){
        if(_tipo1 === TIPO_DATO.ENTERO || _tipo2 === TIPO_DATO.ENTERO && _tipo1!==TIPO_DATO.DECIMAL && _tipo2!==TIPO_DATO.DECIMAL) { return TIPO_DATO.ENTERO}
        else if(_tipo1 === TIPO_DATO.DECIMAL || _tipo2 === TIPO_DATO.DECIMAL) { return TIPO_DATO.DECIMAL}
    }
    else if( _operar==="dividir" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA  && _tipo1!==TIPO_DATO.BANDERA && _tipo2!==TIPO_DATO.BANDERA){
        { return TIPO_DATO.DECIMAL}
    }
    else if( _operar==="modulo" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA  && _tipo1!==TIPO_DATO.BANDERA && _tipo2!==TIPO_DATO.BANDERA && _tipo1!==TIPO_DATO.CARACTER && _tipo2!==TIPO_DATO.CARACTER){
        { return TIPO_DATO.DECIMAL}
    }
    else if( _operar==="potencia" && _tipo1!==TIPO_DATO.CADENA && _tipo2!==TIPO_DATO.CADENA  && _tipo1!==TIPO_DATO.BANDERA && _tipo2!==TIPO_DATO.BANDERA && _tipo1!==TIPO_DATO.CARACTER && _tipo2!==TIPO_DATO.CARACTER){
        if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO){ return TIPO_DATO.ENTERO}
        else { return TIPO_DATO.DECIMAL}
    }
    else if( _operar==="negacion" && (_tipo1===TIPO_DATO.ENTERO ||_tipo1===TIPO_DATO.DECIMAL) ){
        if(_tipo1 === TIPO_DATO.ENTERO){ return TIPO_DATO.ENTERO}
        else if(_tipo1 === TIPO_DATO.DECIMAL){ return TIPO_DATO.DECIMAL}
    }
    return null
}

module.exports = TipoResultado