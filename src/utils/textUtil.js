class TextUtil {
  checkRTL(text) {
    const ltrChars =
      'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' +
      '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
    const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
    const rtlDirCheck = new RegExp(`^[^${ltrChars}]*[${rtlChars}]`);

    return rtlDirCheck.test(text);
  }

  putCommas = value => {
    if (!value || typeof value === 'undefined') {
      return value;
    }
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  hasNumber = term => {
    return /\d/.test(term);
  };

  toEnglishDigits = value => {
    // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
    let e = '۰'.charCodeAt(0);
    let str = value.replace(/[۰-۹]/g, t => String(t.charCodeAt(0) - e));
    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, t => String(t.charCodeAt(0) - e));
    return str;
  };

  toArabicDigits(value) {
    if (!value) {
      return '';
    }
    const faNum = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return value.replace(/[0-9]/g, w => faNum[+w] || '');
  }

  etcString(str, count = 10) {
    if (!str) {
      return '';
    }
    return str.length < count ? str : `${str.slice(0, count - 2)}...`;
  }
}

const textUtil = new TextUtil();
export {textUtil};
