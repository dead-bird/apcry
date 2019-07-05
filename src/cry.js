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
      let newString = '';
      newString = text
        .split('')
        .map(char => {
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
          // 20% chance to modify a character
          if (getRandomInt(1, 10) > 8) {
            // vowel warp 25%
            // swap with random vowel
            // letter swap 17%
            // swap with letter ahead
            // cons stutter 25%
            // repeat char once
            // spacing 17%
            // add 1 space
          }
          return char;
        })
        .join('');

      return newString;
    }

    // Lowercase the input
    // Replace words that end in ing with in
    // Loop over and mutate
    text = text.toLowerCase().replace(/(\w+)(ing)/gm, '$1in');
    text = cry(text);

    resolve(text);
  });
