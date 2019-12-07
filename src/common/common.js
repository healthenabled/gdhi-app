export default ({
  hideLoading() {
    const loadingElement = document.querySelector(".loading");
    if (loadingElement)
      loadingElement.style.display = "none";
  },
  showLoading() {
    const loadingElement = document.querySelector(".loading");
    if(loadingElement)
      loadingElement.style.display = "block";
  },
  configWithUserLanguageHeader(language) {
    return {
      headers: {'user_language': language}
    };
  },
  dateInLocaleFormat(date, i18n) {
    let digitsOfYear = 4;
    const year = date.slice(-digitsOfYear);
    const month = date.slice(-date.length, -(digitsOfYear + 1));
    const monthInLocale = i18n.t(`date.month.${month}`);
    return i18n.t('date.dateFormat1', {year: year, month: monthInLocale});
  },
});
