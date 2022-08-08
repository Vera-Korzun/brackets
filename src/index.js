module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let arrayUnknowns = buildArrayUnknownEls(bracketsConfig);
  for (let i = 0; i < str.length; i++) {
    let currentSymbol = str[i];

    if (checkIfElUnknown(currentSymbol, arrayUnknowns)) {
      if (stack.length > 0 && stack[stack.length - 1] == currentSymbol) {
        stack.pop();
      } else {
        stack.push(currentSymbol);
      }
    } else {
      if (openBracket(currentSymbol, bracketsConfig)) {
        stack.push(currentSymbol);
      }

      if (closeBracket(currentSymbol, bracketsConfig)) {
        if (stack.length > 0) {
          let a = stack.pop();
          if (!checkIfElMatch(a, currentSymbol, bracketsConfig)) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
  return stack.length === 0;
};

const openBracket = (el, bracketsConfig) => {
  for (i = 0; i < bracketsConfig.length; i++) {
    if (el == bracketsConfig[i][0]) {
      return true;
    }
  }
  return false;
};

const closeBracket = (el, bracketsConfig) => {
  for (i = 0; i < bracketsConfig.length; i++) {
    if (el == bracketsConfig[i][1]) {
      return true;
    }
  }
  return false;
};

const checkIfElMatch = (a, b, bracketsConfig) => {
  let array = [a, b];
  for (i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] == array[0] && bracketsConfig[i][1] == array[1]) {
      return true;
    }
  }
  return false;
};

const buildArrayUnknownEls = (bracketsConfig) => {
  let arrayUnknownEls = [];
  for (i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] == bracketsConfig[i][1]) {
      arrayUnknownEls.push(bracketsConfig[i][0]);
    }
  }
  return arrayUnknownEls;
};

const checkIfElUnknown = (el, arrayUnknownEls) => {
  for (i = 0; i < arrayUnknownEls.length; i++) {
    if (arrayUnknownEls[i] == el) {
      return true;
    }
  }
  return false;
};
