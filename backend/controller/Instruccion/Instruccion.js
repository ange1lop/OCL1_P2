const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
function nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna){
    return {
        opIzq: _opIzq,
        opDer: _opDer,
        tipo: _tipo,
        linea: _linea,
        columna: _columna
    }
}
const Instruccion = {
    nuevoCout: function(_expresion, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.COUT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna 
        }
    },
    nuevoValor:function(_valor, _tipo, _linea, _columna){
        return{
            tipo: _tipo,
            valor: _valor,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaDeclaracion_2: function(_id, _tam,_valor, _tipoVector,_tipo, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valores: _valor,
            tam:_tam,
            tipo_dato: _tipoVector+" -> "+_tipo,//vector o lista
            tipo_VL:  _tipo, // string, int, double..... etc
            linea: _linea,
            columna: _columna
        }
    },
    nuevaOperacionBinaria: function(_opIzq, _opDer, _tipo, _linea, _columna){
        return nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna)
    },
    nuevaDeclaracion: function(_id, _valor, _tipo, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaDeclaracion_Vector: function(_id, _tam,_valor, _tipoVector,_tipo, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valores: _valor,
            tam:_tam,
            tipo_dato: _tipoVector,//vector o lista
            tipo_VL:  _tipo, // string, int, double..... etc
            linea: _linea,
            columna: _columna
        }
    },
    nuevaAsignacion: function(_id, _expresion, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaAsignacion2: function(_expresion, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _expresion.opIzq.valor,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoDoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DO_WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaFuncion: function(_tipo,_nombre, _lista_parametros, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DEC_FUNCION,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            devuelve: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoMetodo: function(_nombre, _lista_parametros, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DEC_METODO,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoFor: function(_variable, _expresionLogica, _aumento, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.FOR,
            expresionLogica: _expresionLogica,
			instrucciones: _instrucciones,
			aumento: _aumento,
			variable: _variable,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoExec: function(_nombre, _lista_valores, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.EXEC,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaLlamada: function(_nombre, _lista_valores, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.LLAMADA_METODO,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoIf: function(_expresion, _instrucciones, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoIfElse: function(_expresion, _instruccionesIf, _instruccionesElse, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.IFCE,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoElseIf: function(_expresion, _instruccionesElseIf, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.ELSEIF,
			expresion: _expresion,
			instruccionesElseIf: _instruccionesElseIf,
            linea: _linea,
            columna: _columna
		}
    },
    nuevoIfConElseIf: function(_expresion, _instruccionesIf, _lista_elseif, _instruccionesElse, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.IFCEIF,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            lista_elseif: _lista_elseif,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoBreak: function(_linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.BREAK,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoCasteo: function(_tipodedato, _valor, _linea, _columna) {
		return {
			tipo: TIPO_OPERACION.CASTEO,
			tipodedato:_tipodedato,
            valor:_valor,
            linea: _linea,
            columna: _columna
		}
	},
    nuevoSwitch: function(_expresion, _casos, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.SWITCH,
			expresion: _expresion,
			casos: _casos,
            linea: _linea,
            columna: _columna
		}
    },
    nuevoCase: function(_expresion, _instrucciones, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.CASE,
			expresion: _expresion,
			instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
		}
	},
    nuevoTernario: function(_expresion, _verdadero, _falso, _linea, _columna){
        return {
            tipo: TIPO_OPERACION.TERNARIO,
            expresion: _expresion,
            verdadero: _verdadero,
            falso: _falso,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoDefault: function(_instrucciones, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.DEFAULT,
			instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
		}
	},
    nuevaAsigVector: function(_id, _expresion, _valor,_linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.MODIFICAR_VECTOR,
            id: _id,
            posicion: _expresion,
            valor:_valor,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaAddLista: function(_id, _valor,_linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.AGREGAR_LISTA,
            id: _id,
            valor:_valor,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoAccesoVector: function(_id, _expresion, _linea, _columna){
        return {
            tipo: TIPO_OPERACION.ACCESO_VECTOR,
            id: _id,
            posicion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoAccesoLista: function(_id, _expresion, _linea, _columna){
        return {
            tipo: TIPO_OPERACION.ACCESO_LISTA,
            id: _id,
            posicion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoContinue: function( _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.CONTINUE,
            linea: _linea,
            columna: _columna
		}
	},
    nuevoReturn: function(_valor, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.RETURN,
            valor:_valor,
            linea: _linea,
            columna: _columna
		}
	}
}

module.exports = Instruccion