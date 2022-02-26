import express from 'express';
import fs from 'fs';

const app = express();

function readdir() {
  fs.readdir('D:\\arquivos\\', (err, entries) => {
    if (!err) {
      entries.forEach((f) => {
        console.log(`f: ${f}`);

        fs.readFile(f, (err, data) => {
          if (!err) {
            console.log(data); // <Buffer ...>
          }
        });
      });
      //console.log(entries); // ["file1.js", "file2.js"]
    } else {
      console.log(err);
    }
  });
}
readdir();
