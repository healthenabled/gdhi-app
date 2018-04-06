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
  }
});
