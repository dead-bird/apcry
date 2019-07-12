export default text => {
  return new Promise((resolve, reject) => {
    if (!text) reject({ status: 400, message: 'No text supplied' });

    resolve(cry(text));
  });
};

function cry(text) {
  return text
    .toLowerCase()
    .replace(/(\w+)(ing)/gm, '$1in')
    .split('')
    .map((char, index, array) => {
      // 60% chance apos -> semi
      if (char === "'" && random(1, 10) > 4) {
        // 50% chance to send 2
        char = clone(';', 1, 2);
      }

      // Basic check to skip unfiendly chars
      if (!/[a-z0-9]/.test(char)) return char;

      // Swap with letter ahead - see `destructuring assignment`
      if (chance(95)) {
        const next = index + 1;

        if (array[next]) {
          [array[index], array[next]] = [array[next], array[index]];
        }

        return char;
      }

      // 1% add random char
      if (chance(99)) return (char += randChar(char));

      // 5% add up to 3 random punctuations
      if (chance(94)) {
        for (let i = 0; i < random(1, 3); i++) {
          char += ',, .;'[random(0, 4)];
        }

        return char;
      }

      // Clone character once
      if (chance(89)) return clone(char);

      // 1% delete character
      if (chance(99)) return '';

      return char;
    })
    .join('');
}

/*********************
 * Utility Functions *
 *********************/

// Get random int
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Clones letter once if no min or max passed
const clone = (char, min = 2, max = 2) => char.repeat(random(min, max));

// Generic probability check
const chance = value => random(0, 100) > value;

// Return 1 random char
function randChar(char) {
  const chars = "abcdefghijklmnopqrstuvwxyz,./'[]\\`";
  return char + chars.charAt(Math.floor(Math.random() * chars.length));
}
