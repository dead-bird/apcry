import Twitter from 'twitter';
import dotenv from 'dotenv';
import log from './log';

dotenv.config();

const client = new Twitter(process.env);

const sendTweet = item => {
  const status = item.tears;

  return new Promise((resolve, reject) => {
    client
      .post('statuses/update', { status })
      .then(tweet => {
        log.info(`Tweet sent: ${status}`);

        resolve();
      })
      .catch(e => reject(e));
  });
};

export default { sendTweet };
