
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive

%%

\s+                   /* skip whitespace */
"//".*							// comentario unilinea 
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  // comentario en varias lineas
//Tipos de datos
"void"                  return 'void'
"new"                   return 'nnew'
"int"                   return 'int'
"double"                return 'double'
"boolean"               return 'boolean'
"char"                  return 'char'
"string"                return 'string'
"true"                  return 'true'
"false"                return 'false'
"add"                  return 'add'
"toLower"                  return 'toLower'
"toUpper"                  return 'toUpper'
"length"                   return 'length'
"truncate"                 return 'truncate'
"round"                    return 'round'
"typeof"                   return 'typeof'
"toString"                 return 'tostring'
"toCharArray"              return 'tochararray'
[0-9]+("."[0-9]+)\b 	return 'NUMBERD'
[0-9]+\b  return 'NUMBER'

"print"               return 'print'
"while"               return 'while'
"exec"               return 'exec'
"if"               return 'if'
"switch"            return 'switch'
"case"              return 'case'
"break"               return 'break'
"return"              return 'return'
"continue"            return 'continue'
"for"                 return 'for'
"do"                  return 'do'
"else"               return 'else'
"default"             return 'default'
"list"                return 'list'
// FUNCIONES DEL SISTEMA
"toString"             return 'tostring'
"?"                    return 'interrogacion'
"||"                   return 'or'
"=="                   return 'igualigual'
"&&"                   return 'and'
"="                    return 'igual'
"!="                   return 'diferente'
"<="                   return 'menorigual'
">="                   return 'mayorigual'
">"                   return 'mayor'
"<"                   return 'menor'
","                   return 'coma'
";"                   return 'ptcoma'
"{"                   return 'llaveA'
"}"                   return 'llaveC'
"*"                   return 'multi'
"++"                   return 'masmas'
":"                     return 'dospuntos'
"."                     return 'punto'
"--"                   return 'menosmenos'
"/"                   return 'div'
"-"                   return 'menos'
"+"                   return 'suma'
"^"                   return 'exponente'
"!"                   return 'not'
"%"                   return 'modulo'
"("                   return 'parA'
")"                   return 'parC'
"PI"                  return 'PI'
//VECTOR
"["                   return 'corA'
"]"                   return 'corC'
"E"                   return 'E'

([a-zA-Z])([a-zA-Z0-9_])* return 'identificador'
["\""]([^"\""])*["\""] return 'CADENA'
["\'"]([^"\'"])?["\'"]          return 'CARACTER'

<<EOF>>               return 'EOF'
.                     { var nuevo=new ERROR(TIPO_ERROR.LEXICO,"Caracter invalido: "+yytext,yylloc.first_line,yylloc.first_column+1);lista_Errores.push(nuevo);}

/lex
%{
  var lista_Errores = []
  const TIPO_ERROR        = require('./controller/Enums/TipoError');
  const ERROR            = require("./controller/Ambito/Error")
	const TIPO_OPERACION	= require('./controller/Enums/TipoOperacion');
	const TIPO_VALOR 		= require('./controller/Enums/TipoValor');
	const TIPO_DATO			= require('./controller/Enums/TipoDato'); //para jalar el tipo de dato
	const INSTRUCCION	= require('./controller/Instruccion/Instruccion');
%}

/* operator associations and precedence */
%left interrogacion
%left 'or'
%left 'and'
%right 'not'
%left 'igualigual' 'diferente' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'menos' 'masmas' 'menosmenos'
%left 'multi' 'div' 'modulo' 
%left 'exponente'
left 'parA' 'parC'

%left  umenos casteos


%start INICIO

%% /* language grammar */

INICIO: OPCIONESCUERPO EOF{var a={'errores':lista_Errores,'arbol':$1}; lista_Errores=[]; return a;}
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO {$1.push($2); $$=$1;}
              | CUERPO {$$=[$1];}
;

CUERPO: DEC_VAR {$$=$1}
      | DEC_MET {$$=$1}
      | AS_VAR {$$=$1}
      | EXEC {$$=$1}
      | error ptcoma {$$ = ""; var nuevo=new ERROR(TIPO_ERROR.SINTACTICO,"Falto un \";\",Error recuperado: "+yytext,this._$.first_line, (this._$.first_column+1));lista_Errores.push(nuevo);}
