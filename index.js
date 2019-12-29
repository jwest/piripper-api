const express = require('express');
const zip = require('express-zip');

const Albums = require('./albums');

const port = process.env.PORT || 3000;
const albumPath = process.argv[2];
zip.options = { level: 0 };

const app = express();

if (!albumPath) {
  console.log('Albums path not provided!')
  process.exit(1);
}

const albums = new Albums(albumPath);

function url(req, path) {
  return `${req.protocol}://${req.headers.host}${path}`;
}

app.get('/download/album/:name', (req, res) => {
  res.zip(
    albums.get(req.params.name).files,
    `${req.params.name}.zip`
  );
});

app.get('/api/albums/:name', (req, res) => {
  res.send(albums.get(req.params.name));
});

app.get('/api/albums', (req, res) => {
  res.send({
    albums: albums.getAll()
      .map(name => ({ 
        name,
        download: { 
          zip: url(req, `/download/album/${name}`)
        },
      })),
  });
});

app.get('/api', (req, res) => {
  res.send({
    'albums': url(req, '/api/albums/')
  });
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`listening on port ${port}!`));
