class ListaError{
    constructor(){
        this.tablaErrores=[];
    }
// variables y de todos los simbolos
    addErrores( _simbolo){
        this.tablaErrores.push(_simbolo);
        //this.tablaErrores.set( _simbolo.tipo,_simbolo)
    }

    getErrores(_s){ 
        
    }
    
}

module.exports = ListaError