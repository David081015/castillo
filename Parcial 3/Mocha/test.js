//powershell -ExecutionPolicy Bypass -Command "mocha test.js"
const assert = require('assert');
const { esNumeroPositivo } = require('./index');

describe('Pruebas de validacion con Mocha',()=>{
    it('Deberia retornar true para un numero positivo',()=>{
        const resultado = esNumeroPositivo(5);
        assert.strictEqual(resultado,true);
    });

    it('Deberia retornar false para un numero negativo',()=>{
        const resultado = esNumeroPositivo(-3);
        assert.strictEqual(resultado,false);
    });

    it('Deberia retornar false para cero',()=>{
        const resultado = esNumeroPositivo(0);
        assert.strictEqual(resultado,false);
    });

    it('Deberia retornar false para un valor no numerico',()=>{
        const resultado = esNumeroPositivo('cadena');
        assert.strictEqual(resultado,false);
    });
})