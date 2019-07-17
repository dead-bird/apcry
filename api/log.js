import c from 'chalk';

const $ = `[${new Date().toLocaleTimeString()}] 💧  apcry:`;

export default {
  info: x => console.info(c.magenta(c.bold($), x)),
  warn: x => console.warn(c.yellow(c.bold($), x)),
  error: x => console.error(c.red(c.bold($), x)),
};
