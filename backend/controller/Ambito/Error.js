class Error{
    constructor( _tipo,_descrip, _linea, _columna){
        this.tipo = _tipo;
        this.descripcion=_descrip;
        this.linea = _linea;
        this.columna = _columna;
    }
}

module.exports = Error