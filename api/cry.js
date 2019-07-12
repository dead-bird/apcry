export default text => {
  return new Promise((resolve, reject) => {
    if (!text) reject({ status: 400, message: 'No text supplied' });

    resolve(cry(text));
  });
};

// Loop over letters and mutate
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
      // To prevent mangled / weird output
      if (/[a-z0-9]/.test(char)) {
        // Clone amount based on punc type from tumblr
        if (endPunc(char)) char = clone(char, 1, 4); // yeet imo
        if (excPunc(char)) char = clone(char, 3, 7); // yeet imo

        // This uses else ifs to avoid multi mutation on 1 char
        // B can have multi mutations but will skip x chars ahead after doing so?
        // Confusing, maybe will make more sense explaining in person

        // %chances taken from B, may be a better way to do them

        if (random(0, 100) > 95) {
          const next = index + 1;

          // Swap with letter ahead - see `destructuring assignment`
          if (array[next]) {
            [array[index], array[next]] = [array[next], array[index]];
          }
        }
        // 1% add random char
        else if (random(0, 100) > 99) {
          // B rngs this to 1-2 chars
          char += randChar(char);
        }
        // Swap with random vowel? this is in tumblr vers
        // else if (x) {
        // char = vowelWarp(char)
        // }
        // 5% add rand punctuation
        else if (random(0, 100) > 94) {
          // add up to 3 random punctuations
          for (let i = 0; i < random(1, 3); i++) {
            switch (random(1, 5)) {
              case 1:
              // ff
              case 2:
                char += ','; // 40% chance for comma instead of the 20% for other punc
                break;
              case 3:
                char += ' ';
                break;
              case 4:
                char += '.';
                break;
              case 5:
                char += ';';
                break;
            }
          }
        }
        // 10% stutter
        else if (random(0, 100) > 89) {
          // Clone char once
          // Think B does up to 2 additional chars
          char = clone(char);
        }
        // 1% delete char
        else if (random(0, 100) > 99) {
          char = '';
        }
      }

      return char;
    })
    .join('');
}

/*********************
 * Utility Functions *
 *********************/

// ??
const endPunc = char => ',.?!'.indexOf(char) >= 0;

// ??
const excPunc = char => '?!'.indexOf(char) >= 0;

// Get random int
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Clones letter once if no min or max passed
const clone = (char, min = 2, max = 2) => char.repeat(random(min, max));

// Yeet? letter swap basically? idk - unused atm
const vowelWarp = char => char + 'aeiou'[random(0, 4)];

// Return 1 random char
function randChar(char) {
  const chars = "abcdefghijklmnopqrstuvwxyz,./'[]\\`";
  return char + chars.charAt(Math.floor(Math.random() * chars.length));
}