;

EXEC: exec identificador parA parC ptcoma {$$ = INSTRUCCION.nuevoExec($2, null, this._$.first_line,this._$.first_column+1)}
    | exec identificador parA LISTAVALORES parC ptcoma {$$ = INSTRUCCION.nuevoExec($2, $4, this._$.first_line,this._$.first_column+1)}
;

LLAMADA_METODO: identificador parA parC ptcoma {$$ = INSTRUCCION.nuevaLlamada($1, null, this._$.first_line,this._$.first_column+1)}
              | identificador parA LISTAVALORES parC ptcoma {$$ = INSTRUCCION.nuevaLlamada($1, $3, this._$.first_line,this._$.first_column+1)}
;

LLAMADA_EX: identificador parA parC {$$ = INSTRUCCION.nuevaLlamada($1, null, this._$.first_line,this._$.first_column+1)}
              | identificador parA LISTAVALORES parC {$$ = INSTRUCCION.nuevaLlamada($1, $3, this._$.first_line,this._$.first_column+1)}
;

LISTAVALORES: LISTAVALORES coma EXPRESION {$1.push($3); $$=$1}
            | EXPRESION {$$=[$1]}
;

AS_VAR: identificador igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line,this._$.first_column+1)}
        | identificador corA EXPRESION corC igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaAsigVector($1,$3,$6,this._$.first_line, (this._$.first_column+1));}
        | identificador punto add parA EXPRESION parC ptcoma {$$ = INSTRUCCION.nuevaAddLista($1,$5, this._$.first_line, (this._$.first_column+1));}
;

DEC_VAR: TIPO identificador ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
       | TIPO identificador igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line,this._$.first_column+1)}
       | TIPO corA corC identificador igual nnew TIPO corA EXPRESION corC ptcoma {$$ = INSTRUCCION.nuevaDeclaracion_Vector($4, $9,null,TIPO_DATO.VECTOR ,$1, this._$.first_line, (this._$.first_column+1));}
       | TIPO corA corC identificador igual llaveA LISTAVALORES llaveC ptcoma {$$ = INSTRUCCION.nuevaDeclaracion_Vector($4, 0,$7,TIPO_DATO.VECTOR, $1, this._$.first_line, (this._$.first_column+1));}
       | list menor TIPO mayor identificador igual nnew list menor TIPO mayor ptcoma {$$ = INSTRUCCION.nuevaDeclaracion_Vector($5, 0,null,TIPO_DATO.LISTA ,$3, this._$.first_line, (this._$.first_column+1));}
       | list menor TIPO mayor identificador igual EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDeclaracion_2($5, 0,$7,TIPO_DATO.LISTA ,$3, this._$.first_line, (this._$.first_column+1));}
;

TIPO: int {$$ = TIPO_DATO.ENTERO}
    | string {$$ = TIPO_DATO.CADENA}
    | boolean {$$ = TIPO_DATO.BANDERA}
    | double {$$ = TIPO_DATO.DECIMAL}
    | char {$$ = TIPO_DATO.CARACTER}
;

TIPOCASTEO: double      {$$ = TIPO_DATO.DECIMAL}
        | int           {$$ = TIPO_DATO.ENTERO}
        | char          {$$ = TIPO_DATO.CARACTER}
;

INCREMENTOS: identificador masmas {$$ = INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoValor( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1)),INSTRUCCION.nuevoValor( 1, TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1)),TIPO_OPERACION.SUMA, this._$.first_line, (this._$.first_column+1));}
        | identificador menosmenos {$$ = INSTRUCCION.nuevaOperacionBinaria(INSTRUCCION.nuevoValor( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1)),INSTRUCCION.nuevoValor( 1, TIPO_VALOR.ENTERO, this._$.first_line, (this._$.first_column+1)),TIPO_OPERACION.RESTA, this._$.first_line, (this._$.first_column+1));}
;

TERNARIO: EXPRESION interrogacion EXPRESION dospuntos EXPRESION       {$$ = INSTRUCCION.nuevoTernario($1,$3,$5,this._$.first_line,this._$.first_column+1);}
;

