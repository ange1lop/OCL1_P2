const Ambito = require("../controller/Ambito/Ambito")
const Bloque = require("../controller/Instruccion/Bloque")
const Global = require("../controller/Instruccion/Global")

module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            var ast = parser.parse(prueba)
            const AmbitoGlobal = new Ambito(null)
            
            //var cadena = Bloque(ast, AmbitoGlobal)
            var cadena = Global(ast.arbol, AmbitoGlobal)
            console.log(AmbitoGlobal.tablaSimbols)
            console.log(ast.errores)
            var resultado = {
                arbol: ast,
                consola: cadena,
                tabalaSimbolos: AmbitoGlobal.tablaSimbols,
                errores: ast
            }
            res.send(resultado)
        //} catch (error) {
            //res.send(error)
        //}
    })
}