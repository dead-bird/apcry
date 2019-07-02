export default text =>
  new Promise((resolve, reject) => {
    if (!text) reject({ status: 400, message: 'No text supplied' });

    resolve(
      `pretend this is your text but cryified think of the TEARS 😭: ${text}`
    );
  });