EXPRESION: EXPRESION suma EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menos EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION multi EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line,this._$.first_column+1);}
         | EXPRESION div EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line,this._$.first_column+1);}
         | EXPRESION exponente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION modulo EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line,this._$.first_column+1);}
         | menos EXPRESION %prec umenos {$$= INSTRUCCION.nuevaOperacionBinaria($2,null, TIPO_OPERACION.NEGACION,this._$.first_line,this._$.first_column+1);}
         | parA EXPRESION parC {$$=$2}
         | EXPRESION igualigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION diferente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION mayor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION mayorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION or EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION and EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1);}
         | not EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($2,null, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1);}
         | parA TIPOCASTEO parC EXPRESION %prec casteos    { $$ = INSTRUCCION.nuevoCasteo($2,$4, this._$.first_line, (this._$.first_column+1));}
         | identificador corA EXPRESION corC {$$ = INSTRUCCION.nuevoAccesoVector( $1, $3, this._$.first_line, (this._$.first_column+1));}
         | identificador corA corA EXPRESION corC corC       {$$ = INSTRUCCION.nuevoAccesoLista( $1, $4, this._$.first_line, (this._$.first_column+1));}
         | tostring parA EXPRESION parC     { $$ = INSTRUCCION.nuevoCasteo(TIPO_DATO.CADENA,$3, this._$.first_line, (this._$.first_column+1));}
         | NUMBER {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.ENTERO, this._$.first_line,this._$.first_column+1)}
         | NUMBERD {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)}
         | true {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
         | false {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
         | CADENA {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1)}
         | CARACTER {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CARACTER, this._$.first_line,this._$.first_column+1)}
         | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)}
         | INCREMENTOS {$$=$1}
         | LLAMADA_EX {$$=$1}
         | TERNARIO %prec terna  {$$=$1;}
         | FUNCIONESSYSTEM {$$=$1;}
         
;


FUNCIONESSYSTEM: length parA LONGPARAM parC       {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.LENGTH, this._$.first_line, (this._$.first_column+1));}
        | toLower parA EXPRESION parC       {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.LOWER, this._$.first_line, (this._$.first_column+1));}
        | toUpper parA EXPRESION parC       {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.UPPER, this._$.first_line, (this._$.first_column+1));}
        | truncate parA EXPRESION parC      {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TRUNCATE, this._$.first_line, (this._$.first_column+1));}
        | round parA EXPRESION parC         {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.ROUND, this._$.first_line, (this._$.first_column+1));}
        | typeof parA EXPRESION parC        {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TYPEOF, this._$.first_line, (this._$.first_column+1));}
        | tochararray parA EXPRESION parC   {$$ = INSTRUCCION.nuevaOperacionBinaria($3,$3, TIPO_OPERACION.TOCHARARRAY, this._$.first_line, (this._$.first_column+1));}
;

LONGPARAM:cadenatexto        {$$ = INSTRUCCION.nuevoValor( $1, TIPO_VALOR.CADENA, this._$.first_line, (this._$.first_column+1));}
        | identificador       {$$ = INSTRUCCION.nuevoValor( $1, TIPO_VALOR.IDENTIFICADOR,this._$.first_line, (this._$.first_column+1));}
;

DEC_MET : void identificador parA parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoMetodo($2, null, $6, this._$.first_line,this._$.first_column+1)}
        | void identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevoMetodo($2, $4, $7, this._$.first_line,this._$.first_column+1)}
        | TIPO identificador parA parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevaFuncion($1,$2, null, $6, this._$.first_line, (this._$.first_column+1));}
        | TIPO identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC {$$ = INSTRUCCION.nuevaFuncion($1,$2, $4, $7, this._$.first_line, (this._$.first_column+1));}
;

LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS {$1.push($3); $$=$1;}
               | PARAMETROS {$$=[$1];}
;

