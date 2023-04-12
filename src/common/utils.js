export default {
    formatDate:'YYYY/MM/D',
    tokenKey: "token",
    baseUrl:"http://api-gateway-infoweb.kk-exchange.com:5000/api",
    convertLangCodeToID : (languageCode) => {
        let lang_id = 1;
        if (languageCode === "en") lang_id = 1;
        else if (languageCode === "de") lang_id = 2;
        else if (languageCode === "kh") lang_id = 3; 
        return lang_id;
    },
    subString:(value= '',length=100) => {
        return (value.length>length ? value.substring(0, length)+'...':value);
    }
}