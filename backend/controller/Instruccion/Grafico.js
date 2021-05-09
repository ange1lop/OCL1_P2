const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_VALOR = require("../Enums/TipoValor");
const TIPO_OPERACION = require("../Enums/TipoOperacion");

function GDot(instruccion, padre,label_padre){
    var cadena = ""
    //console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{_instrucciones")
   // console.log(instruccion)
   // console.log("--------------------------------------------------------------")
    if(instruccion!=null){
        if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_M || instruccion.tipo === TIPO_INSTRUCCION.DECLARACION_F){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna+instruccion.nombre
            const param=tipo+"_param"
            const nombre=tipo+"id"
            cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` //instruccion 
            cadena+=`\"${tipo}\" [label= \"${instruccion.tipo}\"]; \n`
            var a="";
            if(instruccion.lista_parametros!=null){
                instruccion.lista_parametros.forEach(e => {
                    a+= e.tipo_dato+","
                });
            }
            cadena+=`\"${param}\" [label= \"Parametros:\n( ${a} )\"]; \n`
            cadena+=`\"${nombre}\" [label= \"Id: ${instruccion.nombre}\"]; \n`
            
            cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` //instruccion 
            cadena+=`\"${tipo}\" -> \"${param}\"\n` //tipo de variable
            cadena+=`\"${tipo}\" -> \"${nombre}\"\n` // el id de la variable
            
            instruccion.instrucciones.forEach(e => {
                cadena+= GDot(e, tipo,instruccion.tipo)
            });
            
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.EXEC || instruccion.tipo === TIPO_INSTRUCCION.LLAMADA){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna+instruccion.nombre
            const nombre=tipo+instruccion.nombre

            cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
            cadena+=`\"${nombre}\" [label= \"Id: ${instruccion.nombre}\"]; \n`
            cadena+=`\"${tipo}\" [label= \"${instruccion.tipo}\"]; \n`
            
            
            cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` //instruccion 
            cadena+=`\"${tipo}\" -> \"${nombre}\"\n`

        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            const tipo_dato=tipo+instruccion.tipo_dato
            const nombre=tipo+instruccion.id

            cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
            cadena+=`\"${nombre}\" [label= \"Id: ${instruccion.id}\"]; \n`
            cadena+=`\"${tipo}\" [label= \"${instruccion.tipo}\"]; \n`
            cadena+=`\"${tipo_dato}\" [label= \"${instruccion.tipo_dato}\"]; \n`
            
            
            cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` //instruccion 
            cadena+=`\"${tipo}\" -> \"${tipo_dato}\"\n`
            cadena+=`\"${tipo}\" -> \"${nombre}\"\n`

            cadena+= GDot(instruccion.valor, tipo,instruccion.tipo)
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
            cadena+=`\"${tipo}\" [label= \"${instruccion.tipo}\"]; \n`
    
            cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` 

            cadena+= GDot(instruccion.expresion, tipo,instruccion.tipo)
        }
        
        else if(instruccion.tipo === TIPO_INSTRUCCION.CASTEO){
            const nodopadre=padre
            const de=instruccion.tipo+instruccion.valor.linea+instruccion.valor.columna
            const a=instruccion.tipodedato+instruccion.linea+instruccion.columna
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
            cadena+=`\"${de}\" [label= \"${instruccion.valor.tipo}\\n${instruccion.valor.valor}\"]; \n`
            cadena+=`\"${a}\" [label= \"${instruccion.tipodedato}\"]; \n`
            cadena+=`\"${tipo}\" [label= \"${instruccion.tipo}\"]; \n`
            cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` //instruccion 
            cadena+=`\"${tipo}\" -> \"${de}\"\n` //instruccion 
            cadena+=`\"${tipo}\" -> \"${a}\"\n` //instruccion 
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            const nombre=tipo+instruccion.expresion.tipo

            cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
            cadena+=`\"${nombre}\" [label= \"Id: ${instruccion.id}\"]; \n`
            cadena+=`\"${tipo}\" [label= \"${instruccion.tipo}\"]; \n`
            
            
            cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` //instruccion 
            cadena+=`\"${tipo}\" -> \"${nombre}\"\n`

            cadena+= GDot(instruccion.expresion, tipo,instruccion.tipo)
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            var cadenadesigno=instruccion.tipo;

                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n`

            cadena+= GDot(instruccion.expresion, tipo,cadenadesigno)
            instruccion.instrucciones.forEach(e => {
                cadena+= GDot(e, tipo,instruccion.tipo)
            });
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.DO_WHILE){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            var cadenadesigno=instruccion.tipo;

                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n`
                
            cadena+= GDot(instruccion.expresion, tipo,cadenadesigno)
            instruccion.instrucciones.forEach(e => {
                cadena+= GDot(e, tipo,instruccion.tipo)
            });
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            var cadenadesigno=instruccion.tipo;

                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n`
                
            cadena+= GDot(instruccion.expresion, tipo,cadenadesigno)
            instruccion.instrucciones.forEach(e => {
                cadena+= GDot(e, tipo,instruccion.tipo)
            });
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            var cadenadesigno=instruccion.tipo;

                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n`
                
            cadena+= GDot(instruccion.expresion, tipo,cadenadesigno)
            var cont=0;
            var l="";
            var lista="";
            instruccion.casos.forEach(e => {
                if(e.tipo===TIPO_INSTRUCCION.SWITCH_CASO){
                    lista="lista"+instruccion.linea+instruccion.columna
                    l= "Lista\\nCasos"
                    cont++;
                    cadena+= GDot(e, lista,l)
                }else{
                    cadena+= GDot(e, tipo,cadenadesigno)
                }
            });
            if(cont!=0){
                cadena+=`\"${lista}\" [label= \"${l}\"]; \n`
                cadena+=`\"${tipo}\" -> \"${lista}\"\n`
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ELSEIF){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            var cadenadesigno=instruccion.tipo;

                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n`
                
            cadena+= GDot(instruccion.expresion, tipo,cadenadesigno)
            instruccion.instrucciones.forEach(e => {
                cadena+= GDot(e, tipo,cadenadesigno)
            });
            var cont=0;
            var l="";
            var lista="";
            instruccion.casos.forEach(e => {
                if(e.tipo===TIPO_INSTRUCCION.ELSEIF_OP){
                    lista="lista"+instruccion.linea+instruccion.columna
                    l= "Lista\\nElse-If"
                    cont++;
                    cadena+= GDot(e, lista,l)
                }else{
                    cadena+= GDot(e, tipo,cadenadesigno)
                }
            });
            if(cont!=0){
                cadena+=`\"${lista}\" [label= \"${l}\"]; \n`
                cadena+=`\"${tipo}\" -> \"${lista}\"\n`
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ELSEIF_OP || instruccion.tipo === TIPO_INSTRUCCION.ELSEIF_ELSE
            ||instruccion.tipo === TIPO_INSTRUCCION.SWITCH_CASO || instruccion.tipo === TIPO_INSTRUCCION.SWITCH_DEFECTO
            ){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            var cadenadesigno=instruccion.tipo;

                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n`
                
            cadena+= GDot(instruccion.expresion, tipo,cadenadesigno)
            instruccion.instrucciones.forEach(e => {
                cadena+= GDot(e, tipo,instruccion.tipo)
            });
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            const nodopadre=padre
            const tipo=instruccion.tipo+instruccion.linea+instruccion.columna
            const condicion="condicion"+instruccion.linea+instruccion.columna
            var cadenadesigno=instruccion.tipo;

                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
                cadena+=`\"${condicion}\" [label= \"Condicion\\ndel for\"]; \n`
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n`
                cadena+=`\"${tipo}\" -> \"${condicion}\"\n`

            cadena+= GDot(instruccion.valorVariable, condicion,"Condicion\\ndel for")
            cadena+= GDot(instruccion.expresionLogica, condicion,"Condicion\\ndel for")
            cadena+= GDot(instruccion.aumento, condicion,"Condicion\\ndel for")
            instruccion.instrucciones.forEach(e => {
                cadena+= GDot(e, tipo,instruccion.tipo)
            });
        }

//-------------------------------------------------------------------------------------------------OPERACION
        else if(instruccion.tipo===TIPO_OPERACION.TERNARIO){
                const nodopadre=padre
                const tipo=instruccion.tipo+instruccion.linea+instruccion.columna

                var cadenadesigno=instruccion.tipo;
                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` 

                cadena+= GDot(instruccion.expresion, tipo,cadenadesigno)
                cadena+= GDot(instruccion.verdadero, tipo,cadenadesigno)
                cadena+= GDot(instruccion.falso, tipo,cadenadesigno)
                
        }
        else if(instruccion.tipo === TIPO_VALOR.DECIMAL || instruccion.tipo === TIPO_VALOR.ENTERO 
                || instruccion.tipo === TIPO_VALOR.BANDERA || instruccion.tipo === TIPO_VALOR.CARACTER
                || instruccion.tipo === TIPO_VALOR.CADENA || instruccion.tipo === TIPO_VALOR.IDENTIFICADOR
        ){
            const nodopadre=padre
            const nombre=instruccion.tipo+instruccion.linea+instruccion.columna

            cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
            cadena+=`\"${nombre}\" [label= \"${instruccion.tipo}\\n${instruccion.valor}\"]; \n`
            cadena+=`\"${nodopadre}\" -> \"${nombre}\"\n` //instruccion 
        }
        else if(instruccion.tipo === TIPO_OPERACION.SUMA || instruccion.tipo === TIPO_OPERACION.RESTA ||
            instruccion.tipo === TIPO_OPERACION.MULTIPLICACION ||instruccion.tipo === TIPO_OPERACION.DIVISION ||
            instruccion.tipo === TIPO_OPERACION.MODULO || instruccion.tipo === TIPO_OPERACION.POTENCIA ||
            instruccion.tipo === TIPO_OPERACION.NEGACION
            ){
                var signo;
                const nodopadre=padre
                const tipo=instruccion.tipo+instruccion.linea+instruccion.columna+instruccion.opIzq.valor

                if(instruccion.tipo === TIPO_OPERACION.SUMA){signo="+"}
                else if(instruccion.tipo === TIPO_OPERACION.RESTA){signo="-"}
                else if(instruccion.tipo === TIPO_OPERACION.MULTIPLICACION){signo="*"}
                else if(instruccion.tipo === TIPO_OPERACION.DIVISION){signo="/"}
                else if(instruccion.tipo === TIPO_OPERACION.MODULO){signo="%"}
                else if(instruccion.tipo === TIPO_OPERACION.POTENCIA){signo="^"}
                else if(instruccion.tipo === TIPO_OPERACION.NEGACION){signo="-"}
                var cadenadesigno=instruccion.tipo+"\\n"+signo;
                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` 
    
                cadena+= GDot(instruccion.opIzq, tipo,cadenadesigno)
                if(instruccion.tipo != TIPO_OPERACION.NEGACION){
                    cadena+= GDot(instruccion.opDer, tipo,cadenadesigno)
                }
        }
    
        else if(instruccion.tipo === TIPO_OPERACION.IGUALIGUAL || instruccion.tipo === TIPO_OPERACION.DIFERENTE ||
            instruccion.tipo === TIPO_OPERACION.MENOR || instruccion.tipo === TIPO_OPERACION.MAYOR||
            instruccion.tipo === TIPO_OPERACION.MENORIGUAL || instruccion.tipo === TIPO_OPERACION.MAYORIGUAL
        ){
            var signo;
                const nodopadre=padre
                const tipo=instruccion.tipo+instruccion.linea+instruccion.columna+instruccion.opIzq.valor

                if(instruccion.tipo === TIPO_OPERACION.IGUALIGUAL){signo="=="}
                else if(instruccion.tipo === TIPO_OPERACION.DIFERENTE){signo="!="}
                else if(instruccion.tipo === TIPO_OPERACION.MENOR){signo="<"}
                else if(instruccion.tipo === TIPO_OPERACION.MAYOR){signo=">"}
                else if(instruccion.tipo === TIPO_OPERACION.MENORIGUAL){signo="<="}
                else if(instruccion.tipo === TIPO_OPERACION.MAYORIGUAL){signo=">="}
                var cadenadesigno=instruccion.tipo+"\\n"+signo;
                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` 
    
                cadena+= GDot(instruccion.opIzq, tipo,cadenadesigno)
                cadena+= GDot(instruccion.opDer, tipo,cadenadesigno)
                
        }
        else if(instruccion.tipo === TIPO_OPERACION.OR || instruccion.tipo === TIPO_OPERACION.AND
            || instruccion.tipo === TIPO_OPERACION.NOT
        ){
            var signo;
                const nodopadre=padre
                const tipo=instruccion.tipo+instruccion.linea+instruccion.columna+instruccion.opIzq.valor

                if(instruccion.tipo === TIPO_OPERACION.OR){signo="||"}
                else if(instruccion.tipo === TIPO_OPERACION.AND){signo="&&"}
                else if(instruccion.tipo === TIPO_OPERACION.NOT){signo="!"}
            
                var cadenadesigno=instruccion.tipo+"\\n"+signo;
                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` 
    
                cadena+= GDot(instruccion.opIzq, tipo,cadenadesigno)
                if(instruccion.tipo != TIPO_OPERACION.NOT){
                    cadena+= GDot(instruccion.opDer, tipo,cadenadesigno)
                }
        }
        else if(instruccion.tipo===TIPO_OPERACION.LENGTH || instruccion.tipo===TIPO_OPERACION.UPPER || instruccion.tipo===TIPO_OPERACION.LOWER
            ||instruccion.tipo===TIPO_OPERACION.TRUNCATE || instruccion.tipo===TIPO_OPERACION.ROUND || instruccion.tipo===TIPO_OPERACION.TYPEOF 
            ){
                const nodopadre=padre
                const tipo=instruccion.tipo+instruccion.linea+instruccion.columna+instruccion.opIzq.valor
                var cadenadesigno=instruccion.tipo;

                cadena+=`\"${nodopadre}\" [label= \"${label_padre}\"]; \n` 
                cadena+=`\"${tipo}\" [label= \"${cadenadesigno}\"]; \n`
        
                cadena+=`\"${nodopadre}\" -> \"${tipo}\"\n` 
    
                cadena+= GDot(instruccion.opIzq, tipo,cadenadesigno)
            }
    }
    return cadena
}

module.exports = GDot