PARAMETROS: TIPO identificador {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
;

OPCIONESMETODO: OPCIONESMETODO CUERPOMETODO  {$1.push($2); $$=$1;}
              | CUERPOMETODO {$$=[$1];}
              | error ptcoma {$$ = [];var nuevo=new ERROR(TIPO_ERROR.SINTACTICO,"Falto un \";\",Error recuperado: "+yytext,this._$.first_line, (this._$.first_column+1));lista_Errores.push(nuevo);}
;

CUERPOMETODO: DEC_VAR {$$=$1}
            | WHILE {$$=$1}
            | IMPRIMIR {$$=$1}
            | AS_VAR {$$=$1}
            | LLAMADA_METODO {$$=$1}
            | IF {$$=$1}
            | SWITCH {$$=$1}
            | DOWHILE {$$=$1}
            | FOR {$$=$1}
            | TRANSFERENCIA {$$=$1}
            | INCREMENTOS ptcoma  {$$ = INSTRUCCION.nuevaAsignacion2($1, this._$.first_line, (this._$.first_column+1));}
;



IMPRIMIR: print parA EXPRESION parC ptcoma{$$ = new INSTRUCCION.nuevoCout($3, this._$.first_line,this._$.first_column+1)}
;

FOR: for parA FORAS EXPRESION ptcoma FORACT parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoFor($3,$4, $6,$9 , this._$.first_line,(this._$.first_column+1));}
;
FORAS:DEC_VAR              {$$ = $1;}
        |AS_VAR       {$$ = $1;}
;

FORACT: identificador igual EXPRESION     {$$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line, (this._$.first_column+1));}
        | INCREMENTOS  {$$ = INSTRUCCION.nuevaAsignacion2($1, this._$.first_line, (this._$.first_column+1));}
;

DOWHILE: do llaveA OPCIONESMETODO llaveC while parA EXPRESION parC ptcoma {$$ = new INSTRUCCION.nuevoDoWhile($7, $3 , this._$.first_line,(this._$.first_column+1));}
;

WHILE: while parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,this._$.first_column+1)}
;

IF: if parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoIf($3, $6 , this._$.first_line,this._$.first_column+1)}
  | if parA EXPRESION parC llaveA OPCIONESMETODO llaveC else llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoIfElse($3, $6, $10 , this._$.first_line,this._$.first_column+1)}
  | if parA EXPRESION parC llaveA OPCIONESMETODO llaveC ELSEIF {$$= new INSTRUCCION.nuevoIfConElseIf($3, $6, $8, null, this._$.first_line,this._$.first_column+1)}
  | if parA EXPRESION parC llaveA OPCIONESMETODO llaveC ELSEIF else llaveA OPCIONESMETODO llaveC {$$= new INSTRUCCION.nuevoIfConElseIf($3, $6, $8, $11, this._$.first_line,this._$.first_column+1)}
;

ELSEIF: ELSEIF CONEIF {$1.push($2); $$=$1;}
      | CONEIF {$$=[$1];}
;

CONEIF: else if parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoElseIf($4, $7 , this._$.first_line,this._$.first_column+1) }
;

TRANSFERENCIA: break ptcoma {$$ = new INSTRUCCION.nuevoBreak(this._$.first_line,this._$.first_column+1)}
              |continue ptcoma          {$$ = new INSTRUCCION.nuevoContinue(this._$.first_line, (this._$.first_column+1));}
              |return ptcoma            {$$ = new INSTRUCCION.nuevoReturn(null,this._$.first_line, (this._$.first_column+1));}
              |return EXPRESION ptcoma  {$$ = new INSTRUCCION.nuevoReturn($2,this._$.first_line, (this._$.first_column+1));}
;

SWITCH: switch parA EXPRESION parC llaveA LCASOS llaveC { $$ = INSTRUCCION.nuevoSwitch($3,$6, this._$.first_line,(this._$.first_column+1));}
;

LCASOS: LCASOS CASO {$1.push($2); $$ = $1;}  
      |CASO {$$ = [$1];}
;

CASO: case EXPRESION dospuntos OPCIONESMETODO break ptcoma{ $$ = INSTRUCCION.nuevoCase($2,$4, this._$.first_line,(this._$.first_column+1)); }
      | default dospuntos OPCIONESMETODO  break ptcoma{ $$ = INSTRUCCION.nuevoDefault($3, this._$.first_line,(this._$.first_column+1)); }
;