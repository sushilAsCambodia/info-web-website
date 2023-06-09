import moment from "moment/moment";

const utils = {
    formatDate: 'YYYY/MM/D',
    lotteryFormat: 'Do MMM YYYY, dddd',
    letterFormat: 'YYYY MMM DD',
    letterFormat2: 'DD MMM YYYY',
    dateLetter: 'ddd',
    MonthYearFormat: 'MMM YYYY',
    DateMonthFormat: 'DD MMM',
    tokenKey: "token",
    baseUrl: process.env.apiUrl,
    adminUrl: process.env.apiUrlAuth,
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
    checkPassword:(value, min = 6, max = 16) => {
        
        const isWhitespace = /^(?=.*\s)/;
        if (isWhitespace.test(value)) {
          return "password_must_not_contain_whitespaces";
        }
    

        const isForLetters = /[a-zA-Z]+/
        // const isContainsUppercase = /^(?=.*[A-Z])/;
        // if (!isContainsUppercase.test(value)) {
        //   return "password_must_have_at_least_one_uppercase_character";
        // }
    
        // const isContainsLowercase = /^(?=.*[a-z])/;
        // if (!isContainsLowercase.test(value)) {
        //   return "password_must_have_at_least_one_lowercase_character";
        // }
    
        const isContainsNumber = /^(?=.*[0-9])/;
        // if (!isContainsNumber.test(value)) {
        //   return "password_must_contain_at_least_one_digit";
        // }
    
        // const isContainsSymbol =
        //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
        // if (!isContainsSymbol.test(value)) {
        //   return "password_must_contain_at_least_one_special_symbol";
        // }
        
        const isValidLength = RegExp(`^.{${min},${max}}$`);
        if (!isValidLength.test(value) || !isContainsNumber.test(value) || !isForLetters.test(value)) {
          // return `The password format is a combination of ${min}-${max} letters and numbers`;
          return 'validate_password';
        }
        
        return null;
    },
    LastXDays:(days)=> {
      var result = [];
      for (var i = 0; i < days; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push({
          day: moment(d).format(utils.dateLetter),
          DateMonth: moment(d).format(utils.DateMonthFormat),
          ddmmmyyyy:moment(d).format(utils.letterFormat2)
        });
      }
      return result;
    }
}
export default utils;