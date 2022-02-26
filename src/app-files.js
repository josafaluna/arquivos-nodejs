const APIStrategy = require('ibmcloud-appid').APIStrategy;
const express = require('express');
const cfenv = require('cfenv');
const Cloudant = require('@cloudant/cloudant');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const passport = require('passport');

// Middleware do express
const app = express();

//const appEnv = cfenv.getAppEnv();
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded());

const nameDir = 'D:\\arquivos\\';

//passport.use(new APIStrategy({
//    oauthServerUrl: process.env.APPID_OAUTHSERVERURL
//}));


/**
 * @param {*} credentials => credenciais do banco 'cliente' que será utilizado
 * @param {*} file
 * @returns
 */
function insertFileCloudant(credentials, file) {
    return new Promise((resolve, reject) => {
        let fileDB = new Cloudant({
            account: credentials.cloudantUsername,
            plugins: {
                iamauth: {
                    iamApiKey: credentials.cloudantIamApiKey
                }
            }
        }).db.use(credentials.cloudantDbName + "-files");

        fileDB.insert(file).then(resolve).catch(reject);
    })
}


function readDirAttachaments() {
    fs.readdir(nameDir)
        .then((files) => {
            files.forEach((file) => {
                console.log(file);

                const doc = {
                    name: 'Josafa',
                    lastname: 'Luna',
                    dtCriacao: new Date(),
                };

                // inserindo no banco
                insertFileCloudant(credentials, file)


                /*
                                // criando doc no banco
                                couch.insert('anexos-db', {
                                    //_id: couch.uniqid().then(ids => ids[0]),
                                    name: 'Josafa',
                                    lastname: 'Luna',
                                    dtCriacao: new Date(),

                                }).then(({ data, headers, status }) => {
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
                                        .insertAttachment('anexos-db', id, file.toString(), file, rev)
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
                */


            });
        })
        .catch((error) => {
            throw new Error({ message: 'Problema com o diretório.' });
        });
}

readDirAttachaments();
module.exports = app;
