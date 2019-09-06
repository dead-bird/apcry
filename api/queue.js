import storage from 'node-persist';
import twitter from './twitter';
// import { words } from './duds';
// import Filter from 'bad-words';
import log from './log';

const interval = 60 * 60 * 1000; // 1hr
// const filter = new Filter({ list: words });

storage.init();

const add = async item => {
  // ~~Run through profanity filter in `duds` and~~ check it's not @ing a user
  if (/\@\S+/gm.test(item.input)) {
    return log.warn(`don't @ someone coward: ${item.input}`);
  }

  // Twitter char limit
  if (item.tears.length > twitter.limit) {
    item.tears = item.tears.substring(0, twitter.limit - 3) + '...';
  }

  await storage.setItem(slugify(item.input), { date: new Date(), ...item });
};

const run = async () => {
  setInterval(() => {
    list()
      .then(items => {
        if (!items.length) return log.warn('no Tweets in queue - aborting');

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
