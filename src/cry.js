export default text =>
  new Promise((resolve, reject) => {
    if (!text) reject({ status: 400, message: 'No text supplied' });

    let vowels = 'aeiou';

    let endingPunctuation = ',.?!';
    let excitedPunctuation = '?!';
    let punctuation = `,.?!'`;

    // mozilla docs rng
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // faster methods than regex or array vowel check
    function isVowel(char) {
      return vowels.indexOf(char) >= 0 ? true : false;
    }

    function endPunc(char) {
      return endingPunctuation.indexOf(char) >= 0 ? true : false;
    }

    function excPunc(char) {
      return excitedPunctuation.indexOf(char) >= 0 ? true : false;
    }

    function clone(char, min = 2, max = 2) {
      // clones letter once if no min or max passed
      return char.repeat(getRandomInt(min, max));
    }

    function vowelWarp(char) {
      var vowelChoice = vowels[getRandomInt(0, vowels.length - 1)];
      return char + vowelChoice;
    }

    function cry(text) {
      // Loop over letters and mutate
      let newString = '';
      newString = text
        .split('')
        .map((char, index, array) => {
          // if not emoji or accented char then skip tp
          // prevent mangling weird unicode chars / emoji
          if (/[a-z0-9]/.test(char) || punctuation.indexOf(char) >= 0) {
            // Clone amount based on punc type
            if (endPunc(char)) {
              char = clone(char, 1, 4);
            }
            if (excPunc(char)) {
              char = clone(char, 3, 7);
            }
            // 60% chance apos -> semi
            if (char === "'" && getRandomInt(1, 10) > 4) {
              char = clone(';', 1, 2);
            }

            // 20% chance to mutate a character
            if (getRandomInt(0, 10) > 8) {
              // 17% add space (3.4% overall)
              if (getRandomInt(0, 30) > 25) {
                char += ' ';
              }
              // 17% letter swap (3.4% overall)
              else if (getRandomInt(0, 30) > 25) {
                // swap with letter ahead
                // remove next letter from data so no dupe
                if (array[index + 1]) {
                  char = array[index + 1] + char;
                  array[index + 1] = '';
                }
              }
              // 25% add random vowel (5% overall)
              else if (getRandomInt(0, 20) > 15) {
                // swap with random vowel
              }
              // 25% cons stutter (5% overall)
              else if (getRandomInt(0, 20) > 15) {
                if (!isVowel(char)) {
                  //temp
                  char = clone(char);
                }
              }
            }
          }
          return char;
        })
        .join('');

      return newString;
    }

    // Lowercase the input
    // Replace words that end in ing with in
    text = text.toLowerCase().replace(/(\w+)(ing)/gm, '$1in');
    text = cry(text);

    resolve(text);
  });
