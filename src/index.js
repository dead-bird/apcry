import express from 'express';
import cry from './cry';

let app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/*', (req, res) => {
  const input = decodeURI(req.originalUrl.substr(1));

  cry(input)
    .then(tears => res.json({ status: 200, input, tears }))
    .catch(e => res.status(e.status || 400).send(e));
});

app.listen(3002, () => console.log(`Listening on port 3002`));
