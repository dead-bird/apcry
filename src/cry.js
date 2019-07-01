import express from 'express';

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
  console.log(req);

  return res.status(200).send(`you said: xxx`);
});

app.listen(3002, () => console.log(`Listening on port 3002`));
