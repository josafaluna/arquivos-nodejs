const app = require('../src/app.anexos');
const http = require('http');

var server = http.createServer(app);

server.listen(normalizePort(process.env.port || '3003'));
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
   var port = parseInt(val, 10);

   if (isNaN(port)) {
      // named pipe
      return val;
   }

   if (port >= 0) {
      // port number
      return port;
   }

   return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
   if (error.syscall !== 'listen') {
      throw error;
   }

   var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
      case 'EACCES':
         console.error(bind + ' requires elevated privileges');
         process.exit(1);
         break;
      case 'EADDRINUSE':
         console.error(bind + ' is already in use');
         process.exit(1);
         break;
      default:
         throw error;
   }
}

// Event listener for HTTP server "listening" event.
function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
   //debug("Listening on " + bind);
   console.log('Listening on ' + bind);
}

// ----------------------------------------->
const name = 'James';

const person = { first: name };

console.log(person);

const sayHelloLinting = (fName) => {
   console.log(`Hello linting, ${fName}`);
};

sayHelloLinting('James');
