const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

const archivoObj = fs.readFileSync(path.join(__dirname,'/archivosyaml/objeto.yml'),'utf8')
const valorObj = yaml.parse(archivoObj);
console.table(valorObj);

const archivoArr = fs.readFileSync(path.join(__dirname,'/archivosyaml/arreglo.yml'),'utf8')
const valorArr = yaml.parse(archivoArr);
console.table(valorArr)

const archivoObAr = fs.readFileSync(path.join(__dirname,'/archivosyaml/objetoArreglo.yml'),'utf8')
const valorObAr = yaml.parse(archivoObAr);
console.table(valorObAr);

const archivoArOb = fs.readFileSync(path.join(__dirname,'/archivosyaml/arregloObjeto.yml'),'utf8')
const valorArOb = yaml.parse(archivoArOb);
console.table(valorArOb);