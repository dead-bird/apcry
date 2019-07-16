import Filter from 'bad-words';

const filter = new Filter();

export default item => {
  if (filter.isProfane(item.input)) {
    return console.log("this input is profane and I won't have any of it!");
  }

  console.log('add to queue');
  console.log('handle tweet');
  console.log(item);
};
