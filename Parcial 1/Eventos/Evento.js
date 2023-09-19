const EventEmitter = require('events'); 

class Saludo extends EventEmitter { 
    saludar(){
        setTimeout(()=>{this.emit('saluda','David')},5000); 
        setTimeout(()=>{this.emit('saluda','Victoria')},8000);
        setTimeout(()=>{this.emit('saluda','Gordo')},3000);
    }
}
const sal = new Saludo(); 

sal.on('saluda',(nombre)=>{
    console.log('Hola '+nombre)
});
sal.saludar(); 