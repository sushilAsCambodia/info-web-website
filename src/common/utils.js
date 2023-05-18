const utils = {
    formatDate: 'YYYY/MM/D',
    letterFormat: 'DD MMM YYYY',
    dateLetter: 'ddd',
    MonthYearFormat: 'MMM YYYY',
    tokenKey: "token",
    baseUrl: process.env.apiUrl,
    convertLangCodeToID: (languageCode) => {
        let lang_id = 1;
        if (languageCode === "en") lang_id = 1;
        else if (languageCode === "de") lang_id = 2;
        else if (languageCode === "kh") lang_id = 3;
        return lang_id;
    },
    subString: (value = '', length = 100) => {
        return (value.length > length ? value.substring(0, length) + '...' : value);
    },
    validateEmail: (value) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return true;
        }
        return false;
    },
    checkPassword:(value, min = 6, max = 12) => {
        
        const isWhitespace = /^(?=.*\s)/;
        if (isWhitespace.test(value)) {
          return "Password must not contain Whitespaces.";
        }
    
        const isContainsUppercase = /^(?=.*[A-Z])/;
        if (!isContainsUppercase.test(value)) {
          return "Password must have at least one Uppercase Character.";
        }
    
        const isContainsLowercase = /^(?=.*[a-z])/;
        if (!isContainsLowercase.test(value)) {
          return "Password must have at least one Lowercase Character.";
        }
    
        const isContainsNumber = /^(?=.*[0-9])/;
        if (!isContainsNumber.test(value)) {
          return "Password must contain at least one Digit.";
        }
    
        const isContainsSymbol =
          /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
        if (!isContainsSymbol.test(value)) {
          return "Password must contain at least one Special Symbol.";
        }
        const isValidLength = RegExp(`^.{${min},${max}}$`);
        if (!isValidLength.test(value)) {
          return `The password format is a combination of ${min}-${max} letters and numbers`;
        }
        
        return null;
    }
}
export default utils;