const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TipoResultado = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")

function Aritmetica(_expresion, _ambito){
    //2+3+5+6+8+9
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BANDERA || _expresion.tipo === TIPO_VALOR.ENTERO||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA){// 2+6+7+2+9+10
        return suma(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.RESTA){// 2+6+7+2+9+10
        return resta(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multiplicacion(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DIVISION){
        return division(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.POTENCIA){
        return potencia(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MODULO){
        return modulo(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.NEGACION){
        return negacion(_expresion.opIzq, _ambito)
    }else{
        const llamada = require("./Operacion");
        return llamada(_expresion,_ambito)
    }
}

function suma(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo,"suma")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            let valor = opIzq.valor;
            let valor2 = opDer.valor;
            if(opIzq.tipo===TIPO_DATO.CARACTER){
                valor=opIzq.valor.charCodeAt(0);
            }
            if(opDer.tipo===TIPO_DATO.CARACTER){
                valor2=opDer.valor.charCodeAt(0);
            }
            if(opIzq.tipo== TIPO_DATO.BANDERA){
                if(opIzq.valor){
                    valor=1;
                }else {
                    valor=0;
                }
            }
            if(opDer.tipo== TIPO_DATO.BANDERA){
                if(opDer.valor){
                    valor2=1;
                }else {
                    valor2=0;
                }
            }
            var resultado =0;
            if (tipoRes === TIPO_DATO.DECIMAL){
                resultado= parseFloat(valor) + parseFloat(valor2);
            }else{
                resultado= Number(valor) + Number(valor2);
            }
            
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        else if(tipoRes === TIPO_DATO.CADENA){
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion suma... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function resta(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo,"resta")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            let valor = opIzq.valor;
            let valor2 = opDer.valor;
            if(opIzq.tipo===TIPO_DATO.BANDERA){
                if(opIzq.valor){
                    valor=1;
                }else{
                    valor=0;
                }
            }
            if(opDer.tipo===TIPO_DATO.BANDERA){
                if(opDer.valor){
                    valor2=1;
                }else{
                    valor2=0;
                }
            }
            if(opIzq.tipo===TIPO_DATO.CARACTER){
                val1=opIzq.valor.charCodeAt(0);
            }
            if(opDer.tipo===TIPO_DATO.CARACTER){
                val2=opDer.valor.charCodeAt(0);
            }
            
            var resultado = 0;
            if (tipoRes === TIPO_DATO.DECIMAL){
                resultado= parseFloat(valor) - parseFloat(valor2);
            }else{
                resultado= Number(valor) - Number(valor2);
            }
            
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion resta... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function multiplicacion(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, "multiplicacion")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            let valor=opIzq.valor; 
            let valor2=opDer.valor
            if(opIzq.tipo===TIPO_DATO.CARACTER){
                valor=opIzq.valor.charCodeAt(0);
            }
            if(opDer.tipo===TIPO_DATO.CARACTER){
                valor2=opDer.valor.charCodeAt(0);
            }
            
            let resultado = 0.0;
            if (tipoRes === TIPO_DATO.DECIMAL){
                resultado= parseFloat(valor) * parseFloat(valor2);
            }else{
                resultado= Number(valor) * Number(valor2);
            }
            
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion multiplicacion... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function division(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, "dividir")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){
            let valor=opIzq.valor; 
            let valor2=opDer.valor
            if(opIzq.tipo===TIPO_DATO.CARACTER){
                valor=opIzq.valor.charCodeAt(0);
            }
            if(opDer.tipo===TIPO_DATO.CARACTER){
                valor2=opDer.valor.charCodeAt(0);
            }
            const resultado = parseFloat(valor) / parseFloat(valor2);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion division... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function potencia(_opIzq, _opDer, _ambito){
    
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, "potencia")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            let resultado = 0;
            if (tipoRes === TIPO_DATO.DECIMAL){
                resultado= parseFloat(opIzq.valor);
            }else{
                resultado= Number(opIzq.valor);
            }
            var i= 0;
            for (i=1; i<opDer.valor; i++) {
                resultado = resultado * opIzq.valor;
            }
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion potencia... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function modulo(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, "modulo")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = parseFloat(opIzq.valor) % parseFloat(opDer.valor);
            return{
                valor: parseFloat(resultado),
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5ss
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion modulo... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function negacion(_opIzq, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo,opIzq.tipo, "negacion")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            let resultado = 0;
            if (tipoRes === TIPO_DATO.DECIMAL){
                resultado= -parseFloat(opIzq);
            }else{
                resultado= -Number(opIzq);
            }
            
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion negación... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function negacion(_opIzq, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const tipoRes = TipoResultado(opIzq.tipo,opIzq.tipo, "negacion")
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL || tipoRes === TIPO_DATO.ENTERO){
            var resultado = -Number(opIzq.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion negación... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Aritmetica