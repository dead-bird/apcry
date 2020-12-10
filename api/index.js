import limit from 'express-rate-limit';
import bodyParser from 'body-parser';
import express from 'express';
import queue from './queue';
import cry from './cry';
import log from './log';

let app = express();

app.use(bodyParser.json());

// Set Express headers
app.use((req, res, next) => {
	// Allow requests from any origin
	res.header('Access-Control-Allow-Origin', '*');

	// Set which HTTP headers can be used the request
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');

	// Only allow GET/POST requests
	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');

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

// List items that are in the Tweet queue - only used internally
app.get('/queue', (req, res) => {
  queue
    .list()
    .then(items => res.json({ status: 200, items }))
    .catch(e => log.error(e));
});

// Make some tears
app.post('/cry', ({ body }, res) => {
	const { input } = body;

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
app.listen(3002, () => log.info(`peep me at http://localhost:3002/`));

// Run the Tweet queue
queue.run();
