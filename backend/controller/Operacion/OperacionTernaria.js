const TIPO_DATO = require("../Enums/TipoDato")
/*const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")
const TIPO_ERROR = require('../Enums/Tipo_Error')
const ERRORES = require("../Ambito/S_Error")*/

function OperacionTernaria(_instruccion, _ambito){
    const expresion=_instruccion.expresion
    const verdader=_instruccion.verdadero
    const falsedad=_instruccion.falso
    const Operacion = require("./Operacion")
    const condicion = Operacion(expresion, _ambito)
    const verdadero = Operacion(verdader, _ambito)
    const falso = Operacion(falsedad, _ambito)
    
    if(condicion.tipo=== TIPO_DATO.BANDERA){
        var retvalor, retTipo
        if(condicion.valor){
            retvalor = verdadero.valor
            retTipo= verdadero.tipo
        }else{
            retvalor = falso.valor
            retTipo= falso.tipo
        }
        return {
            valor: retvalor,
            tipo: retTipo,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
    }
    //var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,` La condición no es de tipo BANDERA, es: ${condicion.tipo}`,_instruccion.linea, _instruccion.columna);
    _Error.addErrores(nuevo)*/
    return{
        valor: `Error semántico: La condición no es de tipo BANDERA, es: ${condicion.tipo}... Linea: ${_instruccion.linea} Columna: ${_instruccion.linea}`,
        tipo: null,
        linea: _instruccion.linea,
        columna: _instruccion.columna
    }
}

module.exports = OperacionTernaria