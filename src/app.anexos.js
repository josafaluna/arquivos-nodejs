//require('./declare');
const express = require('express');
const fs = require('fs').promises;
const NodeCouchDB = require('node-couchdb');
//const NodeCouchDB = require('node-couchdb');
//import { NodeCouchDB } from 'node-couchdb';

const app = express();
app.use(express.json());
app.use(NodeCouchDB);

const nameDir = 'D:\\arquivos\\';

const couch = new NodeCouchDB({
  auth: {
    user: 'admin',
    password: 'jluna10',
  },
});

function readDirAttachaments() {
  fs.readdir(nameDir)
    .then((files) => {
      files.forEach((f) => {
        console.log(f);

        const doc = {
          name: 'Josafa',
          lastname: 'Luna',
          dtCriacao: new Date(),
        };

        // criando doc no banco
        couch
          .insert('anexos-db', {
            //_id: couch.uniqid().then(ids => ids[0]),
            name: 'Josafa',
            lastname: 'Luna',
            dtCriacao: new Date(),
          })
          .then(
            ({ data, headers, status }) => {
              // data is json response
              // headers is an object with all response headers
              // status is statusCode number

              const { id, rev } = data;

              console.log('id', id);
              console.log('rev', rev);
              console.log('data', data);
              console.log('headers', headers);
              console.log('status', status);

              // insertAttachment(dbName, docId, attachmentName, body, docRevision)
              couch
                .insertAttachment('anexos-db', id, f.toString(), f, rev)
                .then(
                  ({ data, headers, status }) => {
                    console.log('inseriu o anexo');
                  },
                  (err) => {
                    console.error('não inseriu o anexo');
                  }
                );
            },
            (err) => {
              // either request error occured
              // ...or err.code=EDOCCONFLICT if document with the same id already exists
              throw err;
            }
          );
      });
    })
    .catch((error) => {
      throw new Error({ message: 'Problema com o diretório.' });
    });
}

/*
function readDirAttachaments() {
   fs.readdir(nameDir)
      .then(files => {
         files.forEach(f => {
            console.log(f);
         })
            .catch(error => {
               throw Error({ message: error.message });
            });
      }
}
*/
readDirAttachaments();
module.exports = app;

function anexo() {
  couch
    .insertAttachment(
      'databaseName',
      'document id',
      'attachment name',
      'attachment body',
      'doc revision'
    )
    .then(
      ({ data, headers, status }) => {
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
      },
      (err) => {
        // either request error occured
        // ...or err.code=EFIELDMISSING if either _id or _rev fields are missing
      }
    );
}
