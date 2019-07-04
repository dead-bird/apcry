export default text =>
  new Promise((resolve, reject) => {
    if (!text) reject({ status: 400, message: 'No text supplied' });

    let vowels = 'aeiou';
    let punctuation = `,";.!?'`;
    let endingPunctuation = ',.?!';
    let excitedPunctuation = '?!';

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function isLetter(char) {
      return letters.includes(char);
    }

    function isVowel(char) {
      return vowels.includes(char);
    }

    function isConsonant(char) {
      return consonants.includes(char);
    }

    function isPunctuation(char) {
      return punctuation.includes(char);
    }

    function isEndingPunctuation(char) {
      return endingPunctuation.includes(char);
    }

    function isExcitedPunctuation(char) {
      return excitedPunctuation.includes(char);
    }

    function isApos(char) {
      return char === "'";
    }

    function isPlease(index, string) {
      if (index + 6 >= string.length) return false;
      if (string.substring(index, index + 6) === 'please') return true;
    }

    function isYou(index, string) {
      if (index + 3 >= string.length) return false;
      if (string.substring(index, index + 3) === 'you') return true;
    }

    function isIng(index, string) {
      if (index + 3 >= string.length) return false;
      if (string.substring(index, index + 3) === 'ing') return true;
    }

    function isIDK(index, string) {
      //I DON'T KNOW
      if (index + 12 >= string.length) return false;
      if (string.substring(index, index + 12) === "i don't know") return true;
    }

    function isTBH(index, string) {
      //TO BE HONEST
      if (index + 12 >= string.length) return false;
      if (string.substring(index, index + 12) === 'to be honest') return true;
    }

    function isWordStart(index, string) {
      if (index === string.length - 1) return false;
      if (index === 0) return true;
      if (
        (string[index - 1] == ' ' ||
          endingPunctuation.includes(string[index - 1])) &&
        letters.includes(string[index])
      )
        return true;
      return false;
    }

    function isWordEnd(index, string) {
      if (index === 0) return false;
      if (index === string.length - 1) return true;
      if (
        (string[index + 1] == ' ' ||
          endingPunctuation.includes(string[index + 1])) &&
        letters.includes(string[index])
      )
        return true;
      return false;
    }

    function double(char) {
      var multiply = getRandomInt(2, 4);
      return Array(multiply).join(char);
    }

    function space(char) {
      return ' ' + char;
    }

    function swap(index, string) {
      var subStr = string.substring(index, index + 1);
      return subStr
        .split('')
        .reverse()
        .join('');
    }

    function vowelWarp(char) {
      var vowelChoice = vowels[getRandomInt(0, vowels.length - 1)];
      return char + vowelChoice;
    }

    function commaNonsense() {
      var multiply = getRandomInt(2, 5);
      return Array(multiply).join(',');
    }

    function semicolonNonsense() {
      var multiply = getRandomInt(1, 4);
      return Array(multiply).join(';');
    }

    var newString = '';
    text = text.toLowerCase();
    for (var i = 0; i < text.length; i++) {
      // CASES
      // please
      if (isPlease(i, text)) {
        newString += 'pls';
        i += 6;
      }
      // ing
      else if (isIng(i, text)) {
        newString += 'in';
        i += 3;
      }
      // you
      else if (isYou(i, text)) {
        newString += 'u';
        i += 3;
      }
      // idk
      else if (isIDK(i, text)) {
        newString += 'idk';
        i += 12;
      }
      // tbh
      else if (isTBH(i, text)) {
        newString += 'tbh';
        i += 12;
      }
      // punctuation
      else if (isEndingPunctuation(text[i]) && isWordEnd(i, text)) {
        newString += commaNonsense();
      } else if (isApos(text[i])) {
        newString += semicolonNonsense();
      } else if (isExcitedPunctuation(text[i])) {
        newString += double(text[i]);
        newString += double(text[i]);
      }
      // big if case to prevent totally garbled text
      else if (getRandomInt(0, 10) > 8) {
        // voewael waerping
        if (isVowel(text[i]) && getRandomInt(0, 20) > 15) {
          newString += vowelWarp(text[i]);
        }
        // letetr swapnig
        else if (getRandomInt(0, 30) > 25) {
          newString += swap(i, text);
        }
        // genneral ccccconssonant stutttttterrrr
        else if (isConsonant(text[i]) && getRandomInt(0, 20) > 15) {
          newString += double(text[i]);
        }
        // sud denly spac ing
        else if (getRandomInt(0, 30) > 25) {
          newString += space(text[i]);
        } else {
          newString += text[i];
        }
      } else {
        newString += text[i];
      }
    }

    resolve(newString);
  });
