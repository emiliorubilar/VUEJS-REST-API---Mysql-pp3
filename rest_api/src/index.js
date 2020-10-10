//guardamos en la constante todo lo que nos ofrece expres.
const express = require('express');
const router = require('./routes/route.facturas');
const cors = require('cors');

//se inicializa y guarda las funcionalidades de express
const server = express();

//seteamos el puerto disponible en el sistema
server.set('port', process.env.PORT || 4000);
//nos permite la comunicacion entre servidores (en este caso veu y api)
server.use(cors());
// el formato de datos para la recepcion y envio de datos seran en JSON
server.use(express.json());
//nuestras rutas
server.use(require('./routes/route.facturas'));

//le damos arranque a nuesto servidor
server.listen(server.get('port') );
//mensaje que muestra ejecusion del server
console.log('servidor ejecutandose en el puerto', server.get('port'));