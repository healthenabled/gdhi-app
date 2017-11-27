export default {
  'expandCaption': '+',
  'collapseCaption': '-',
  toggleCaption (caption) {
    if (caption === this.expandCaption) {
      return this.collapseCaption
    } else {
      return this.expandCaption
    }
  },
  getCaptionFor (isExpanded) {
    if (isExpanded) {
      return this.collapseCaption
    } else {
      return this.expandCaption
    }
  }
}
