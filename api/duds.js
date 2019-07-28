// Routes that are forced to 404
const routes = [
  '/Panel',
  '/chmod 777',
  '/webdav*',
  '/manager*',
  /.*\.js/,
  /.*\.php/,
  /.*\.html/,
  /.*\.txt/,
  /.*\.ico/,
  /.*\.xml/,
];

// Words that probably shouldn't be tweeted
const words = [
  '*nigg*',
  'cunt',
  'packi',
  'packie',
  'packy',
  'paki',
  'pakie',
  'paky',
  'jap',
  'chink',
  'gringo',
  'spic',
  'kike',
  'mudslime',
];

module.exports = { routes, words };
