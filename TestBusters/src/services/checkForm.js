//Function to check the password. Needs as args the value of the input and the object 'password'

export const checkPassword = (value, object) => {
  if (
    checkRegEx(value, /\s/g, object.spaces) &&
    checkRegEx(value, /[a-z]/g, object.lowerCase) &&
    checkRegEx(value, /[A-Z]/g, object.upperCase) &&
    checkRegEx(value, /\d/g, object.number) &&
    checkSymbols(value, /\W/g, object.symbol)
  ) {
    return true;
  } else {
    return false;
  }
};
const checkRegEx = (value, regex, n) => {
  if (value.match(regex) != null) {
    if (n == 0) {
      return false;
    }
    if (value.match(regex).length < n) {
      return false;
    }
  }
  if (value.match(regex) == null && n > 0) {
    return false;
  } else {
    return true;
  }
};
const checkSymbols = (value, regex, n) => {
  const listWOSpaces = [];
  if (value.match(regex) != null) {
    value.match(regex).forEach((ex) => {
      if (ex != ' ') {
        listWOSpaces.push(ex);
      }
    });
    if (listWOSpaces.length < n) {
      return false;
    }
    if (listWOSpaces.length && n == 0) {
      return false;
    }
  }
  if (value.match(regex) == null && n > 0) {
    return false;
  } else {
    return true;
  }
};
//Function to check the user. Needs as args the value of the input and the object 'user'
export const checkUser = (value, object) => {
  if (
    checkRegExUser(value, /\s/g, object.spaces) &&
    checkRegExUser(value, /[a-z]/g, object.lowerCase) &&
    checkRegExUser(value, /[A-Z]/g, object.upperCase) &&
    checkRegExUser(value, /\d/g, object.number) &&
    checkSymbolsUser(value, /\W/g, object.symbol)
  ) {
    return checkForbidden(value, object.forbidden);
  } else {
    return [false];
  }
};

const checkRegExUser = (value, regex, n) => {
  if (value.match(regex) != null && n == 0) {
    return false;
  }
  if (value.match(regex) == null && n == 1) {
    return false;
  } else {
    return true;
  }
};
const checkSymbolsUser = (value, regex, n) => {
  const listWOSpaces = [];
  if (value.match(regex) != null) {
    value.match(regex).forEach((ex) => {
      if (ex != ' ') {
        listWOSpaces.push(ex);
      }
    });
    if (listWOSpaces.length && n == 0) {
      return false;
    }
  }
  if (value.match(regex) == null && n == 1) {
    return false;
  } else {
    return true;
  }
};
const checkForbidden = (value, forbbidenList) => {
  const list = [];
  forbbidenList.forEach((forbidden) => {
    const word = new RegExp(forbidden, 'i');
    if (checkRegEx(value, word, 0) == false) {
      list.push(forbidden);
    }
  });
  return list.length == 0 ? [true] : [false, list[0]];
};

export const checkEmail = (value) => {
  const email = value.match(/\w+@{1}\w+.{1}(\w{4}|\w{3}|\w{2})|./g);
  if (email == null) {
    return false;
  }
  if (email != null) {
    return email.length == 1 ? true : false;
  }
};
