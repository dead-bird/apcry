import limit from 'express-rate-limit';
import express from 'express';
import queue from './queue';
import duds from './duds';
import cry from './cry';
import log from './log';

let app = express();

// Set Express headers
app.use((req, res, next) => {
  // Allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');

  // Set which HTTP headers can be used the request
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization, Accept'
  );

  // Only allow GET requests
  res.header('Access-Control-Allow-Methods', 'GET');

  // Onwards!
  next();
});

// We're proxying apache to localhost so we wanna grab the client’s IP
// address from the X-Forwarded-* header for correct IP rate limitting
app.set('trust proxy', 1);

// Rate limit per IP address
app.use(
  limit({
    message: { status: 429, message: 'alright there cowboy, time to stop 🤠' },
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// Dead routes
app.use(duds, (req, res) => {
  res.json({ status: 404, message: 'Nothing to see here 👀' });
});

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

// Listen for connections
app.listen(3002, () => log.info(`Listening on port 3002`));

// Run the Tweet queue
queue.run();
