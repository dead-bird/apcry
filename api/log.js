import c from 'chalk';

const $ = `💧  apcry:`;
const now = () => `[${new Date().toLocaleTimeString()}] `;

export default {
  info: x => console.info(c.magenta(c.bold(now() + $), x)),
  warn: x => console.warn(c.yellow(c.bold(now() + $), x)),
  error: x => console.error(c.red(c.bold(now() + $), x)),
};
