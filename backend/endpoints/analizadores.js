const Ambito = require("../controller/Ambito/Ambito")
const ListaError = require("../controller/Ambito/ListaError")
const Bloque = require("../controller/Instruccion/Bloque")
const Global = require("../controller/Instruccion/Global")
const ListaSimbolo = require("../controller/Ambito/ListaSimbolo")
const Grafico = require("../controller/Instruccion/Grafico")
//const Generar_Graf = require("../controller/Instruccion/Generar_Graf")
module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            var ast = parser.parse(prueba)
            const Error = new Errores()
            const Simbol= new Simbol_list()
            ast.errores.forEach(error => {
                Error.addErrores(error)
            });
            const AmbitoGlobal = new Ambito(null)
            //var cadena = Bloque(ast, AmbitoGlobal)
            var devuelve = Global(ast.arbol, AmbitoGlobal,Error,"Global",Simbol)
            var Gdot="digraph mygraph { node [shape=box];\n"
            ast.arbol.forEach(instruccion => {
                Gdot += Grafico(instruccion,"Raiz","Raiz")
            });
            Gdot+="\n}"
            var resultado = {
                arbol: ast.arbol,
                errores: Error,
                Simbol_lit:Simbol,
                consola: devuelve
            }
            res.send(resultado)
        //} catch (error) {
            //res.send(error)
        //}
    })
}