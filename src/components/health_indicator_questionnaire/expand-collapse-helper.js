export default {
  expandCaption: '+',
  collapseCaption: '-',
  toggleCaption(caption) {
    if (caption === this.expandCaption) {
      return this.collapseCaption;
    }
    return this.expandCaption;
  },
  getCaptionFor(isExpanded) {
    if (isExpanded) {
      return this.collapseCaption;
    }
    return this.expandCaption;
  },
};
