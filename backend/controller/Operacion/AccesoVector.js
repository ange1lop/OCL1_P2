const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");
function AccesoVector(_instruccion, _ambito){
    let valor =null
    let valores=[]
    let posicion=Operacion(_instruccion.posicion, _ambito)
    let posicionDato=Operacion(_instruccion.posicion, _ambito)
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        
        let simbolo = _ambito.getSimbolo(id)
        if (simbolo.tipo.search("VECTOR") ===-1){
            
            return {
                valor: `Error Semantico: El tipo de dato no es un vector: ${simbolo.tipo},... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
                tipo: null,
                linea: _instruccion.linea,
                columna: _instruccion.columna
            }
        }
        valores=simbolo.valor
        var tam=valores.length;
        if(posicion.valor<tam && posicion.valor>=0){
            if(posicionDato.tipo===TIPO_DATO.ENTERO){
                valor=valores[posicion.valor];
                
            }else{
                /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`La posición ingresada: ${posicion} es de tipo  ${_instruccion.posicion.tipo}, solo se aceptan de tipo: ${TIPO_DATO.ENTERO}`,_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)*/
                return{
                    valor: `Error Semantico: La posición ingresada: ${posicion.valor} es de tipo  ${_instruccion.posicion.tipo}, solo se aceptan de tipo: ${TIPO_DATO.ENTERO}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
                    tipo: null,
                    linea: _instruccion.linea,
                    columna: _instruccion.columna
                }
            }
            
        }else{
            /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`La posición ingresada: ${posicion} no cumple con la longitud del vector`,_instruccion.linea, _instruccion.columna);
            _Error.addErrores(nuevo)*/
            return{
                valor: `Error Semantico: La posición ingresada: ${posicion.valor} no cumple con la longitud del vector... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
                tipo: null,
                linea: _instruccion.linea,
                columna: _instruccion.columna
            }
        }
        return{
            valor: valor.valor,
            tipo: valor.tipo,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
    }
    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,`el vector '${String(id)}' no existe.`,_instruccion.linea, _instruccion.columna);
        _Error.addErrores(nuevo)*/
        return {
            valor: `Error Semantico: el vector '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
            tipo:null,
            linea: _instruccion.linea,
            columna: _instruccion.columna
        }
}


module.exports = AccesoVector