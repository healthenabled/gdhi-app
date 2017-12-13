window.appProperties = {
  filter: {
  },
  setCategoryFilter (opts) {
    this.filter.categoryId = opts.categoryId
  },
  getCategoryFilter () {
    var categoryId = this.filter.categoryId
    return categoryId === undefined ? '' : categoryId
  },
  getPhaseFilter () {
    var phaseId = this.filter.phaseId
    return phaseId === undefined ? '' : phaseId
  },
  setPhaseFilter (opts) {
    this.filter.phaseId = opts.phaseId
  }
}
