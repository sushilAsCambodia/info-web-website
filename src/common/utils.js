const utils = {
    formatDate: 'YYYY/MM/D',
    letterFormat: 'DD MMM YYYY',
    dateLetter: 'ddd',
    MonthYearFormat: 'MMM YYYY',
    DateMonthFormat: 'DD MMM',
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
    }
}
export default utils;