let expect = require('chai').expect;
let modulo = require ('../src/modulo');
//powershell -ExecutionPolicy Bypass -Command "mocha test.js"
describe("Pruebas a la funcion areaTriangulo",()=>{
    it("Mando 2 y 3, deberia darme un 3",()=>{
        let resultado = modulo.areaTriangulo(2,3);
        expect(resultado).to.be.a("number");
        expect(resultado).to.equal(3);
    });
});