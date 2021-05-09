const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_VALOR = require("../Enums/TipoValor");
const Operacion = require("../Operacion/Operacion");
const INSTRUCCION	= require('./Instruccion');
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
function Declaracion(_instruccion, _ambito){
    var cadena = null
    if(_instruccion.tipo_dato === TIPO_DATO.DECIMAL){
        
        var valor = 0.0
        if(_instruccion.valor != null){
            var op2 = Operacion(_instruccion.valor, _ambito)
            var op = null
            if (_instruccion.valor.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
                op = op2.valorRetorno
                cadena= op2.cadena
            }else{
                op = op2
            }
            tipo = op.tipo;
            if(tipo === TIPO_DATO.DECIMAL){
                valor = op.valor;
            }
            else {
                return cadena+"Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)!=false){
            return cadena+"Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return cadena
    }else if(_instruccion.tipo_dato=== TIPO_DATO.VECTOR){
        let agr = true;
        var valor_list = [];
        var mensaje=null;
        if(_instruccion.valores != null){ //DECLARACION TIPO 2
            _instruccion.valores.forEach(valor => {
                var op2 = Operacion(_instruccion.valor, _ambito)
                var op = null
                if (_instruccion.valor.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
                    op = op2.valorRetorno
                    cadena= op2.cadena
                }else{
                    op = op2
                }
                tipo = op.tipo;
                if(tipo === _instruccion.tipo_VL ){
                    valor_list.push(op);
                }else{
                    agregar = false;
                    console.log("error");
                    /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"No es posible asignar un valor de tipo "+tipo+" al vector '"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_VL,op.linea, op.columna);
                    _Error.addErrores(nuevo)*/
                    mensaje =  cadena+"Error Semantico:No es posible asignar un valor de tipo "+tipo+" al vector '"+ _instruccion.id +"' que es de tipo "+_instruccion.tipo_VL+"... Linea: "+op.linea+" Columna: "+ op.columna;
                    
                    
                }
            });
        }else{ //DECLARACION TIPO 1
            var dato=null;
            if(_instruccion.tipo_VL===TIPO_DATO.ENTERO){dato=INSTRUCCION.nuevoValor(0, TIPO_DATO.ENTERO,_instruccion.linea, _instruccion.columna)}
            else if(_instruccion.tipo_VL===TIPO_DATO.DECIMAL){dato=INSTRUCCION.nuevoValor(0.0, TIPO_DATO.DECIMAL,_instruccion.linea, _instruccion.columna)}
            else if(_instruccion.tipo_VL===TIPO_DATO.BANDERA){dato=INSTRUCCION.nuevoValor(true, TIPO_DATO.BANDERA,_instruccion.linea, _instruccion.columna)}
            else if(_instruccion.tipo_VL===TIPO_DATO.CARACTER){dato=INSTRUCCION.nuevoValor("\u0000", TIPO_DATO.CARACTER,_instruccion.linea, _instruccion.columna)}
            else if(_instruccion.tipo_VL===TIPO_DATO.CADENA){dato=INSTRUCCION.nuevoValor("", TIPO_DATO.CADENA,_instruccion.linea, _instruccion.columna)}
            
            if (_instruccion.tam.tipo === TIPO_VALOR.ENTERO){
                for (let i = 0; i < _instruccion.tam.valor; i++) {
                    valor_list.push(dato);              
                }
            }else{
                agregar = false;
                mensaje= "Error Semantico:No es posible declarar el vector si el tamano que es de tipo "+_instruccion.tam.tipo+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.linea;
            }
            
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor_list, _instruccion.tipo_dato+" -> "+_instruccion.tipo_VL,_instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            console.log("hay coincidencias")
            /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"El vector '"+ nuevoSimbolo.id +"' ya existe...",_instruccion.linea, _instruccion.columna);
            _Error.addErrores(nuevo)*/
            mensaje= "Error Semantico: El simbolo '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        if (agr){
            _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            //console.log(nuevoSimbolo)
        }
        return mensaje
    } else if(_instruccion.tipo_dato=== TIPO_DATO.LISTA){
        var valor_list = []
        var mensaje=null;
        let agr = true;
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor_list, _instruccion.tipo_dato+" -> "+_instruccion.tipo_VL,_instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"la lista '"+ nuevoSimbolo.id +"' ya existe...",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)*/
            agr = false
            mensaje = "Error Semantico: la lista'"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        if(agr){
            _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            //Simbol.add_s(nuevoSimbolo)
            //console.log(nuevoSimbolo)
        }
        return mensaje
    } else if(_instruccion.tipo_dato=== TIPO_DATO.LISTA+" -> "+TIPO_DATO.CARACTER){
        var valor_list = Operacion(_instruccion.valores, _ambito)
        
        var mensaje=null;
        let agr = true;
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor_list.valor, _instruccion.tipo_dato,_instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            /*var nuevo=new ERRORES(TIPO_ERROR.SEMANTICO,"la lista '"+ nuevoSimbolo.id +"' ya existe...",_instruccion.linea, _instruccion.columna);
                _Error.addErrores(nuevo)*/
            agr = false
            mensaje = "Error Semantico: la lista'"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        if(agr){
            _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            //Simbol.add_s(nuevoSimbolo)
            //console.log(nuevoSimbolo)
        }
        return mensaje
    }else if(_instruccion.tipo_dato === TIPO_DATO.ENTERO){
        var valor = 0
        if(_instruccion.valor != null){
            var op2 = Operacion(_instruccion.valor, _ambito)
            var op = null
            if (_instruccion.valor.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
                op = op2.valorRetorno
                cadena= op2.cadena
                
            }else{
                op = op2
            }
            tipo = op.valorRetorno.tipo;
            if(tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
            }
            else {
                return "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return cadena
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.CADENA){
        var valor = "" // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null){
            var op2 = Operacion(_instruccion.valor, _ambito)
            var op = null
            if (_instruccion.valor.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
                op = op2.valorRetorno
                cadena= op2.cadena
            }else{
                op = op2
            }
            valor = String(op.valor) //casteamos a cadena
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return cadena
        //console.log(_ambito)
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.CARACTER){
        var valor = "\u0000" // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null){
            var op2 = Operacion(_instruccion.valor, _ambito)
            var op = null
            if (_instruccion.valor.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
                op = op2.valorRetorno
                cadena= op2.cadena
            }else{
                op = op2
            }
            valor = String(op.valor) //casteamos a cadena
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CARACTER, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return cadena
        //console.log(_ambito)
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.BANDERA){
        var valor = false // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null){
            var op2 = Operacion(_instruccion.valor, _ambito)
            var op = null
            if (_instruccion.valor.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
                op = op2.valorRetorno
                cadena= op2.cadena
            }else{
                op = op2
            }
            tipo = op.tipo
            //verificamos que el valor a asignar sea del mismo tipo
            if(tipo===TIPO_DATO.BANDERA){
                valor = Boolean(op.valor)
            }
            else{
                return "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.BANDERA+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BANDERA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimbolo(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return cadena
        //console.log(_ambito)
    }
}

module.exports = Declaracion