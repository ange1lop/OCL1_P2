
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"int"              return 'entero'
"string"              return 'cadena'
"boolean"             return 'bandera'
"double"             return 'doble'
"char"             return 'caracter'
"true"                return 'true'
"false"               return 'false'


"||"                   return 'or'
"&&"                   return 'and'
"=="                   return 'igualigual'
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
"/"                   return 'div'
"-"                   return 'menos'
"+"                   return 'suma'
"^"                   return 'exponente'
"!"                   return 'not'
"%"                   return 'modulo'
"("                   return 'parA'
")"                   return 'parC'
"PI"                  return 'PI'
"E"                   return 'E'

([a-zA-Z])([a-zA-Z0-9_])* return 'identificador'
["\""]([^"\""])*["\""] return 'string'

([a-zA-Z])([a-zA-Z0-9_])* return 'identificador'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left 'or'
%left 'and'
%right 'not'
%left 'igualigual' 'diferente' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'suma' 'menos'
%left 'multi' 'div' 'modulo' 
%left 'exponente'

%left umenos

%start INICIO

%% /* language grammar */

INICIO: CUERPO EOF
;

CUERPO: DEC_VAR
;

DEC_VAR: DEC_VAR TIPO identificador ptcoma
       | TIPO identificador ptcoma
       | DEC_VAR TIPO identificador menor menos EXPRESION ptcoma
       | TIPO identificador menor menos EXPRESION ptcoma
;

TIPO: entero
    | cadena
    | bandera
;


EXPRESION: EXPRESION suma EXPRESION
         | EXPRESION menos EXPRESION
         | EXPRESION multi EXPRESION
         | EXPRESION div EXPRESION
         | EXPRESION exponente EXPRESION
         |EXPRESION modulo EXPRESION
         | parA EXPRESION parC
         | NUMBER
;