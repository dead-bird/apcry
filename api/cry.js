export default text =>
  new Promise((resolve, reject) => {
    if (!text) reject({ status: 400, message: 'No text supplied' });

    let punctuation = `,.?!'`;

    // Mozilla docs rng
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function endPunc(char) {
      let endingPunctuation = ',.?!';
      return endingPunctuation.indexOf(char) >= 0 ? true : false;
    }

    function excPunc(char) {
      let excitedPunctuation = '?!';
      return excitedPunctuation.indexOf(char) >= 0 ? true : false;
    }

    function clone(char, min = 2, max = 2) {
      // Clones letter once if no min or max passed
      return char.repeat(getRandomInt(min, max));
    }

    function vowelWarp(char) {
      // Yeet? letter swap basically? idk
      // Unused atm
      let vowels = 'aeiou';
      var vowelChoice = vowels[getRandomInt(0, vowels.length - 1)];
      return char + vowelChoice;
    }

    function randChar(char) {
      // Return 1 random char
      let chars = "abcdefghijklmnopqrstuvwxyz,./'[]\\`";
      let pos = Math.floor(Math.random() * chars.length);
      return char + chars.charAt(pos);
    }

    function cry(text) {
      // Loop over letters and mutate
      let newString = '';
      newString = text
        .split('')
        .map((char, index, array) => {
          // 60% chance apos -> semi
          if (char === "'" && getRandomInt(1, 10) > 4) {
            // 50% chance to send 2
            char = clone(';', 1, 2);
          }
          // Basic check to skip unfiendly chars
          // To prevent mangled / weird output
          if (/[a-z0-9]/.test(char)) {
            // Clone amount based on punc type from tumblr
            if (endPunc(char)) {
              // yeet imo
              char = clone(char, 1, 4);
            }
            if (excPunc(char)) {
              // yeet imo
              char = clone(char, 3, 7);
            }

            // This uses else ifs to avoid multi mutation on 1 char
            // B can have multi mutations but will skip x chars ahead after doing so?
            // Confusing, maybe will make more sense explaining in person

            // %chances taken from B, may be a better way to do them

            // 4% letter swap
            if (getRandomInt(0, 100) > 95) {
              // Swap with letter ahead // B's can swap with behind
              if (array[index + 1]) {
                let swap = char;
                char = array[index + 1];
                array[index + 1] = swap;
              }
            }
            // 1% add random char
            else if (getRandomInt(0, 100) > 99) {
              // B rngs this to 1-2 chars
              char += randChar(char);
            }
            // Swap with random vowel? this is in tumblr vers
            // else if (x) {
            // char = vowelWarp(char)
            // }
            // 5% add rand punctuation
            else if (getRandomInt(0, 100) > 94) {
              // add up to 3 random punctuations
              for (let i = 0; i < getRandomInt(1, 3); i++) {
                switch (getRandomInt(1, 5)) {
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
            else if (getRandomInt(0, 100) > 89) {
              // Clone char once
              // Think B does up to 2 additional chars
              char = clone(char);
            }
            // 1% delete char
            else if (getRandomInt(0, 100) > 99) {
              char = '';
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
