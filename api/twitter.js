import Twitter from 'twitter';
import dotenv from 'dotenv';

dotenv.config();

const client = new Twitter(process.env);

function tweet(status) {
  client
    .post('xxx', { status })
    .then(tweet => {
      console.log(`Tweet sent @ ${tweet.created_at}: ${status}`);
    })
    .catch(e => console.error(e));
}
