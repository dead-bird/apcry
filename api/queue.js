import storage from 'node-persist';
import twitter from './twitter';
import Filter from 'bad-words';
import log from './log';

const interval = 60 * 60 * 1000; // 1hr
const filter = new Filter();

storage.init();

const add = async item => {
  if (filter.isProfane(item.input)) {
    return log.warn("this input is profane and I won't have any of it!");
  }

  await storage.setItem(slugify(item.input), { date: new Date(), ...item });
};

const run = async () => {
  setInterval(() => {
    list()
      .then(items => {
        if (!items.length) return log.warn('No Tweets in queue - aborting');

        const item = items[0];

        twitter
          .sendTweet(item)
          .then(() => {
            storage.removeItem(slugify(item.input));
          })
          .catch(e => log.error(`error sending Tweet: ${e[0].message}`));
      })
      .catch(e => log.error(e));
  }, interval);
};

const list = () => {
  return new Promise((resolve, reject) => {
    storage
      .values()
      .then(items => {
        resolve(items.sort((a, b) => new Date(a.date) - new Date(b.date)));
      })
      .catch(e => reject(e));
  });
};

const slugify = val => val.replace(/\s+/g, '-').toLowerCase();

export default { add, run, list };
