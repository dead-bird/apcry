import storage from 'node-persist';
import Filter from 'bad-words';

const filter = new Filter();

// await storage.init();

export default item => {
  if (filter.isProfane(item.input)) {
    return console.log("this input is profane and I won't have any of it!");
  }

  const key = item.input.replace(/\s+/g, '-').toLowerCase();

  console.log('add to queue');
  console.log('handle tweet');
  console.log(item);
  console.log(key);
};
