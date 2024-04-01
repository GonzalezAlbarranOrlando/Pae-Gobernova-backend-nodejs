const express = require('express');
const config = require('./config');
//npm i morgan
const morgan = require('morgan');
//cors
const cors = require('cors');
// npm install multer
const multer  = require('multer');
const path = require('path');
//import rutes
const rutes = require('./modules/rutes');

const app = express();

// Habilitar CORS para todas las solicitudes
//app.use(cors());
// Habilitar CORS para origen específico
app.use(cors({
    origin: ['http://localhost:8080', 'http://192.168.1.90:8080'],
  }));

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//config
app.set('port', config.app.port);

//rutes
app.use('/api', rutes);

const storage = multer.diskStorage({
  destination: function (req, file,cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log('[file.originalname]:'+ file.originalname)
    cb(null, file.originalname)
    //cb(null, formattedDate + '-' + file.originalname)
  }
});
//
const upload = multer({ storage: storage });
// upload file request
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log('req.body.formattedDate:'+req.body.formattedDate)
  res.send('Archivo subido con éxito');
});
// download file request
app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error('Error al descargar el archivo:', err);
      res.status(500).send('Error al descargar el archivo');
    }
  });
});
// get image request
app.get('/api/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../uploads', imageName);
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Error al mostrar la imagen:', err);
      res.status(500).send('Error al mostrar la imagen');
    }
  });
});

module.exports = app;