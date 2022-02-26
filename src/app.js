const express = require('express');
const fs = require('fs');
const readline = require('readline');
const routes = require('./routes/files.routes');
const multer = require('multer');

const app = express();
app.use(routes);

const upload = multer({ dest: 'uploads/' });
const nomeDir = 'D:\\arquivos\\';

// sobre?
function readdir() {
  fs.readdir(nomeDir, (err, files) => {
    if (err) console.log(err);
    else {
      console.log('\nCurrent directory filenames:');
      let retornaJson = [];
      files.forEach((file) => {
        console.log(`file: ${file}`);
        console.log(nomeDir + file);

        // interface de leitura
        const readInterface = readline.createInterface({
          input: fs.createReadStream('D:\\arquivos\\' + file),
          output: process.stdout, // indicamos a saída
          terminal: false, // evitamos saída dupla
        });

        // lemos uma linha de cada vez
        readInterface.on('line', function (linha) {
          console.log(linha); // e exibimos a linha lida

          // trabalha com a linha
          const linhaArray = linha.split('છ');
          const objGravaBanco = {
            codigo: linhaArray[0],
            profissional: linhaArray[1],
            cargo: linhaArray[2],
            filial: linhaArray[3],
            gerente: linhaArray[4],
          };

          retornaJson.push(objGravaBanco);
        });
        console.log(retornaJson);
      });
    }
  });
}
//readdir();

module.exports = app;

/*

fs.readdir('D:\\arquivos\\', (err, files) => {
      if (!err) {
         console.log(files); // ["file1.js", "file2.js"]

         files.forEach(f => {
            console.log(`f: ${f}`);

            fs.readFile(f, (err, data) => {
               if (!err) {
                  console.log(data); // <Buffer ...>
               } else {
                  console.log(err);
               }
            });
         });
      } else {
         console.log(err);
      }
   });








// Check if the file is readable.
access(file, constants.R_OK, (err) => {
  console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
});




try {
  fs.readdir("D:\\arquivos", retornoFile);
  function retornoFile(files) {
    //console.log(err ? "Doesn't exist" : "Exists");
    for (const file of files) console.log(file);
  }
} catch (e) {
  console.error(err);
}


import { readdir } from 'fs/promises';

try {
  const files = await readdir(path);
  for (const file of files)
    console.log(file);
} catch (err) {
  console.error(err);
}



//-------------------------------------------
fs.access("D:\\files.txt", 1, retornoFile);
function retornoFile(err) {
  console.log(err ? "Doesn't exist" : "Exists");
}

*/
