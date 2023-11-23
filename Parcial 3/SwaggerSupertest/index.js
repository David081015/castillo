const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const { SwaggerTheme } = require('swagger-themes');
const redoc = require('redoc-express');
const request = require('supertest');//-----------------------SUPERTEST-----------------------

const app = express();

const theme = new SwaggerTheme('v3');

const options = {
  explorer: true,
  customCss: theme.getBuffer('outline')
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const def = fs.readFileSync(path.join(__dirname,'./swagger.json'),
    {encoding:'utf8',flags:'r'});

const read = fs.readFileSync(path.join(__dirname,'./README.md'),
    {encoding:'utf8',flags:'r'});

const defObj = JSON.parse(def);
defObj.info.description = read;

const swaggerOptions = {
    definition:defObj,
    apis: [`${path.join(__dirname, "./index.js")}`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));

app.use("/api-docs-json",(req,res)=>{
    res.json(swaggerDocs);
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', function (req, res) {
    res.send('hello, world!');
});

const dataDeBase = {
    host: 'localhost',
    user: 'root',
    password: 'Castillo105.dct',
    database: 'alumnos',
};

//ALL USERS
/**
 * @swagger
 * /Alumno/:
 *   get:
 *     tags:
 *       - Alumnos
 *     summary: Consultar todos los alumnos
 *     description: Obtiene Json que con todos los alumnos de la Base de Datos
 *     responses:
 *       200:
 *         description: Regresa un Json con todos los alumnos
 */
app.get('/alumnos', async (req, resp) => {
    try {
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('SELECT * FROM tec');
        resp.json(rows);
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

//SELECT
app.get('/alumnos/:id', async (req, resp) => {
    try {
        console.log(req.params.id);
        const conexion = await mysql.createConnection(dataDeBase);
        const [rows, fields] = await conexion.query('SELECT * FROM tec WHERE idtec=' + req.params.id);
        if (rows.length == 0) {
            resp.status(404);
            resp.json({ mensaje: 'Usuario no existe' });
        } else {
            resp.json(rows);
        }
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

//INSERT INTO
// Ruta para agregar un usuario con parámetros de consulta
app.post('/alumnos', async (req, resp) => {
    try {
        const id = req.body.idtec;
        const nom = req.body.nombre;
        const ape = req.body.apellido;
        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query('INSERT INTO tec (idtec, nombre, apellido) VALUES (?, ?, ?)', [id, nom, ape]);
        
        resp.status(201).json({ mensaje: 'Usuario agregado correctamente'});
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});  

//URLSearch
app.post('/alumnos/urlencoded', async (req, resp) => {
    try {
        const id = req.body.idtec;
        const nom = req.body.nombre;
        const ape = req.body.apellido;
        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query('INSERT INTO tec (idtec, nombre, apellido) VALUES (?, ?, ?)', [id, nom, ape]);

        resp.status(201).json({ mensaje: 'Usuario agregado correctamente' });
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
        console.error(err);
    }
});

//Data
const multer = require('multer');
const upload = multer();
app.post('/alumnos/multipart', upload.none(), async (req, resp) => {
    try {
        const id = req.body.idtec;
        const nom = req.body.nombre;
        const ape = req.body.apellido;
        const conexion = await mysql.createConnection(dataDeBase);
        const [result] = await conexion.query('INSERT INTO tec (idtec, nombre, apellido) VALUES (?, ?, ?)', [id, nom, ape]);

        resp.status(201).json({ mensaje: 'Usuario agregado correctamente' });
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
        console.error(err);
    }
});

//UPDATE
app.put('/alumnos', async (req, res) => {
    try {
        const objeto = req.body;
        const conexion = await mysql.createConnection(dataDeBase);

        if (!objeto.idtec || Object.keys(objeto).length === 1) {
            return res.status(400).json({ error: 'Solicitud incorrecta' });
        }
    
        let sentenciaSql = `UPDATE tec SET `;
        const campos = Object.keys(objeto).filter(key => key !== 'idtec');
        
        for (let i = 0; i < campos.length; i++) {
            if (i == campos.length - 1) {
                sentenciaSql += `${campos[i]} = '${objeto[campos[i]]}'`;
            } else {
                sentenciaSql += `${campos[i]} = '${objeto[campos[i]]}', `;
            }
        }
        sentenciaSql += ` WHERE idtec = ${objeto.idtec};`;
        const result = await conexion.query(sentenciaSql);

        if (result.affectedRows == 0) {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        } else {
            res.json({ mensaje: 'Usuario modificado correctamente' });
        }
    } catch (err) {
        res.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

//DELETE
app.delete('/alumnos', async (req, resp) => {
    try {
        const id = req.query.idtec;
        console.log(id);
        const conexion = await mysql.createConnection(dataDeBase);
        const query = "DELETE FROM tec WHERE idtec = "+id;
        const [rows, fields] = await conexion.query(query);
        if (rows.affectedRows == 0) {
            resp.json({ mensaje: 'Registro No Eliminado' });
        } else {
            resp.json({ mensaje: 'Registro Eliminado' });
        }
    } catch (err) {
        resp.status(500).json({ mensaje: 'Error de conexión', tipo: err.message, sql: err.sqlMessage });
    }
});

app.get(
    '/api-docs-redoc',
    redoc({
      title: 'API Docs',
      specUrl: '/api-docs-json',
      nonce: '', // <= it is optional,we can omit this key and value
      // we are now start supporting the redocOptions object
      // you can omit the options object if you don't need it
      // https://redocly.com/docs/api-reference-docs/configuration/functionality/
      redocOptions: {
        theme: {
          colors: {
            primary: {
              main: '#6EC5AB'
            }
          },
          typography: {
            fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
            fontSize: '15px',
            lineHeight: '1.5',
            code: {
              code: '#87E8C7',
              backgroundColor: '#4D4D4E'
            }
          },
          menu: {
            backgroundColor: '#ffffff'
          }
        }
      }
    })
  );

app.listen(8084, () => {
    console.log('Servidor express escuchando');
});

//-----------------------Pruebas con Supertest-----------------------
// Test para la ruta principal
request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
        if (err) throw err;
        console.log('GET / debería devolver el mensaje "hello, world!"');
    });

// Test para obtener todos los alumnos
request(app)
    .get('/alumnos')
    .expect(200)
    .end((err, res) => {
        if (err) throw err;
        console.log('GET /alumnos debería devolver un array de alumnos');
    });

// Test para agregar un nuevo alumno
const nuevoAlumno = {
    idtec: 69,
    nombre: 'Josue',
    apellido: 'TypeC',
};

request(app)
    .post('/alumnos')
    .send(nuevoAlumno)
    .expect(201)
    .end((err, res) => {
        if (err) throw err;
        console.log('POST /alumnos debería agregar un nuevo alumno');
    });