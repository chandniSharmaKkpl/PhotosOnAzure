import { decode as atob, encode as btoa } from "base-64";
import AppConstants from "../Theme/AppConstant";

const CurrentDate = () => {
  var dateTemp = new Date();
  var month = dateTemp.getMonth() + 1; // Since js library start month calculation from 0 index

  var date1 =
    dateTemp.getFullYear() +
    "-" +
    month +
    "-" +
    dateTemp.getDate() +
    " " +
    dateTemp.getHours() +
    ":" +
    dateTemp.getMinutes() +
    ":" +
    dateTemp.getSeconds();

  return date1;
};

const decryptKey = (string) => {
  let aesKey = AppConstants.constant.AES_KEY;
  let aesIv = AppConstants.constant.AES_IV;
  let encoded1 = string;
  var decodeStr = atob(encoded1);

  if (decodeStr.indexOf(aesKey)) {
    decodeStr = decodeStr.replace(aesKey, "");
  }
  if (decodeStr.indexOf(aesIv)) {
    decodeStr = decodeStr.replace(aesIv, "");
  }
  decodeStr = atob(decodeStr);

  return decodeStr;
};

const checkStringContainsSpecialChar = (string) => {
  var format = /[^a-zA-Z-_\d\s]/; ///[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
};

// get unquie timestemp
const getTimeStamp = (istitle) => {
  var date = moment().utcOffset("+05:30").format("MMDDYYhhmms");
  var splitStr = istitle.toLowerCase();
  var replacedStr = splitStr.split(" ").join("_");
  var finalTitle = replacedStr + "_" + date;
  return finalTitle;
};

export {
  CurrentDate,
  decryptKey,
  checkStringContainsSpecialChar,
  getTimeStamp,
};
