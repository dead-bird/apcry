import limit from 'express-rate-limit';
import express from 'express';
import queue from './queue';
import cry from './cry';
import log from './log';

let app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.set('trust proxy', 1);

app.use(
  limit({
    message: { status: 429, message: 'alright there cowboy, time to stop 🤠' },
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.get('/favicon.ico', () => false);

// List items that are in the Tweet queue - only used internally
app.get('/queue', (req, res) => {
  queue
    .list()
    .then(items => res.json({ status: 200, items }))
    .catch(e => log.error(e));
});

// Make some tears
app.get('/*', (req, res) => {
  const input = decodeURI(req.originalUrl.substr(1)).trim();

  if (input.length > 2000) {
    return res.json({
      status: 413,
      message: "oh noes, that's too much string my guy (╥_╥)",
    });
  }

  cry(input)
    .then(tears => {
      queue.add({ input, tears });

      res.json({ status: 200, input, tears });
    })
    .catch(e => res.status(e.status || 400).send(e));
});

app.listen(3002, () => log.info(`Listening on port 3002`));

queue.run();
